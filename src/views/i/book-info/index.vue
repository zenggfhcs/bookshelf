<script setup>
import { queryList } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { B_BOOK_INFO } from "@/constant/breadcrumb.js";
import { LANG_TYPE_MAP } from "@/constant/map.js";
import IAdd from "@/icons/i-add.vue";
import IDelete from "@/icons/i-delete.vue";
import IReload from "@/icons/i-reload.vue";
import write from "@/icons/write.vue";
import router from "@/router/index.js";
import { BOOK_INFO_ADD, BOOK_INFO_CHECK } from "@/router/route-value.js";
import { debounce } from "@/utils/debounce.js";
import {
	NBackTop,
	NButton,
	NDataTable,
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
	useMessage
} from "naive-ui";
import { computed, h, onMounted, reactive, ref } from "vue";

const props = defineProps([
	"showModal",
	"updateMenuItem",
	"updateBreadcrumbArray"
]);

{
	props.updateMenuItem("i-book-info");
	props.updateBreadcrumbArray(B_BOOK_INFO);
}

const message = useMessage();

const tableData = ref([]);

const loadingQuery = ref(false);

const showFilterModal = ref(false);

function rowProps(row) {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			router.push({
				name: BOOK_INFO_CHECK.name,
				params: {
					id: row?.id
				}
			});
		}
	};
}

async function query() {
	loadingQuery.value = true;
	await queryList(
		message,
		Service.BookInfos.filteredList(payload),
		itemCount,
		tableData
	);
	loadingQuery.value = false;
}

const queryHandler = debounce(() => {
	query();
});

const cols = [
	{
		type: "selection"
	},
	{
		title: "ISBN",
		key: "isbn",
		width: 172,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			return h(
				NTag,
				{ type: "error", bordered: false },
				{ default: () => row?.isbn }
			);
		}
	},
	{
		title: "CIP",
		key: "cip",
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			return h(
				NTag,
				{ type: "error", bordered: false },
				{ default: () => row?.cip }
			);
		}
	},
	{
		title: "名称",
		key: "bookName",
		// 溢出省略
		ellipsis: {
			tooltip: true
		}
	},
	{
		title: "作者",
		key: "author",
		// 溢出省略
		ellipsis: {
			tooltip: true
		}
	},
	{
		title: "类型",
		key: "bookType",
		// 溢出省略
		ellipsis: {
			tooltip: true
		}
	},
	{
		title: "正文语种",
		key: "lang",
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			return LANG_TYPE_MAP.getByValue(row?.lang);
		}
	},
	{
		title: "关键字",
		key: "keyword",
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			return row?.keyword
				?.toString()
				.split("－")
				.map((item) => {
					return h(
						NTag,
						{
							type: "info",
							bordered: false,
							style: {
								marginRight: "3px"
							}
						},
						{
							default: () => item
						}
					);
				});
		}
	},
	{
		title: "出版社",
		key: "publisher",
		// 溢出省略
		ellipsis: {
			tooltip: true
		}
	},
	{
		title: "版次",
		key: "edition",
		// 溢出省略
		ellipsis: {
			tooltip: true
		}
	},
	{
		title: "印次",
		key: "printing",
		// 溢出省略
		ellipsis: {
			tooltip: true
		}
	}
];

const itemCount = ref(0);

const pagination = reactive({
	page: 1,
	pageSize: 10,
	showSizePicker: true,
	pageSizes: [
		{ label: "10 每页", value: 10 },
		{ label: "15 每页", value: 15 },
		{ label: "30 每页", value: 30 },
		{ label: "50 每页", value: 50 }
	],
	showQuickJumper: true,
	onUpdatePageSize: (pageSize) => {
		pagination.pageSize = pageSize;
		pagination.onUpdatePage(1);
	},
	onUpdatePage: (page) => {
		pagination.page = page;
		if (!loadingQuery.value) {
			loadingQuery.value = true;
		}

		query();
	}
});

const payload = reactive({
	entity: {
		isbn: "",
		cip: "",
		bookName: ""
	},
	filter: {
		page: {
			start: computed(() => (pagination.page - 1) * pagination.pageSize),
			end: computed(() => pagination.pageSize)
		}
	}
});

function filterResetHandler() {
	for (const key in payload.entity) {
		payload.entity[key] = "";
	}
}

function filterHandler() {
	query();
	showFilterModal.value = false;
}

const checkedRowKeysRef = ref([]);

function handleCheck(rowKeys) {
	checkedRowKeysRef.value = rowKeys;
}


onMounted(() => {
	query();
});
</script>

<template>
	<n-layout-header class="h-3em top-0" position="absolute">
		<n-flex class="h-3em items-center" justify="center">
			<n-button
				v-if="checkedRowKeysRef.length"
				type="error"
				@click.prevent="
					props.showModal(
						'error',
						'删除二次确认',
						'是否要删除所选？',
						() => {},
					)
				"
			>
				<template #icon>
					<IDelete />
				</template>
				删除所选
			</n-button>
			<router-link :to="BOOK_INFO_ADD.path">
				<n-button type="success">
					<template #icon>
						<IAdd />
					</template>
					新增
				</n-button>
			</router-link>
			<n-button
				class="h-2.4em"
				secondary
				type="info"
				@click.prevent="showFilterModal = true"
			>
				<template #icon>
					<n-icon :component="write" />
				</template>
				筛选
			</n-button>
			<n-button
				:loading="loadingQuery"
				class="h-2.4em"
				type="info"
				@click.prevent="queryHandler"
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
			@update:checked-row-keys="handleCheck"
		/>

		<!-- 筛选 modalReactive -->
		<n-modal
			id="filter-modal"
			v-model:show="showFilterModal"
			:mask-closable="false"
			class="w-25em"
			preset="dialog"
			title="筛选"
			transform-origin="center"
			type="info"
		>
			<n-form :model="payload">
				<n-form-item label="ISBN">
					<n-input v-model:value="payload.entity.isbn" clearable />
				</n-form-item>
				<n-form-item label="CIP">
					<n-input v-model:value="payload.entity.cip" clearable />
				</n-form-item>
				<n-form-item label="书籍名称">
					<n-input v-model:value="payload.entity.bookName" clearable />
				</n-form-item>
			</n-form>
			<n-flex justify="space-between">
				<n-button
					tertiary
					type="warning"
					@click.prevent="filterResetHandler"
				>
					重置
				</n-button>
				<n-button type="info" @click.prevent="filterHandler">
					提交
				</n-button>
			</n-flex>
		</n-modal>
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
</style>
