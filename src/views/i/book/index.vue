<script setup>
import {Service} from "@/api/index.js";
import {B_BOOK} from "@/constant/breadcrumb.js";
import {messageOptions} from "@/constant/options.js";
import Write from "@/icons/write.vue";
import router from "@/router/index.js";
import {BOOK_ADD, BOOK_CHECK} from "@/router/RouterValue.js";
import {checkLoginState} from "@/utils/check-login-state.js";
import {debounce} from "@/utils/debounce.js";
import {renderCell} from "@/utils/render.js";
import {inputValidator} from "@/utils/validator.js";
import {AddCircle, Search} from "@vicons/ionicons5";
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
	NLayout,
	NLayoutFooter,
	NLayoutHeader,
	NPagination,
	NPopover,
	NTag,
	useMessage
} from "naive-ui"
import {h, onMounted, reactive, ref} from "vue";

const props = defineProps(['updateMenuItem', 'updateBreadcrumbArray']);

props.updateMenuItem("i-book");
props.updateBreadcrumbArray(B_BOOK);

// todo alter

// todo filter

// todo search

const entity = reactive({
	id: '',
	name: '',
	place: '',
})

const message = useMessage();

let tableData = [];

let currentPageTableData = ref([]);

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
		title: "书籍名称",
		key: "bookInfo.bookName",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		//render: (row) => h()
	},
	{
		title: "作者",
		key: "bookInfo.author",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
	},
	{
		title: "类型",
		key: "bookInfo.bookType",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
	},
	{
		title: "破损程度",
		key: "damageLevel",
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
				default: () => row?.damageLevel
			}
		)
	},
	{
		title: "可借的",
		key: "borrowable",
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
				default: () => row?.borrowable ? 'yes' : 'no'
			}
		),
	},
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
]

const loadingQuery = ref(false);

const rowProps = (row) => {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			router.push({
				name: BOOK_CHECK.name,
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

const query = () => {
	loadingQuery.value = true;

	Service.Books.list(entity, filter)
		.then(res => {
			const data = res.data;

			itemCount.value = data?.data?.total;
			tableData = data?.data?.list;

			pagination.onUpdatePage();

		})
		.catch(err => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
			loadingQuery.value = false;
		});
};

const clickQuery = debounce(query);

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
	onUpdatePage: (page = pagination.page) => {
		pagination.page = page;
		if (!loadingQuery.value) {
			loadingQuery.value = true;
		}
		updateCurrentPageData(page, pagination.pageSize)
			.then(res => {
				currentPageTableData.value = res?.data;
				loadingQuery.value = false;
			})
	}
});

const updateCurrentPageData = (page, pageSize) => {
	return new Promise(resolve => {
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const data = tableData.slice(start, end);
		resolve({
			data: data
		})
	})
}

/**
 * 组件挂载完成时调用
 */
onMounted(() => { // 加载数据
	checkLoginState();
	query();
})

</script>

<template>
	<n-layout-header class="h-3em" position="absolute">
		<n-flex class="h-2.4em items-center" style="margin: 0.3em 1em;">
			<router-link :to="BOOK_ADD.path">
				<n-button>
					<template #icon>
						<addCircle/>
					</template>
					新增
				</n-button>
			</router-link>
			<n-popover placement="top" trigger="click">
				<template #trigger>
					<n-button class="h-2.4em m-l-a">
						<template #icon>
							<n-icon>
								<write/>
							</n-icon>
						</template>
						筛选
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
					<span class="font-size-1.2em font-800">模糊查询</span>
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
			</n-popover>
			<n-button class="h-2.4em" @click.prevent="clickQuery">
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
		<n-data-table
			:columns="cols"
			:data="tableData"
			:loading="loadingQuery"
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
</template>

<style scoped>

.n-menu .n-menu-item-content .n-menu-item-content-header a {
	font-weight: 800 !important;
}

.n-date-picker {
	flex: 1;
}

</style>
