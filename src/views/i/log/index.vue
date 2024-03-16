<script setup>
import {Service} from "@/api/index.js";
import {messageOptions} from "@/constant/options.js";
import {
	LOG_PRE_DEFINED_SERVICE_NAME,
	LOG_PRE_DEFINED_TYPE,
	SERVICE_NAME_MAP,
	TYPE_MAP
} from "@/constant/pre-defined/map.js";
import {ResponseCode} from "@/constant/response-code.js";
import Write from "@/icons/write.vue";
import router from "@/router/Router.js";
import {LOG_CHECK} from "@/router/RouterValue.js";
import {checkLoginState} from "@/utils/check-login-state.js";
import {getTagType, timestampToDateTimeString} from "@/utils/convert.js";
import {debounce} from "@/utils/debounce.js";
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
	NText,
	useMessage
} from "naive-ui"
import {h, onMounted, reactive, ref} from "vue"

//#region message
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const message = useMessage();
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

const renderCell = () => {
	return h(NText, {depth: 3}, {default: () => '未填写'});
}

//#region 数据表信息
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
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
		title: "操作类型",
		key: "type",
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
				type: getTagType.byLogType(row?.type),
				bordered: false
			},
			{
				default: () => TYPE_MAP.getByValue(row?.type)
			}
		),
	},
	{
		title: "数据类型",
		key: "serviceName",
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
				type: 'warning',
				style: {
					width: '5em',
					justifyContent: 'center',
				},
				bordered: false
			},
			{
				default: () => SERVICE_NAME_MAP.getByValue(row?.serviceName)
			}
		),
	},
	{
		title: "数据-Id",
		key: "dataId",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		width: 100,
		minWidth: 50,
		render: (row) => {
			if (!row?.dataId || row?.dataId === '')
				return renderCell();
			return h(
				NTag,
				{
					type: "info",
					bordered: false,
				},
				{
					default: () => row?.dataId
				}
			)
		},
	},
	{
		title: "运行时间-毫秒",
		key: "elapsedTime",
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
				type: getTagType.byElapsedTime(row?.elapsedTime),
				bordered: false,
			},
			{
				default: () => row?.elapsedTime,
			}
		),
	},
	{
		title: "记录时刻",
		key: "creationTime",
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
				type: "primary",
				bordered: false
			},
			{
				default: () => row?.creationTime.replace("T", " ")
			}
		),
	},
	{
		title: "操作者-Id",
		key: "createdBy",
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
				bordered: false
			},
			{
				default: () => row?.createdBy
			}
		),
	},
]

let tableData = [];

const loadingFind = ref(false);

const typeOptions = LOG_PRE_DEFINED_TYPE;

const serviceNameOptions = LOG_PRE_DEFINED_SERVICE_NAME;

const rowProps = row => {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			router.push({
				name: LOG_CHECK.name,
				params: {
					id: row?.id,
				}
			});
		}
	}
}
//#region query
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const entity = reactive({
	id: '',
	type: '',
	serviceName: '',

});

const timestamp = reactive({
	creationTime: null,
})

const filter = reactive({
	page: {
		start: 0,
		end: 10
	},
	creationTime: {
		start: null,
		end: null,
	},
	elapsedTime: {
		start: null,
		end: null,
	}
});

const preQuery = () => {
	// todo pre query
	filter.creationTime.start = timestampToDateTimeString(timestamp.creationTime?.[0]);
	filter.creationTime.end = timestampToDateTimeString(timestamp.creationTime?.[1]);
}

// todo 修改条件后查找，不会改变页码，会导致查页错误、查出数据为空
const query = () => {
	loadingFind.value = true;

	preQuery();

	Service.Logs.list(entity, filter)
		.then(res => {
			const data = res.data;
			if (!data || data?.code !== ResponseCode.SUCCESS) {
				message.error(data?.msg, messageOptions);
				return;
			}

			itemCount.value = data?.data?.count;
			tableData = data?.data?.data;
		})
		.catch(err => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
			loadingFind.value = false;
		});
};

const clickFind = debounce(e => {
	e.preventDefault();
	query();
})
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
		{label: "20 每页", value: 20,},
		{label: "30 每页", value: 30,},
		{label: "50 每页", value: 50,}
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
		<n-flex class="h-2.4em items-center" justify="right" style="margin: 0.3em 1em;">
			<n-popover placement="top" trigger="click">
				<template #trigger>
					<n-button class="h-2.4em">
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
					<n-form-item label="id" path="id">
						<n-input v-model:value="entity.id" :allow-input="inputValidator.onlyAllowNumber"
						         clearable
						         placeholder="输入id"/>
					</n-form-item>
					<n-form-item label="操作类型" path="type">
						<n-select v-model:value="entity.type" :options="typeOptions" clearable
						          placeholder="选择操作类型"/>
					</n-form-item>

					<n-form-item label="数据类型" path="serviceName">
						<n-select v-model:value="entity.serviceName" :options="serviceNameOptions" clearable
						          placeholder="选择数据类型"/>
					</n-form-item>
				</n-form>
				<n-form :model="filter">
					<span class="font-size-1.2em font-800">模糊查询</span>
					<n-divider class="m-1!"/>

					<n-form-item label="记录时间">
						<n-date-picker v-model:value="timestamp.creationTime" clearable type="datetimerange"
						               update-value-on-close/>
					</n-form-item>

					<n-form-item label="运行时间-毫秒">
						<n-input-group>
							<n-input-number v-model:value="filter.elapsedTime.start" :max="filter.elapsedTime.end" :min="0"
							                :style="{ width: '50%' }"
							                clearable/>
							<n-input-number v-model:value="filter.elapsedTime.end" :max="100000"
							                :min="filter.elapsedTime.start"
							                :style="{ width: '50%' }"
							                clearable/>
						</n-input-group>
					</n-form-item>

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

	<n-layout id="main" :native-scrollbar="false" class="absolute top-3em bottom-2.4em"
	          content-style="padding: .3em 1em;">
		<!--   返回顶部   -->
		<n-back-top :bottom="2" :right="20" style="--n-height: 2.4em; --n-width: 2.4em;"/>
		<!--   数据表   -->
		<n-spin :show="loadingFind">
			<n-data-table
				:columns="cols"
				:data="tableData"
				:render-cell="renderCell"
				:row-props="rowProps"
				:single-line="false" striped
			/>
		</n-spin>
	</n-layout>
	<n-layout-footer class="h-2.4em" position="absolute">
		<n-flex :size="8" class="items-center mr4 h-100%" justify="center">
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
	font-weight: 800;
}

.n-date-picker {
	flex: 1;
}
</style>/style>