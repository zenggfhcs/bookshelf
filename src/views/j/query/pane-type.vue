<script setup>
import { action, queryList } from "@/api/action.js";
import { Service } from "@/api/index.js";
import {
	NButton,
	NCard,
	NDataTable,
	NLayout,
	NLayoutContent,
	NLayoutSider,
	NPagination,
	NSelect,
	NSpace,
	NText,
	NTree,
	useMessage
} from "naive-ui";
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";

const message = useMessage();

const props = defineProps({});

const defaultExpandedKeys = ref([]);

const treeDataRef = ref([]);

const itemCountRef = ref(0);

const tableDataRef = ref([]);

const loadingQuery = ref(false);

const isQueriedRef = ref(false);

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
		key: "publishDate"
	},
	{
		title: "索引号",
		key: "callNumber"
	}
];


const pageSizeOptions = [
	{
		value: 20,
		label: "20 / 页"
	},
	{
		value: 50,
		label: "50 / 页"
	},
	{
		value: 100,
		label: "100 / 页"
	}
];

const pageSizeRef = ref(20);

const pagination = reactive({
	page: 1,
	pageSize: 20
});

const payloadReactive = reactive({
	entity: {
		bookType: ""
	},
	filter: {
		page: {
			start: computed(() => (pagination.page - 1) * pagination.pageSize),
			end: computed(() => pagination.pageSize)
		}
	}
});

function setItemLabel(item) {
	item.label = `${item.key}  ${item.value}`;
	item.value = `${item.key}`;
	if (!item.children || !item.children.length) {
		// 清除叶子节点的展开按键
		item.children = null;
		return;
	}
	item?.children?.forEach(setItemLabel);
}

function nodeProps({ option }) {
	return {
		onClick() {
			// todo 查询对应分类书籍
			payloadReactive.entity.bookType = option.value;
			query();
		}
	};
}

async function query() {
	loadingQuery.value = true;
	if (!isQueriedRef.value)
		isQueriedRef.value = true;
	await queryList(
		message,
		Service.BookInfos.filteredList(payloadReactive),
		itemCountRef,
		tableDataRef
	);
	loadingQuery.value = false;
}

onBeforeMount(() => {
});

onMounted(async () => {
	action(message, Service.BookInfos.getFirstLevelType(), (res) => {
		res?.forEach((item) => {
			setItemLabel(item);
		});
		treeDataRef.value = [...res];
	});
});
</script>

<template>
	<n-card>
		<n-layout has-sider>
			<n-layout-sider class="m-r-4" collapse-mode="width" width="500">
				<n-card class="h-100%" title="中图法分类（点击类别查看）">
					<n-tree
						:data="treeDataRef"
						:default-expanded-keys="defaultExpandedKeys"
						:node-props="nodeProps"
						accordion
						selectable
						show-line
					/>
				</n-card>
			</n-layout-sider>
			<n-card>
				<n-space v-if="tableDataRef.length" vertical>
					<n-space>
						<n-pagination v-model:page="pagination.page" :item-count="itemCountRef" simple />
						<n-select v-model:value="pagination.pageSize" :options="pageSizeOptions" class="w-7em" size="small" />
						<n-button class="ml-2" size="small" type="primary">排序</n-button>
					</n-space>
					<n-layout-content>
						<n-data-table
							:columns="cols"
							:data="tableDataRef"
							:loading="loadingQuery"
							:show-header="false"
							:single-line="false"
							bordered
							remote />
					</n-layout-content>
					<n-space reverse>
						<n-pagination v-model:page="pagination.page" :item-count="itemCountRef" simple />
						<n-select v-model:value="pagination.pageSize" :options="pageSizeOptions" class="w-7em" size="small" />
					</n-space>
				</n-space>
				<n-text v-else-if="isQueriedRef">没有你想要的东西哦</n-text>
			</n-card>
		</n-layout>
	</n-card>
</template>

<style scoped></style>
