<script setup>

import { queryList } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { messageOptions } from "@/constant/options.js";
import Search from "@/icons/search.vue";
import router from "@/router/index.js";
import { J_BOOK_DETAIL } from "@/router/router-value.js";
import { debounce } from "@/utils/debounce.js";
import {
	NButton,
	NCard,
	NCollapse,
	NCollapseItem,
	NDataTable,
	NFlex,
	NInput,
	NInputGroup,
	NLayoutContent,
	NPagination,
	NSelect,
	NSpace,
	NTree,
	useMessage
} from "naive-ui";
import { computed, onBeforeMount, onMounted, onUnmounted, reactive, ref } from "vue";

const props = defineProps({
	keyword: String
});

const message = useMessage();

const queryKeyword = ref(props.keyword);

const queryContentTypeOptions = [
	{
		label: "任意内容",
		value: ""
	},
	{
		label: "ISBN",
		value: "isbn"
	},
	{
		label: "CIP",
		value: "cip"
	},
	{
		label: "题名（前缀）",
		value: "bookName"
	}

];

const queryContentTypeRef = ref("");

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

const tableDataRef = ref([]);

const itemCountRef = ref(0);

const loadingQuery = ref(false);

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


const data = [ // todo type data
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

function fromName(name) {
	return computed(
		() =>
			(!queryContentTypeRef.value
				|| queryContentTypeRef.value === name)
				? queryKeyword.value
				: ""
	);
}

const payloadReactive = reactive({
	entity: {
		bookName: fromName("bookName"),
		publisher: fromName("publisher"),
		author: fromName("author"),
		bookType: fromName("bookType"),
		keyword: fromName("keyword"),
		isbn: fromName("isbn"),
		callNumber: fromName("callNumber"),
		cip: fromName("cip")
	},
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
		Service.BookInfos.quickQuery(payloadReactive),
		itemCountRef,
		tableDataRef
	);

	loadingQuery.value = false;
}

const queryHandler = debounce(() => {
	if (!queryKeyword.value || !queryKeyword.value.toString().trim()) {
		message.warning("检索内容不可为空", messageOptions);
		// todo focus input
		return;
	}
	query();
});

onBeforeMount(() => {
	if (props.keyword) {
		query();
	}
});

onMounted(() => {
});

onUnmounted(() => {
});
</script>

<template>
	<n-flex class="items-center" justify="center" vertical>
		<n-flex class="w-80em" vertical>
			<n-input-group>
				<n-select
					v-model:value="queryContentTypeRef"
					:options="queryContentTypeOptions"
					class="w-12em"
				/>
				<n-input v-model:value="queryKeyword" placeholder="请输入关键字" />
				<n-button type="primary" @click.prevent="queryHandler">
					<template #icon>
						<Search />
					</template>
				</n-button>
			</n-input-group>
			<n-flex style="flex-wrap: nowrap">
				<n-space class="flex-auto" vertical>
					<n-space>
						<n-pagination
							v-model:page="pagination.page"
							:item-count="itemCountRef"
							simple
							@update-page="pagination.onUpdatePage"
							@update-pageSize="pagination.onUpdatePageSize"
						/>
						<n-select v-model:value="pagination.pageSize" :options="pagination.pageSizes" class="w-7em"
						          size="small" @update:value="pagination.onUpdatePageSize" />
						<n-button class="ml-2" size="small" type="primary">排序</n-button>
					</n-space>
					<n-layout-content>
						<n-data-table
							:bordered="false"
							:columns="cols"
							:data="tableDataRef"
							:loading="loadingQuery"
							:row-props="rowProps"
							:show-header="false"
							:single-line="false"
							remote />
					</n-layout-content>
					<n-space reverse>
						<n-pagination
							v-model:page="pagination.page"
							:item-count="itemCountRef"
							simple
							@update-page="pagination.onUpdatePage"
							@update-pageSize="pagination.onUpdatePageSize"
						/>
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
		</n-flex>
	</n-flex>
</template>

<style scoped>

</style>