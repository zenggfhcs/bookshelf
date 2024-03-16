<script setup>
import {Service} from "@/api/index.js";
import {ROLE_MAP, ROLE_PRE_DEFINED} from "@/constant/pre-defined/map.js";
import {ResponseCode} from "@/constant/response-code.js";
import Write from "@/icons/write.vue";
import router from "@/router/Router.js";
import {USER_CHECK} from "@/router/RouterValue.js";
import {checkLoginState} from "@/utils/check-login-state.js";
import {convertGender, getTagType, timestampToDateTimeString} from "@/utils/convert.js";
import {debounce} from "@/utils/debounce.js";
import {renderCell} from "@/utils/render.js";
import {inputValidator} from "@/utils/validator.js";
import {Search} from "@vicons/ionicons5";
import {
	NBackTop,
	NButton,
	NDataTable,
	NDatePicker,
	NDivider,
	NFlex,
	NForm,
	NFormItem,
	NGi,
	NGrid,
	NIcon,
	NInput,
	NInputGroup,
	NInputNumber,
	NLayout,
	NLayoutFooter,
	NLayoutHeader,
	NPagination,
	NPopover,
	NSelect,
	NSpin,
	NTag,
	useMessage
} from "naive-ui"
import {h, onMounted, reactive, ref} from "vue"


//#region message
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const message = useMessage();

const messageOptions = {
	duration: 10000
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region 数据表信息
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

let tableData = ref([]);

const cols = [
	{
		title: "id",
		key: "id",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		width: 100,
		minWidth: 50,
		render: (row) => h(
			NTag,
			{
				type: "info",
				bordered: false,
			},
			{
				default: () => row?.id
			}
		),
	},
	{
		title: "用户昵称",
		key: "displayName",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			if (!row?.displayName)
				return renderCell();
			return row?.displayName;
		}
	},
	{
		title: "用户名",
		key: "displayName",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			if (!(row?.surname || row?.name))
				return renderCell();
			return h(
				NTag,
				{
					bordered: false,
				},
				{
					default: () => `${row?.surname} ${row?.name}`
				}
			)
		}
	},
	{
		title: "邮箱",
		key: "email",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => h(
			NTag,
			{
				bordered: false,
				type: "error"
			},
			{
				default: () => row?.email
			}
		)

	},
	{
		title: "电话",
		key: "phoneNumber",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			if (!row?.phoneNumber || row?.phoneNumber === '')
				return renderCell();
			return h(
				NTag,
				{
					bordered: false,
					type: "error"
				},
				{
					default: () => row?.phoneNumber
				}
			)
		}

	},
	{
		title: "角色",
		key: "roles",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			return h(
				NTag,
				{
					type: getTagType.byUserRole(row?.role.name),
					bordered: false,
				},
				{
					default: () => ROLE_MAP.getByValue(row?.role.name)
				}
			)

		}

	},
	{
		title: "年龄",
		key: "age",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			return h(
				NTag,
				{
					type: getTagType.byAge(row?.age),
					bordered: false
				},
				{
					default: () => row?.age
				}
			)

		}

	},
	{
		title: "性别",
		key: "gender",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			return h(
				NTag,
				{
					bordered: false,
					type: getTagType.byGender(row?.gender)
				},
				{
					default: () => convertGender(row?.gender)
				}
			)
		}
	}
]

const loadingFind = ref(false);

const rowProps = (row) => {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			router.push({
				name: USER_CHECK.name,
				params: {
					id: row?.id
				}
			});
		}
	}
}


//#region query
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

const loading = ref(false);

const timestamp = reactive({
	creationTime: null,
	lastLoginTime: null,
	lastUpdatedTime: null,
})

const filter = reactive({
	page: {
		start: 0,
		end: 10
	},
	age: {
		start: null,
		end: null
	},
	creationTime: {
		start: null,
		end: null,
	},
	lastUpdatedTime: {
		start: null,
		end: null,
	},
	lastLoginTime: {
		start: null,
		end: null,
	}
});

const entity = reactive({
	id: '',
	displayName: '',
	userName: '',
	email: '',
	phoneNumber: '',
	role: {
		id: '',
		name: '',
	}
});

const roleOptions = ROLE_PRE_DEFINED;

const preQuery = () => {
	if (timestamp.creationTime) {
		filter.creationTime.start = timestampToDateTimeString(timestamp.creationTime?.[0]);
		filter.creationTime.end = timestampToDateTimeString(timestamp.creationTime?.[1]);
	}
	if (timestamp.lastLoginTime) {
		filter.lastLoginTime.start = timestampToDateTimeString(timestamp.lastLoginTime?.[0]);
		filter.lastLoginTime.end = timestampToDateTimeString(timestamp.lastLoginTime?.[1]);
	}
	if (timestamp.lastUpdatedTime) {
		filter.lastUpdatedTime.start = timestampToDateTimeString(timestamp.lastUpdatedTime?.[0]);
		filter.lastUpdatedTime.end = timestampToDateTimeString(timestamp.lastUpdatedTime?.[1]);
	}
}

const query = () => {
	loading.value = true;

	preQuery();

	Service.Users.list(entity, filter)
		.then(res => {
			const _returnData = res.data;
			if (!_returnData || _returnData?.code !== ResponseCode.SUCCESS) {
				message.error(_returnData?.msg, messageOptions);
				return;
			}

			itemCount.value = _returnData?.data?.count;
			tableData.value = _returnData?.data?.data;

		})
		.catch(err => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
			loading.value = false;
		});
}

const clickFind = debounce((e) => {
	e.preventDefault();
	query();
});
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region 分页组件
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const itemCount = ref(0);

const pagination = reactive({
	page: 1,
	pageSize: 10,
	showSizePicker: true,
	pageSizes: [
		{label: "10 每页", value: 10,},
		{label: "15 每页", value: 15,},
		{label: "20 每页", value: 20,},
		{label: "30 每页", value: 30,}
	],
	showQuickJumper: true,
	onUpdatePageSize: (pageSize) => {
		pagination.pageSize = pageSize;
		pagination.onUpdatePage(1);
	},
	onUpdatePage: (page) => {
		pagination.page = page;
		filter.page.start = (page - 1) * pagination.pageSize;
		filter.page.end = pagination.pageSize;
		query();
	}
});

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region 生命周期钩子
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
/**
 * 组件挂载完成时调用
 */
onMounted(() => { // 加载数据
	checkLoginState();
	query();
})
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

</script>

<template>
	<n-layout-header class="h-3em" position="absolute">
		<n-flex class="h-2.4em items-center m-l-1em m-r-1em">
			<n-popover trigger="click">
				<template #trigger>
					<n-button class="m-.3em h-2.4em m-l-a">
						<template #icon>
							<n-icon>
								<write/>
							</n-icon>
						</template>
						修改条件
					</n-button>
				</template>
				<span class="font-size-1.2em font-800">精确查询</span>
				<n-form :model="entity">
					<n-divider class="m-1!"/>
					<n-grid :cols="2" x-gap="12">
						<n-gi>
							<n-form-item label="id" path="id">
								<n-input v-model:value="entity.id" :allow-input="inputValidator.onlyAllowNumber" clearable
								         placeholder="输入id"/>
							</n-form-item>
						</n-gi>
						<n-gi>
							<n-form-item label="用户昵称" path="displayName">
								<n-input v-model:value="entity.displayName" :allow-input="inputValidator.noSideSpace"
								         clearable placeholder="输入用户昵称"/>
							</n-form-item>
						</n-gi>
						<n-gi>
							<n-form-item label="用户名" path="userName">
								<n-input v-model:value="entity.userName" :allow-input="inputValidator.noSideSpace" clearable
								         placeholder="输入用户名"/>
							</n-form-item>
						</n-gi>
						<n-gi>
							<n-form-item label="邮箱" path="email">
								<n-input v-model:value="entity.email" :allow-input="inputValidator.noSideSpace" clearable
								         placeholder="输入邮箱"/>
							</n-form-item>
						</n-gi>
						<n-gi>
							<n-form-item label="电话" path="phone">
								<n-input v-model:value="entity.phoneNumber" :allow-input="inputValidator.onlyAllowNumber"
								         clearable
								         maxlength="11" placeholder="输入电话"/>
							</n-form-item>
						</n-gi>
						<n-gi>
							<n-form-item label="角色" path="role">
								<n-select v-model:value="entity.role.name" :options="roleOptions" clearable/>
							</n-form-item>
						</n-gi>
					</n-grid>
				</n-form>
				<n-form :model="filter">
					<span class="font-size-1.2em font-800">模糊查询</span>
					<n-divider class="m-1!"/>
					<n-grid :cols="2" x-gap="12">
						<n-gi :span="2">
							<n-form-item label="年龄">
								<n-input-group>
									<n-input-number v-model:value="filter.age.start" :max="filter.age.end" :min="0"
									                :style="{ width: '50%' }"
									                clearable/>
									<n-input-number v-model:value="filter.age.end" :max="255" :min="filter.age.start"
									                :style="{ width: '50%' }"
									                clearable/>
								</n-input-group>
							</n-form-item>
						</n-gi>
						<n-gi :span="2">
							<n-form-item label="创建时间">
								<n-date-picker v-model:value="timestamp.creationTime" clearable type="datetimerange"/>
							</n-form-item>
						</n-gi>
						<n-gi :span="2">
							<n-form-item label="最后一次登录时间">
								<n-date-picker v-model:value="timestamp.lastLoginTime" clearable type="datetimerange"/>
							</n-form-item>
						</n-gi>
						<n-gi :span="2">
							<n-form-item label="最后一次更新时间">
								<n-date-picker v-model:value="timestamp.lastUpdatedTime" clearable type="datetimerange"/>
							</n-form-item>
						</n-gi>
					</n-grid>
				</n-form>
			</n-popover>
			<n-button class="h-2.4em" @click="clickFind">
				<template #icon>
					<n-icon>
						<search/>
					</n-icon>
				</template>
				查找
			</n-button>
		</n-flex>
	</n-layout-header>

	<n-layout id="main" :native-scrollbar="false" class="absolute top-3em bottom-2.4em left-0 right-0"
	          content-style="padding: .3em 1em;">
		<!--   返回顶部   -->
		<n-back-top :bottom="2" :right="20"/>
		<!--   数据表   -->
		<n-spin :show="loadingFind">
			<n-data-table
				:columns="cols"
				:data="tableData"
				:row-props="rowProps"
				:single-line="false"
			/>
		</n-spin>

	</n-layout>

	<n-layout-footer class="h-2.4em" position="absolute">
		<n-flex :size="0" class="items-center mr4 h-100%" justify="center">
			<n-pagination
				v-model:page="pagination.page"
				v-model:page-size="pagination.pageSize"
				v-model:page-sizes="pagination.pageSizes"
				:item-count="itemCount"
				:on-update-page="pagination.onUpdatePage"
				:on-update-page-size="pagination.onUpdatePageSize"
				class="text-center"
				show-quick-jumper
				show-size-picker
				size="large"
			>
				<template #prefix="{ itemCount}">
					共 {{ itemCount }} 项
				</template>
				<template #goto>
					跳至
				</template>
				<template #suffix="{}">
					页
				</template>
			</n-pagination>
		</n-flex>
	</n-layout-footer>
</template>

<style scoped>

.n-menu .n-menu-item-content .n-menu-item-content-header a {
	font-weight: 800 !important;
}

.n-date-picker {
	flex: 1;
}

</style>
