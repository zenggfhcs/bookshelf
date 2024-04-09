<script setup>
import { Service } from "@/api/index.js";
import { B_DEBIT } from "@/constant/breadcrumb.js";
import { messageOptions } from "@/constant/options.js";
import IReload from "@/icons/i-reload.vue";
import Send from "@/icons/send.vue";
import Write from "@/icons/write.vue";
import router from "@/router/index.js";
import { DEBIT_CHECK } from "@/router/RouterValue.js";
import { checkLoginState } from "@/utils/check-login-state.js";
import { timeFormat } from "@/utils/convert.js";
import { debounce } from "@/utils/debounce.js";
import { renderCell } from "@/utils/render.js";
import {
	NBackTop,
	NButton,
	NDataTable,
	NDatePicker,
	NFlex,
	NForm,
	NFormItem,
	NIcon,
	NLayout,
	NLayoutFooter,
	NLayoutHeader,
	NModal,
	NPagination,
	NTag,
	useMessage,
} from "naive-ui";
import { h, onBeforeMount, onMounted, reactive, ref } from "vue";

const props = defineProps([
	"showModal",
	"updateMenuItem",
	"updateBreadcrumbArray",
]);

{
	props.updateMenuItem("i-debit");
	props.updateBreadcrumbArray(B_DEBIT);
}

const entity = reactive({
	id: "",
	name: "",
	place: "",
});

const message = useMessage();

const tableData = ref([]);

const currentPageTableData = ref([]);

const cols = [
	{
		title: "借阅人 id",
		key: "createdBy",
		ellipsis: {
			tooltip: true,
		},
	},
	{
		title: "书籍",
		key: "bookInfo.bookName",
		// 溢出省略
		ellipsis: {
			tooltip: true,
		},
		//render: (row) => h()
	},
	{
		title: "借阅时间",
		key: "creationTime",
		// 溢出省略
		ellipsis: {
			tooltip: true,
		},
		render: (row) =>
			h(
				NTag,
				{
					type: "primary",
					bordered: false,
				},
				{
					default: () => timeFormat(row?.creationTime),
				},
			),
	},
	{
		title: "应还日期",
		key: "returnDeadline",
		// 溢出省略
		ellipsis: {
			tooltip: true,
		},
		render: (row) =>
			h(
				NTag,
				{
					type: "primary",
					bordered: false,
				},
				{
					default: () => row?.returnDeadline,
				},
			),
	},
	{
		title: "归还时间",
		key: "lastUpdatedTime",
		// 溢出省略
		ellipsis: {
			tooltip: true,
		},
		render: (row) => {
			if (!row?.lastUpdatedTime || !row?.returnDate) {
				return renderCell();
			}
			return h(
				NTag,
				{
					type: "primary",
					bordered: false,
				},
				{
					default: () => timeFormat(row?.lastUpdatedTime),
				},
			);
		},
	},
	{
		title: "状态",
		key: "state",
		// 溢出省略
		ellipsis: {
			tooltip: true,
		},
		render: (row) =>
			h(
				NTag,
				{
					type: row?.returnDate ? "success" : "error",
					bordered: false,
				},
				{
					default: () => (row?.returnDate ? "已归还" : "未归还"),
				},
			),
	},
];

const loadingQuery = ref(false);

function rowProps(row) {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			router.push({
				name: DEBIT_CHECK.name,
				params: {
					id: row?.id,
				},
			});
		},
	};
}

const timestamp = reactive({
	creationTime: null,
	lastUpdatedTime: null,
});

const showFilterModal = ref(false);

const filterReactive = reactive({});

function filterResetHandler() {}

function filterHandler() {
	showFilterModal.value = false;
}

const filter = reactive({
	page: {
		start: 0,
		end: 10,
	},
	age: {
		start: 0,
		end: 255,
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

function query() {
	loadingQuery.value = true;

	Service.Debits.list(entity, filter)
		.then((res) => {
			itemCount.value = res?.length;
			tableData.value = res;

			pagination.onUpdatePage();
		})
		.catch((err) => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
			loadingQuery.value = false;
		});
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
		{ label: "30 每页", value: 30 },
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
		updateCurrentPageData(page, pagination.pageSize).then((res) => {
			currentPageTableData.value = res?.data;
			loadingQuery.value = false;
		});
	},
});

function updateCurrentPageData(page, pageSize) {
	return new Promise((resolve) => {
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const data = tableData.value.slice(start, end);
		resolve({
			data: data,
		});
	});
}

function showRepayConfirmModal() {
	props.showModal("error", "催还二次确认", "是否要进行一键催还？", () => {});
}

onBeforeMount(() => {
	checkLoginState();
});

onMounted(() => {
	query();
});
</script>

<template>
	<n-layout-header class="h-3em" position="absolute">
		<n-flex class="h-3em items-center" justify="center">
			<n-button type="error" @click.prevent="showRepayConfirmModal">
				<template #icon>
					<n-icon>
						<send />
					</n-icon>
				</template>
				催还
				<!-- todo 催还 -->
			</n-button>
			<n-button
				type="info"
				secondary
				class="h-2.4em"
				@click="showFilterModal = true"
			>
				<template #icon>
					<n-icon>
						<write />
					</n-icon>
				</template>
				筛选
			</n-button>
			<n-button
				type="info"
				class="h-2.4em"
				@click.prevent="clickQuery"
				:loading="loadingQuery"
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
		<n-back-top :bottom="2" :right="20" />

		<n-data-table
			:columns="cols"
			:data="currentPageTableData"
			:loading="loadingQuery"
			:row-props="rowProps"
			:single-line="false"
			@update:sorter=""
		/>
		<!-- todo sorterReactive https://www.naiveui.com/zh-CN/os-theme/components/data-table#ajax-usage -->

		<!-- 筛选 modal -->
		<n-modal
			id="filter-modal"
			v-model:show="showFilterModal"
			:mask-closable="false"
			class="w-25em"
			preset="dialog"
			title="筛选"
			transform-origin="center"
		>
			<n-form :model="filterReactive">
				<n-form-item label="借阅时间">
					<n-date-picker
						v-model:value="timestamp.creationTime"
						clearable
						type="datetimerange"
						update-value-on-close
					/>
				</n-form-item>
				<n-form-item label="归还时间">
					<n-date-picker
						v-model:value="timestamp.lastUpdatedTime"
						clearable
						type="datetimerange"
						update-value-on-close
					/>
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
				<n-button type="success" @click.prevent="filterHandler">
					确定
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
