<script setup>
import { action, queryList } from "@/api/action.js";
import { Service } from "@/api/index.js";
import router from "@/router/index.js";
import { J_BOOK_DETAIL } from "@/router/route-value.js";
import { formatTo } from "@/utils/format.js";
import {
	NButton,
	NCard,
	NCollapseTransition,
	NDataTable,
	NFlex,
	NLayout,
	NLayoutContent,
	NPagination,
	NSelect,
	NSpace,
	NSpin,
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

const isShowQueryFormRef = ref(true);

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
		key: "publishedDate",
		render: (row) => {
			return formatTo(row?.publishedDate, "yyyy年MM月");
		}
	},
	{
		title: "索引号",
		key: "callNumber"
	}
];

function rowProps(row) {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			const _to = router.resolve({
				name: J_BOOK_DETAIL.name,
				params: {
					id: row?.id
				}
			});
			window.open(_to.href, "_blank");
		}
	};
}


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
	action(message, Service.ClcIndexes.list(), (res) => {
		res?.forEach((item) => {
			setItemLabel(item);
		});
		treeDataRef.value = [...res];
	});
});
</script>

<template>
	<n-spin :show="loadingQuery">
		<n-flex class="items-center" justify="center" vertical>
			<n-flex class="w-80em" vertical>
				<n-card>
					<n-flex class="items-center" justify="space-between">
						中图分类号（点击类别查看）
						<n-button style="--n-padding: 0;" :bordered="false" @click.prevent="isShowQueryFormRef = !isShowQueryFormRef">
							<span v-show="isShowQueryFormRef">收起</span><span v-show="!isShowQueryFormRef">展开</span>
						</n-button>
					</n-flex>
					<n-collapse-transition :show="isShowQueryFormRef">
						<n-card class="relative h-100% h-40em m-t-1em">
							<n-layout-content style="background: none;" :native-scrollbar="false" class="absolute top-.3em bottom-.3em left-.3em right-.3em">
								<n-tree
									:data="treeDataRef"
									:default-expanded-keys="defaultExpandedKeys"
									:node-props="nodeProps"
									accordion
									selectable
									show-line
								/>
							</n-layout-content>
						</n-card>
					</n-collapse-transition>
				</n-card>
				<n-card>
					&nbsp;
					<n-space v-if="tableDataRef.length" vertical>
						<n-space>
							<n-pagination v-model:page="pagination.page" :item-count="itemCountRef" simple />
							<n-select v-model:value="pagination.pageSize" :options="pageSizeOptions" class="w-7em"
							          size="small" />
							<n-button class="ml-2" size="small" type="primary">排序</n-button>
						</n-space>
							<n-data-table
								:columns="cols"
								:data="tableDataRef"
								:loading="loadingQuery"
								:row-props="rowProps"
								:show-header="false"
								:single-line="false"
								bordered
								remote />
						<n-space reverse>
							<n-pagination v-model:page="pagination.page" :item-count="itemCountRef" simple />
							<n-select v-model:value="pagination.pageSize" :options="pageSizeOptions" class="w-7em"
							          size="small" />
						</n-space>
					</n-space>
					<n-text v-else-if="isQueriedRef">没有你想要的东西哦</n-text>
				</n-card>
			</n-flex>
		</n-flex>
	</n-spin>
</template>

<style scoped></style>
