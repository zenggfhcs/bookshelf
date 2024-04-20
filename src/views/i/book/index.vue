<script setup>
import { Service } from "@/api/index.js";
import { B_BOOK } from "@/constant/breadcrumb.js";
import IAdd from "@/icons/i-add.vue";
import IReload from "@/icons/i-reload.vue";
import Write from "@/icons/write.vue";
import router from "@/router/index.js";
import { BOOK_ADD, BOOK_CHECK } from "@/router/router-value.js";
import { debounce } from "@/utils/debounce.js";
import { queryList } from "@/utils/query.js";
import {
	NBackTop,
	NButton,
	NDataTable,
	NFlex,
	NIcon,
	NLayout,
	NLayoutFooter,
	NLayoutHeader,
	NPagination,
	NTag,
	useMessage
} from "naive-ui";
import { computed, h, onMounted, reactive, ref } from "vue";

const props = defineProps([
	"showModal",
	"updateMenuItem",
	"updateBreadcrumbArray"
]);

props.updateMenuItem("i-book");
props.updateBreadcrumbArray(B_BOOK);

// todo alter

// todo filterHandler

// todo search

const entity = reactive({
	id: "",
	name: "",
	place: ""
});

const message = useMessage();

const tableData = ref([]);

const cols = [
	{
		title: "书名",
		key: "bookInfo.bookName",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		}
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
		}
	},
	{
		title: "类型",
		key: "bookInfo.bookType",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		}
	},
	{
		title: "破损程度",
		key: "damageLevel",
		resizable: true,
		ellipsis: {
			tooltip: true
		},
		render: (row) =>
			h(
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
		title: "状态",
		key: "borrowable",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) =>
			h(
				NTag,
				{
					type: "primary",
					bordered: false
				},
				{
					default: () => (row?.borrowable ? "yes" : "no")
				}
			)
	}
];

const loadingQuery = ref(false);

function rowProps(row) {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			router.push({
				name: BOOK_CHECK.name,
				params: {
					id: row?.id
				}
			}).then(res => {
				console.log(res);
			});
		}
	};
}

const timestamp = reactive({
	creationTime: null,
	lastUpdatedTime: null
});

const filter = reactive({
	age: {
		start: 0,
		end: 255
	},
	creationTime: {
		start: null,
		end: null
	},
	lastUpdatedTime: {
		start: null,
		end: null
	}
});

const payloadReactive = reactive({
	entity: {},
	filter: {
		page: {
			start: computed(() => (pagination.page - 1) * pagination.pageSize),
			end: computed(() => pagination.pageSize)
		}
	}
});

async function query() {
	loadingQuery.value = true;
	await queryList(
		message,
		Service.Books.filteredList(payloadReactive),
		itemCount,
		tableData
	);
	loadingQuery.value = false;
}

const clickQuery = debounce(query);

const itemCount = ref(0);

const pagination = reactive({
	page: 1,
	pageSize: 10,
	showSizePicker: true,
	pageSizes: [
		{ label: "10 每页", value: 10 },
		{ label: "15 每页", value: 15 },
		{ label: "20 每页", value: 20 },
		{ label: "30 每页", value: 30 }
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
		query();
	}
});


onMounted(() => {
	query();
});
</script>

<template>
	<n-layout-header class="h-3em" position="absolute">
		<n-flex class="h-3em items-center" justify="center">
			<router-link :to="BOOK_ADD.path">
				<n-button type="success">
					<template #icon>
						<IAdd />
					</template>
					新增
				</n-button>
			</router-link>
			<n-button class="h-2.4em" secondary type="info">
				<template #icon>
					<n-icon>
						<write />
					</n-icon>
				</template>
				筛选
			</n-button>
			<n-button
				:loading="loadingQuery"
				class="h-2.4em"
				type="info"
				@click.prevent="clickQuery"
			>
				<template #icon>
					<n-icon :component="IReload" />
				</template>
				刷新
			</n-button>
		</n-flex>
	</n-layout-header>

	<n-layout
		id="main"
		:native-scrollbar="false"
		class="absolute top-3em bottom-2.4em left-0 right-0"
		content-style="padding: .3em 1em;"
	>
		<!--   返回顶部   -->
		<n-back-top :bottom="2" :right="20" />
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
				<template #prefix="{ itemCount }"> 共 {{ itemCount }} 项</template>
				<template #goto> 跳至</template>
				<template #suffix="{}"> 页</template>
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
