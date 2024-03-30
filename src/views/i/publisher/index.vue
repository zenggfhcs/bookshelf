<script setup>
import {Service} from "@/api/index.js";
import {B_PUBLISHER_INDEX} from "@/constant/breadcrumb.js";
import {ResponseCode} from "@/constant/response-code.js";
import IReload from "@/icons/i-reload.vue";
import Write from "@/icons/write.vue";
import router from "@/router/index.js";
import {PUBLISHER_ADD, PUBLISHER_CHECK} from "@/router/RouterValue.js";
import {checkLoginState} from "@/utils/check-login-state.js";
import {timestampToDateTimeString} from "@/utils/convert.js";
import {debounce} from "@/utils/debounce.js";
import {renderCell} from "@/utils/render.js";
import {inputValidator} from "@/utils/validator.js";
import {AddCircle} from "@vicons/ionicons5";
import {
	NGi,
	NGrid,
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
	NLayout,
	NLayoutFooter,
	NLayoutHeader,
	NModal,
	NPagination,
	NTag,
	NButtonGroup,
	useMessage
} from "naive-ui"
import {h, onMounted, reactive, ref} from "vue"

const props = defineProps(['updateMenuItem', 'updateBreadcrumbArray']);

const entity = reactive({
	id: '',
	name: '',
	place: '',
})


const message = useMessage();

const messageOptions = {
	duration: 10000
}


let tableData = [];

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
		title: "出版社名称",
		key: "name",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		//render: (row) => h()
	},
	{
		title: "出版地",
		key: "place",
		resizable: true,
		ellipsis: {
			tooltip: true
		},
		render: (row) => h(
			NTag,
			{
				type: "info",
				bordered: false
			},
			{
				default: () => row?.place
			}
		)
	},
	{
		title: "备注",
		key: "remark",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: true,
		width: 200,
		minWidth: 50,
		maxWidth: 300,
		//render: (row) => h()
	},
	/*
	{
		title: "创建时间",
		key: "creationTime",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => h(
			NTag,
			{
				type: "primary",
				bordered: false,
			},
			{
				default: () => row?.creationTime?.toString().replace("T", " ")
			}
		),
	},
	{
		title: "创建者",
		key: "createdBy",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			if (!row?.createdBy) {
				return renderCell();
			}
			return h(
				NTag,
				{
					type: "info",
					bordered: false,
				},
				{
					default: () => row?.createdBy
				}
			);
		}
	},
	{
		title: "最后更新时间",
		key: "lastUpdatedTime",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => h(
			NTag,
			{
				type: "primary",
				bordered: false,
			},
			{
				default: () => row?.lastUpdatedTime?.toString().replace("T", " ")
			}
		),
	},
	{
		title: "更新者-id",
		key: "updatedBy",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			if (!row?.updatedBy) {
				return renderCell();
			}
			return h(
				NTag,
				{
					type: "info",
					bordered: false,
				},
				{
					default: () => row?.updatedBy
				}
			)
		}
	},
	*/
]

const loadingQuery = ref(false);

const filterShow = ref(false);

const rowProps = (row) => {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			router.push({
				name: PUBLISHER_CHECK.name,
				params: {
					id: row?.id
				}
			});
		}
	}
}

const timestamp = reactive({
	creationTime: null,
	lastUpdatedTime: null,
})

const filter = reactive({
	page: {
		start: 0,
		end: 10
	},
	age: {
		start: 0,
		end: 255
	},
	creationTime: {
		start: null,
		end: null,
	},
	lastUpdatedTime: {
		start: null,
		end: null,
	},
});


const pre_find = () => {
	// todo

	filter.creationTime.start = timestampToDateTimeString(timestamp.creationTime?.[0]);
	filter.creationTime.end = timestampToDateTimeString(timestamp.creationTime?.[1]);

	filter.lastUpdatedTime.start = timestampToDateTimeString(timestamp.lastUpdatedTime?.[0]);
	filter.lastUpdatedTime.end = timestampToDateTimeString(timestamp.lastUpdatedTime?.[1]);
}

const find = () => {
	loadingQuery.value = true;

	pre_find();

	Service.Publishers.list(entity, filter)
		.then(res => {
			const data = res.data;
			if (!data || data?.code !== ResponseCode.SUCCESS) {
				message.error(data.message, messageOptions);
				return;
			}

			itemCount.value = data?.data?.count;
			tableData = data?.data?.data;
			tableData.map(item => {
				item.name = /^(.*?)出?版?社?$/.exec(item.name)?.[1];
			})

			tableData.forEach((item, index) => {
				item.key = index
			});
		})
		.catch(err => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
			loadingQuery.value = false;
		});
};

const clickFind = debounce(e => {
	find();
})

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
		find();
	}
});


/**
 * 组件挂载完成时调用
 */
onMounted(() => { // 加载数据
	checkLoginState();
	find();
})


props.updateMenuItem("i-publisher");
props.updateBreadcrumbArray(B_PUBLISHER_INDEX);

</script>

<template>
	<n-layout-header class="h-3em" position="absolute">
		<n-flex class="h-2.4em items-center" style="margin: 0.3em 1em;">
			<router-link :to="PUBLISHER_ADD.path">
				<n-button>
					<template #icon>
						<addCircle/>
					</template>
					新增
				</n-button>
			</router-link>
			<n-button class="h-2.4em m-l-a" @click="filterShow = true">
				<template #icon>
					<n-icon>
						<write/>
					</n-icon>
				</template>
				筛选
			</n-button>
			<n-button class="h-2.4em" @click="clickFind">
				<template #icon>
					<n-icon>
						<IReload/>
					</n-icon>
				</template>
				刷新
			</n-button>
		</n-flex>
	</n-layout-header>

	<n-layout id="main" :native-scrollbar="false" class="absolute top-3em bottom-2.4em left-0 right-0"
	          content-style="padding: .3em 1em;">
		<!--   返回顶部   -->
		<n-back-top :bottom="2" :right="20"/>
		<!--   数据表   -->
		<n-data-table
			:loading="loadingQuery"
			:columns="cols"
			:data="tableData"
			:row-props="rowProps"
			:single-line="false"
		/>
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

	<n-modal
		id="update-confirmed-modal"
		v-model:show="filterShow"
		:mask-closable="false"
		preset="dialog"
		title="筛选"
		transform-origin="center"
	>
		<n-form :model="entity">
			<n-divider class="m-1!"/>
			<n-form-item label="id" path="id">
				<n-input v-model:value="entity.id" :allow-input="inputValidator.onlyAllowNumber"
				         clearable
				         placeholder="输入id"/>
			</n-form-item>
			<n-form-item label="出版社名称" path="name">
				<n-input v-model:value="entity.name" :allow-input="inputValidator.noSideSpace"
				         clearable placeholder="输入出版社名称"/>

			</n-form-item>
			<n-form-item label="出版地" path="name">
				<n-input v-model:value="entity.place" :allow-input="inputValidator.noSideSpace"
				         clearable placeholder="输入出版地，如 '北京'"/>
			</n-form-item>
		</n-form>
		<n-form :model="filter">
			<n-divider class="m-1!"/>
			<n-form-item label="创建时间">
				<n-date-picker v-model:value="timestamp.creationTime" clearable type="datetimerange"
				               update-value-on-close/>
			</n-form-item>
			<n-form-item label="最后修改时间">
				<n-date-picker v-model:value="timestamp.lastUpdatedTime" clearable type="datetimerange"
				               update-value-on-close/>
			</n-form-item>
		</n-form>
		<n-grid cols="5" x-gap="12">
			<n-gi>
				<n-button class="w-100%" tertiary type="warning">清空</n-button>
			</n-gi>
			<n-gi />
			<n-gi />
			<n-gi />
			<n-gi>
				<n-button class="w-100%" type="success">过滤</n-button>
			</n-gi>
		</n-grid>
	</n-modal>
</template>

<style scoped>

.n-menu .n-menu-item-content .n-menu-item-content-header a {
	font-weight: 800 !important;
}

.n-date-picker {
	flex: 1;
}

</style>
