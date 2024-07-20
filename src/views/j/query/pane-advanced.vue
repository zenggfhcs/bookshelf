<script setup>
import { queryList } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { messageOptions } from "@/constant/options.js";
import router from "@/router/index.js";
import { J_BOOK_DETAIL } from "@/router/route-value.js";
import { debounce } from "@/utils/debounce.js";
import { formatTo } from "@/utils/format.js";
import { copyMatchingProperties } from "@/utils/index.js";
import {
	NButton,
	NCard,
	NCollapseTransition,
	NDataTable,
	NFlex,
	NForm,
	NFormItem,
	NGi,
	NGrid,
	NInput,
	NPagination,
	NSelect,
	NSpace,
	NSpin,
	NText,
	useMessage
} from "naive-ui";
import { computed, onMounted, reactive, ref } from "vue";

const props = defineProps({});

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

const payload = reactive({
	entity: {
		bookName: "",
		publisher: "",
		author: "",
		bookType: "",
		keyword: "",
		isbn: "",
		// callNumber: "",
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
	// callNumber: "",
	cip: ""
};

const isShowQueryFormRef = ref(true);

function reset() {
	copyMatchingProperties(ENTITY_DEFAULT_VALUE, payload.entity);
}


async function query() {
	loadingQuery.value = true;
	if (!isQueriedRef.value)
		isQueriedRef.value = true;
	await queryList(
		message,
		Service.BookInfos.filteredList(payload),
		itemCountRef,
		tableDataRef
	);

	loadingQuery.value = false;
}

function canQuery() {
	for (const entityKey in payload.entity) {
		if (payload.entity[entityKey]) {
			return true;
		}
	}
	return false;
}

const queryHandler = debounce(() => {
	// todo 至少输入一个才可以查询
	if (canQuery()) {
		query();
	} else {
		message.warning("请输入至少一项检索关键字", messageOptions);
	}
});

onMounted(() => {
});
</script>

<template>
	<n-spin :show="loadingQuery">
		<n-flex class="items-center" justify="center" vertical>
			<n-flex class="w-80em" vertical>
				<n-card>
					<n-flex class="items-center" justify="space-between">
						馆藏书目组配检索（检索点为前方一致）
						<n-button :bordered="false" @click.prevent="isShowQueryFormRef = !isShowQueryFormRef">
							<span v-show="isShowQueryFormRef">收起</span><span v-show="!isShowQueryFormRef">展开</span>
						</n-button>
					</n-flex>
					<n-collapse-transition :show="isShowQueryFormRef">
						<n-space vertical>
							<div class="font-size-1.5em"></div>
							<n-text></n-text>
							<n-form
								class="w-100%"
								label-placement="left"
								label-width="auto"
								:model="payload.entity"
								size="small">
								<n-grid :cols="4" x-gap="12" y-gap="0">
									<n-gi>
										<n-form-item label="ISBN">
											<n-input v-model:value="payload.entity.isbn" />
										</n-form-item>
									</n-gi>
									<n-gi>
										<n-form-item label="CIP">
											<n-input v-model:value="payload.entity.cip" />
										</n-form-item>
									</n-gi>
									<n-gi span="2">
										<n-form-item label="题名">
											<n-input v-model:value="payload.entity.bookName" />
										</n-form-item>
									</n-gi>
									<n-gi>
										<n-form-item label="出版社">
											<n-input v-model:value="payload.entity.publisher" />
										</n-form-item>
									</n-gi>
									<n-gi>
										<n-form-item label="著者">
											<n-input v-model:value="payload.entity.author" />
										</n-form-item>
									</n-gi>
									<n-gi>
										<n-form-item label="分类号">
											<n-input v-model:value="payload.entity.bookType" />
										</n-form-item>
									</n-gi>
									<n-gi>
										<n-form-item label="主题词">
											<n-input v-model:value="payload.entity.keyword" />
										</n-form-item>
									</n-gi>

									<!--								<n-gi>-->
									<!--									<n-form-item label="索引号">-->
									<!--										<n-input v-model:value="payload.entity.callNumber" />-->
									<!--									</n-form-item>-->
									<!--								</n-gi>-->

								</n-grid>
								<n-flex justify="space-between">
									<n-button secondary type="default" @click.prevent="reset">重置</n-button>
									<n-button type="primary" @click.prevent="queryHandler">检索</n-button>
								</n-flex>
							</n-form>
						</n-space>

					</n-collapse-transition>
				</n-card>
				<n-card>
					&nbsp;
					<n-flex v-if="tableDataRef.length" style="flex-wrap: nowrap">
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
<!--								<n-button class="ml-2" size="small" type="primary">排序</n-button>-->
							</n-space>
							<n-data-table
								:bordered="false"
								:columns="cols"
								:data="tableDataRef"
								:row-props="rowProps"
								:loading="loadingQuery"
								:show-header="false"
								:single-line="false"
								remote />
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
						<!--					<n-card class="w-16em" size="small">-->
						<!--						<n-collapse>-->
						<!--							<n-collapse-item name="1" title="分类">-->
						<!--								<n-tree-->
						<!--									:data="data"-->
						<!--									block-node-->
						<!--									checkable-->
						<!--									checkbox-placement="right"-->
						<!--									@update:checked-keys="(v) => {console.log(v)}"-->
						<!--								/>-->
						<!--							</n-collapse-item>-->
						<!--							<n-collapse-item name="2" title="出版日期">-->
						<!--								<n-tree />-->
						<!--							</n-collapse-item>-->
						<!--						</n-collapse>-->
						<!--					</n-card>-->
					</n-flex>
					<n-text v-else-if="isQueriedRef">没有你想要的东西哦</n-text>
				</n-card>
			</n-flex>
		</n-flex>
	</n-spin>
</template>

<style scoped>

</style>