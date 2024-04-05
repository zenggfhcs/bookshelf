<script setup>
import { Service } from "@/api/index.js";
import { B_PUBLISHER_INDEX } from "@/constant/breadcrumb.js";
import { messageOptions } from "@/constant/options.js";
import IReload from "@/icons/i-reload.vue";
import Write from "@/icons/write.vue";
import router from "@/router/index.js";
import { PUBLISHER_ADD, PUBLISHER_CHECK } from "@/router/RouterValue.js";
import { checkLoginState } from "@/utils/check-login-state.js";
import { debounce } from "@/utils/debounce.js";
import { inputValidator } from "@/utils/validator.js";
import { AddCircle } from "@vicons/ionicons5";
import {
	NBackTop,
	NButton,
	NDataTable,
	NDivider,
	NFlex,
	NForm,
	NFormItem,
	NIcon,
	NInput,
	NInputGroup,
	NInputGroupLabel,
	NLayout,
	NLayoutFooter,
	NLayoutHeader,
	NModal,
	NPagination,
	NTag,
	useMessage,
} from "naive-ui";
import { h, onMounted, reactive, ref } from "vue";

const props = defineProps(["updateMenuItem", "updateBreadcrumbArray"]);

props.updateMenuItem("i-publisher");
props.updateBreadcrumbArray(B_PUBLISHER_INDEX);

const filterReactive = reactive({
	id: "",
	name: "",
	place: "",
});

const filterResetHandler = debounce(() => {
	filterReactive.id = "";
	filterReactive.name = "";
	filterReactive.place = "";
});

const filterHandler = debounce(() => {
	filterByFlag(true);
});

const message = useMessage();

let tableData = [];

let filteredData = [];

let currentPageData = ref([]);

const cols = [
	{
		title: "id",
		key: "id",
		render: (row) =>
			h(
				NTag,
				{
					type: "info",
					bordered: false,
				},
				{
					default: () => row?.id,
				},
			),
	},
	{
		title: "出版社名称",
		key: "name",
		// 溢出省略
		ellipsis: {
			tooltip: true,
		},
	},
	{
		title: "出版地",
		key: "place",
		ellipsis: {
			tooltip: true,
		},
		render: (row) =>
			h(
				NTag,
				{
					type: "info",
					bordered: false,
				},
				{
					default: () => row?.place,
				},
			),
	},
	{
		title: "备注",
		key: "remark",
		// 溢出省略
		ellipsis: true,
	},
];

const colsRef = ref(cols);

const loadingRefresh = ref(false);

const showFilterModal = ref(false);

function rowProps(row) {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			router.push({
				name: PUBLISHER_CHECK.name,
				params: {
					id: row?.id,
				},
			});
		},
	};
}

function query() {
	loadingRefresh.value = true;

	Service.Publishers.list()
		.then((res) => {
			const data = res.data;

			itemCount.value = data?.data?.total;
			tableData = data?.data?.list;
			filteredData = data?.data?.list;
			tableData.map((item) => {
				item.name = /^(.*?)出?版?社?$/.exec(item.name)?.[1];
			});

			filterByFlag();
		})
		.catch((err) => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
			loadingRefresh.value = false;
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
	onUpdatePage: (page) => {
		pagination.page = page;
		loadingRefresh.value = true;

		filterByFlag();
	},
});

function updateCurrentPageData(page = 1, pageSize = 10, filterModel = null) {
	return new Promise((resolve) => {
		// filterHandler
		filteredData = filterModel
			? tableData.filter((item) => {
					// id
					const _f1 = !filterModel.id || +item.id === +filterModel.id;
					// name
					const _f2 =
						!filterModel.name ||
						item.name.indexOf(filterModel.name) !== -1;
					// place
					const _f3 =
						!filterModel.place ||
						item.place.indexOf(filterModel.place) !== -1;
					return _f1 && _f2 && _f3;
				})
			: filteredData;
		// order

		// pagination
		setTimeout(
			() =>
				resolve({
					data: filteredData.slice((page - 1) * pageSize, page * pageSize),
					total: filteredData.length,
				}),
			100,
		);
	});
}

function filterByFlag(flag = false) {
	updateCurrentPageData(
		flag ? 1 : pagination.page,
		pagination.pageSize,
		flag ? filterReactive : null,
	).then((res) => {
		currentPageData.value = res.data;
		itemCount.value = res.total;
		loadingRefresh.value = false;
	});
}

/**
 * 组件挂载完成时调用
 */
onMounted(() => {
	// 加载数据
	checkLoginState();
	query();
});
</script>

<template>
	<n-layout-header class="h-3em" position="absolute">
		<n-flex
			class="h-2.4em items-center"
			style="margin: 0.3em 1em"
			justify="center"
		>
			<router-link :to="PUBLISHER_ADD.path">
				<n-button>
					<template #icon>
						<addCircle />
					</template>
					新增
				</n-button>
			</router-link>

			<n-button class="h-2.4em" @click.prevent="showFilterModal = true">
				<template #icon>
					<n-icon :component="Write" />
				</template>
				筛选
			</n-button>
			<n-button
				:loading="loadingRefresh"
				class="h-2.4em"
				@click.prevent="clickQuery"
			>
				<template #icon>
					<n-icon>
						<IReload />
					</n-icon>
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
			:columns="colsRef"
			:data="currentPageData"
			:loading="loadingRefresh"
			:row-props="rowProps"
			:single-line="false"
			remote
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
			<n-divider class="m-1!" />
			<n-form-item label="id" path="id">
				<n-input
					v-model:value="filterReactive.id"
					:allow-input="inputValidator.onlyAllowNumber"
					clearable
					placeholder="输入id"
				/>
			</n-form-item>
			<n-form-item label="出版社名称" path="name">
				<n-input-group>
					<n-input
						v-model:value="filterReactive.name"
						:allow-input="inputValidator.noSideSpace"
						clearable
						placeholder="输入出版社名称"
					/>
					<n-input-group-label>出版社</n-input-group-label>
				</n-input-group>
			</n-form-item>
			<n-form-item label="出版地" path="name">
				<n-input
					v-model:value="filterReactive.place"
					:allow-input="inputValidator.noSideSpace"
					clearable
					placeholder="输入出版地，如 '北京'"
				/>
			</n-form-item>
		</n-form>
		<n-flex justify="space-between">
			<n-button tertiary type="warning" @click.prevent="filterResetHandler">
				重置
			</n-button>
			<n-button
				type="success"
				@click.prevent="
					filterHandler();
					showFilterModal = false;
				"
			>
				确定
			</n-button>
		</n-flex>
	</n-modal>
</template>

<style scoped></style>
