<script setup>

import { Service } from "@/api/index.js";
import { queryList } from "@/utils/query.js";
import {
	NButton,
	NCard,
	NCollapse,
	NCollapseItem,
	NDataTable,
	NFlex,
	NLayoutContent,
	NPagination,
	NSelect,
	NSpace,
	NTree,
	useMessage
} from "naive-ui";
import { computed, onMounted, reactive, ref } from "vue";

const message = useMessage();

const tableDataRef = ref([]);

const itemCountRef = ref(0);

const loading = ref(false);

const cols = [
	{
		type: "selection"
	},
	{
		title: "序号",
		key: "id"
	},
	{
		title: "题名",
		key: "bookName"
	},
	{
		title: "著者",
		key: "author"
	},
	{
		title: "出版社",
		key: "publisher"
	},
	{
		title: "出版日期",
		key: "publishedDate" // todo yyyy-MM
	},
	{
		title: "索引号",
		key: "callNumber"
	}
];

const pagination = reactive({
	page: 1,
	pageSize: 10,
	pageSizes: [
		{ label: "10 每页", value: 10 },
		{ label: "15 每页", value: 15 },
		{ label: "20 每页", value: 20 },
		{ label: "30 每页", value: 30 }
	],
	onUpdatePageSize: (pageSize) => {
		pagination.pageSize = pageSize;
		pagination.onUpdatePage(1);
	},
	onUpdatePage: (page = pagination.page) => {
		pagination.page = page;
		query();
	}
});

const filterReactive = reactive({
	entity: {},
	filter: {
		page: {
			start: computed(() => (pagination.page - 1) * pagination.pageSize),
			end: computed(() => pagination.pageSize)
		}
	}
});

const data = [
	{
		label: "label1",
		value: "value1"
	},
	{
		label: "label2",
		value: "value2"
	},
	{
		label: "label3",
		value: "value3"
	}
];

async function query() {
	loading.value = true;

	await queryList(
		message,
		Service.BookInfos.filteredList(filterReactive),
		itemCountRef,
		tableDataRef
	);
	loading.value = false;
}


onMounted(() => {
	query();
});
</script>

<template>
	<n-flex style="flex-wrap: nowrap">
		<n-space class="flex-auto" vertical>
			<n-space>
				<n-pagination v-model:page="pagination.page" :item-count="itemCountRef" simple />
				<n-select v-model:value="pagination.pageSize" :options="pagination.pageSizes" class="w-7em"
				          size="small" @update:value="pagination.onUpdatePageSize" />
				<n-button class="ml-2" size="small" type="primary">排序</n-button>
			</n-space>
			<n-layout-content>
				<n-data-table
					:bordered="false"
					:columns="cols"
					:data="tableDataRef"
					:loading="loading"
					:show-header="false"
					:single-line="false"
					remote />
			</n-layout-content>
			<n-space reverse>
				<n-pagination v-model:page="pagination.page" :item-count="itemCountRef" simple />
				<n-select v-model:value="pagination.pageSize" :options="pagination.pageSizes" class="w-7em"
				          size="small" @update:value="pagination.onUpdatePageSize" />
			</n-space>
		</n-space>
		<n-card class="w-16em" size="small">

			<n-collapse>
				<n-collapse-item name="1" title="分类">
					<n-tree
						:data="data"
						block-node
						checkable
						checkbox-placement="right"
						@update:checked-keys="(v) => {console.log(v)}"
					/>
				</n-collapse-item>
				<n-collapse-item name="2" title="出版日期">
					<n-tree />
				</n-collapse-item>
			</n-collapse>
		</n-card>
	</n-flex>
</template>

<style scoped>

</style>