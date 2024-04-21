<script setup>
import { queryList } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { B_LOG_INDEX } from "@/constant/breadcrumb.js";
import { LOG_PRE_DEFINED_SERVICE_NAME, LOG_PRE_DEFINED_TYPE, LOG_TYPE_MAP, SERVICE_NAME_MAP } from "@/constant/map.js";
import IReload from "@/icons/i-reload.vue";
import Write from "@/icons/write.vue";
import router from "@/router/index.js";
import { LOG_CHECK } from "@/router/router-value.js";
import { PAGE, PAGE_SIZE } from "@/storage/key.js";
import { session } from "@/storage/session.js";
import { getTagType, timestampToDateTimeString } from "@/utils/convert.js";
import { debounce } from "@/utils/debounce.js";
import { renderCell } from "@/utils/render.js";
import { inputValidator } from "@/utils/validator.js";
import {
	NBackTop,
	NButton,
	NDataTable,
	NDatePicker,
	NFlex,
	NForm,
	NFormItem,
	NIcon,
	NInput,
	NInputGroup,
	NInputNumber,
	NLayout,
	NLayoutFooter,
	NLayoutHeader,
	NModal,
	NPagination,
	NSelect,
	NTag,
	useMessage
} from "naive-ui";
import { computed, h, onBeforeUnmount, onMounted, reactive, ref } from "vue";

const props = defineProps([
	"showModal",
	"updateMenuItem",
	"updateBreadcrumbArray"
]);

const message = useMessage();

const cols = [
	{
		title: "数据 id",
		key: "dataId",
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			const _dataId = JSON.parse(row.input)?.id;
			if (!_dataId || _dataId === "") return renderCell();
			return h(
				NTag,
				{
					type: "info",
					bordered: false
				},
				{
					default: () => _dataId
				}
			);
		}
	},
	{
		title: "操作类型",
		key: "type",
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			return h(
				NTag,
				{
					type: getTagType.byLogType(row?.type),
					bordered: false
				},
				{
					default: () => LOG_TYPE_MAP.getByValue(row?.type)
				}
			);
		}
	},
	{
		title: "数据类型",
		key: "serviceName",
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			return h(
				NTag,
				{
					type: "warning",
					style: {
						width: "5em",
						justifyContent: "center"
					},
					bordered: false
				},
				{
					default: () => SERVICE_NAME_MAP.getByValue(row?.serviceName)
				}
			);
		}
	},
	{
		title: "运行时间-毫秒",
		key: "elapsedTime",
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) =>
			h(
				NTag,
				{
					type: getTagType.byElapsedTime(row?.elapsedTime),
					bordered: false
				},
				{
					default: () => row?.elapsedTime
				}
			)
	},
	{
		title: "记录时刻",
		key: "creationTime",
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
					default: () => row?.creationTime.replace("T", " ")
				}
			)
	},
	{
		title: "操作者 id",
		key: "createdBy.id",
		// 溢出省略
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
					default: () => row?.createdBy.id
				}
			)
	}
];

let tableData = ref([]);

const loadingRefresh = ref(false);

const showFilterModal = ref(false);

const typeOptions = LOG_PRE_DEFINED_TYPE;

const serviceNameOptions = LOG_PRE_DEFINED_SERVICE_NAME;

function rowProps(row) {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			router.push({
				name: LOG_CHECK.name,
				params: {
					id: row?.id
				}
			});
		}
	};
}

const timestamp = reactive({
	creationTime: null
});

const payloadReactive = reactive({
	entity: {
		createdBy: null,
		dataId: null,
		type: null,
		serviceName: null
	},
	filter: {
		page: {
			start: computed(() => (pagination.page - 1) * pagination.pageSize),
			end: computed(() => pagination.pageSize)
		},
		creationTime: {
			start: computed(() => {
				return timestampToDateTimeString(timestamp.creationTime?.[0]);
			}),
			end: computed(() => {
				return timestampToDateTimeString(timestamp.creationTime?.[1]);
			})
		},
		elapsedTime: {
			start: null,
			end: null
		}
	}
});

const filterResetHandler = debounce(() => {
	timestamp.creationTime = null;
});

const filterHandler = debounce(() => {
	pagination.onUpdatePage(1);
});

async function query() {
	loadingRefresh.value = true;
	await queryList(
		message,
		Service.Logs.filteredList(payloadReactive),
		itemCount,
		tableData
	);
	loadingRefresh.value = false;
}

const clickQuery = debounce(query);

const itemCount = ref(0);

const pagination = reactive({
	page: 1,
	pageSize: 10,
	showSizePicker: true,
	pageSizes: [
		{ label: "10 每页", value: 10 },
		{ label: "20 每页", value: 20 },
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
		if (!loadingRefresh.value) {
			loadingRefresh.value = true;
		}
		query();
	}
});

function specificFilter(item, filterModel) {
	// user id
	const _f1 =
		!filterModel.createdBy || +item?.createdBy === +filterModel.createdBy;
	// data id
	const _f2 = !filterModel.dataId || +item?.dataId === +filterModel.dataId;
	// type
	const _f3 = !filterModel.type || filterModel.type.indexOf(item?.type) !== -1;
	// service name
	const _f4 =
		!filterModel.serviceName ||
		filterModel.serviceName.indexOf(item?.serviceName) !== -1;
	// creationTime
	const _f5 =
		(!filterModel.creationTime.start ||
			filterModel.creationTime.start <= item?.creationTime) &&
		(!filterModel.creationTime.end ||
			filterModel.creationTime.end >= item?.creationTime);
	// elapsedTime
	const _f6 =
		(!filterModel.elapsedTime.start ||
			filterModel.elapsedTime.start <= item?.elapsedTime) &&
		(!filterModel.elapsedTime.end ||
			filterModel.elapsedTime.end >= item?.elapsedTime);
	return _f1 && _f2 && _f3 && _f4 && _f5 && _f6;
}

onBeforeUnmount(() => {

});

onMounted(() => {
	props.updateMenuItem("i-log");
	props.updateBreadcrumbArray(B_LOG_INDEX);
	session.put(PAGE, pagination.page);
	session.put(PAGE_SIZE, pagination.pageSize);
	query();
});
</script>

<template>
	<n-layout-header bordered class="h-3em" position="absolute">
		<n-flex class="h-3em items-center" justify="center">
			<n-button
				class="h-2.4em"
				secondary
				type="info"
				@click.prevent="showFilterModal = true"
			>
				<template #icon>
					<n-icon>
						<write />
					</n-icon>
				</template>
				筛选
			</n-button>
			<n-button
				:loading="loadingRefresh"
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
		class="absolute top-3em bottom-2.4em overflow-hidden"
		content-style="padding: .3em 1em;"
	>
		<!--   数据表   -->
		<n-data-table
			:columns="cols"
			:data="tableData"
			:loading="loadingRefresh"
			:render-cell="renderCell"
			:row-props="rowProps"
			:single-line="false"
			remote
			striped
		/>
		<!--   返回顶部   -->
		<n-back-top
			:bottom="2"
			:right="20"
			style="--n-height: 2.4em; --n-width: 2.4em"
		/>
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
			<n-form :model="payloadReactive">
				<n-form-item label="操作者 id" path="createdBy">
					<n-input
						v-model:value="payloadReactive.entity.createdBy"
						:allow-input="inputValidator.onlyAllowNumber"
						clearable
						placeholder="操作者 id"
					/>
				</n-form-item>
				<n-form-item label="数据 id" path="dataId">
					<n-input
						v-model:value="payloadReactive.entity.dataId"
						:allow-input="inputValidator.onlyAllowNumber"
						clearable
						placeholder="数据 id"
					/>
				</n-form-item>
				<n-form-item label="操作类型" path="type">
					<n-select
						v-model:value="payloadReactive.entity.type"
						:options="typeOptions"
						clearable
						multiple
						placeholder="选择操作类型"
					/>
				</n-form-item>
				<n-form-item label="数据类型" path="serviceName">
					<n-select
						v-model:value="payloadReactive.entity.serviceName"
						:options="serviceNameOptions"
						clearable
						placeholder="选择数据类型"
					/>
				</n-form-item>
				<n-form-item label="记录时间">
					<n-date-picker
						v-model:value="timestamp.creationTime"
						clearable
						type="datetimerange"
						update-value-on-close
					/>
				</n-form-item>
				<n-form-item label="运行时间-毫秒">
					<n-input-group>
						<n-input-number
							v-model:value="payloadReactive.filter.elapsedTime.start"
							:max="payloadReactive.filter.elapsedTime.end"
							:min="0"
							:style="{ width: '50%' }"
							clearable
						/>
						<n-input-number
							v-model:value="payloadReactive.filter.elapsedTime.end"
							:max="100000"
							:min="payloadReactive.filter.elapsedTime.start"
							:style="{ width: '50%' }"
							clearable
						/>
					</n-input-group>
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
	</n-layout>
	<n-layout-footer class="h-2.4em" position="absolute">
		<n-flex :size="8" class="items-center mr4 h-100%" justify="center">
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

<style scoped></style>
