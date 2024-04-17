<script setup>
import { Service } from "@/api/index.js";
import { debounce } from "@/utils/debounce.js";
import { copyMatchingProperties } from "@/utils/index.js";
import { queryList } from "@/utils/query.js";
import {
	NButton,
	NCard,
	NCollapse,
	NCollapseItem,
	NDataTable,
	NFlex,
	NForm,
	NFormItem,
	NGi,
	NGrid,
	NInput,
	NLayout,
	NLayoutContent,
	NPagination,
	NSelect,
	NSpace,
	NTree,
	useMessage
} from "naive-ui";
import { computed, onMounted, reactive, ref } from "vue";

const props = defineProps(["updateMenuItem"]);

const message = useMessage();

const loadingQuery = ref(false);

const isQueriedRef = ref(false);

const itemCountRef = ref(0);

const tableDataRef = ref([]);

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

const payloadReactive = reactive({
	entity: {
		bookName: "",
		publisher: "",
		author: "",
		bookType: "",
		keyword: "",
		isbn: "",
		callNumber: "",
		cip: ""
	},
	filter: {
		page: {
			start: computed(() => (pagination.page - 1) * pagination.pageSize),
			end: computed(() => pagination.pageSize)
		}
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

const ENTITY_DEFAULT_VALUE = {
	bookName: "",
	publisher: "",
	author: "",
	bookType: "",
	keyword: "",
	isbn: "",
	callNumber: "",
	cip: ""
};

function reset() {
	copyMatchingProperties(ENTITY_DEFAULT_VALUE, payloadReactive.entity);
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

const handleQuery = debounce(() => {
	query();
});

onMounted(() => {
	props.updateMenuItem("j-advanced-query");
});
</script>

<template>
	<n-layout>
		<n-flex class="items-center" justify="center" vertical>
			<n-card class="w-80em">
				<n-space vertical>
					<div class="font-size-1.5em">馆藏书目组配检索(tips:&nbsp;检索点为前方一致)</div>
					<n-form
						label-placement="left"
						label-width="auto"
						class="w-100%"
						size="small">
						<n-grid :cols="4" x-gap="12" y-gap="0">
							<n-gi>
								<n-form-item label="题名">
									<n-input v-model:value="payloadReactive.entity.bookName" />
								</n-form-item>
							</n-gi>
							<n-gi>
								<n-form-item label="出版社">
									<n-input v-model:value="payloadReactive.entity.publisher" />
								</n-form-item>
							</n-gi>
							<n-gi>
								<n-form-item label="著者">
									<n-input v-model:value="payloadReactive.entity.author" />
								</n-form-item>
							</n-gi>
							<n-gi>
								<n-form-item label="分类号">
									<n-input v-model:value="payloadReactive.entity.bookType" />
								</n-form-item>
							</n-gi>
							<n-gi>
								<n-form-item label="主题词">
									<n-input v-model:value="payloadReactive.entity.keyword" />
								</n-form-item>
							</n-gi>
							<n-gi>
								<n-form-item label="ISBN">
									<n-input v-model:value="payloadReactive.entity.isbn" />
								</n-form-item>
							</n-gi>
							<n-gi>
								<n-form-item label="索引号">
									<n-input v-model:value="payloadReactive.entity.callNumber" />
								</n-form-item>
							</n-gi>
							<n-gi>
								<n-form-item label="CIP">
									<n-input v-model:value="payloadReactive.entity.cip" />
								</n-form-item>
							</n-gi>
						</n-grid>
						<n-flex justify="space-between">
							<n-button secondary type="default" @click.prevent="reset">重置</n-button>
							<n-button type="primary" @click.prevent="handleQuery">检索</n-button>
						</n-flex>
					</n-form>
				</n-space>
			</n-card>
			<n-flex v-if="tableDataRef.length" class="w-80em" style="flex-wrap: nowrap">
				<n-space class="flex-auto" vertical>
					<n-space>
						<n-pagination
							v-model:page="pagination.page"
							:item-count="itemCountRef"
							@update-page="pagination.onUpdatePage"
							@update-pageSize="pagination.onUpdatePageSize"
							simple
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
							:show-header="false"
							:single-line="false"
							remote />
					</n-layout-content>
					<n-space reverse>
						<n-pagination
							v-model:page="pagination.page"
							:item-count="itemCountRef"
							@update-page="pagination.onUpdatePage"
							@update-pageSize="pagination.onUpdatePageSize"
							simple
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
			<n-card v-else-if="isQueriedRef" >没有你想要的东西哦</n-card>
		</n-flex>
	</n-layout>

</template>

<style scoped>

</style>