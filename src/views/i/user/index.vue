<script setup>
import { queryList } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { B_USER_INDEX } from "@/constant/breadcrumb.js";
import { ROLE_MAP, ROLE_PRE_DEFINED } from "@/constant/map.js";
import IDelete from "@/icons/i-delete.vue";
import IReload from "@/icons/i-reload.vue";
import Write from "@/icons/write.vue";
import router from "@/router/index.js";
import { USER_CHECK } from "@/router/route-value.js";
import { convertGender, getTagType } from "@/utils/convert.js";
import { debounce } from "@/utils/debounce.js";
import { renderCell } from "@/utils/render.js";
import { inputValidator } from "@/utils/validator.js";
import {
	NBackTop,
	NButton,
	NDataTable,
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
	NSelect,
	NTag,
	useMessage
} from "naive-ui";
import { computed, h, onMounted, reactive, ref } from "vue";

const props = defineProps([
	"showModal",
	"updateMenuItem",
	"updateBreadcrumbArray"
]);
const message = useMessage();

function filterResetHandler() {
}

function filterHandler() {
	query();
}

const itemCount = ref(0);

const tableData = ref([]);

const cols = [
	{
		type: "selection"
	},
	{
		title: "用户昵称",
		key: "displayName",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			if (!row?.displayName) return renderCell();
			return row?.displayName;
		}
	},
	{
		title: "用户名",
		key: "displayName",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			if (!(row?.surname || row?.name)) return renderCell();
			return h(
				NTag,
				{
					bordered: false
				},
				{
					default: () => `${row?.surname} ${row?.name}`
				}
			);
		}
	},
	{
		title: "邮箱",
		key: "email",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) =>
			h(
				NTag,
				{
					bordered: false,
					type: "error"
				},
				{
					default: () => row?.email
				}
			)
	},
	{
		title: "电话",
		key: "phoneNumber",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			if (!row?.phoneNumber || row?.phoneNumber === "") return renderCell();
			return h(
				NTag,
				{
					bordered: false,
					type: "error"
				},
				{
					default: () => row?.phoneNumber
				}
			);
		}
	},
	{
		title: "角色",
		key: "roles",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			return h(
				NTag,
				{
					type: getTagType.byUserRole(row?.role?.name),
					bordered: false
				},
				{
					default: () => ROLE_MAP.getByValue(row?.role?.name)
				}
			);
		}
	},
	{
		title: "年龄",
		key: "age",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			if (typeof row?.age !== "number" || row?.age <= 0) return renderCell();
			return h(
				NTag,
				{
					type: getTagType.byAge(row?.age),
					bordered: false
				},
				{
					default: () => row?.age
				}
			);
		}
	},
	{
		title: "性别",
		key: "gender",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			if (!convertGender(row?.gender)) return renderCell();
			return h(
				NTag,
				{
					bordered: false,
					type: getTagType.byGender(row?.gender)
				},
				{
					default: () => convertGender(row?.gender)
				}
			);
		}
	}
];

const checkedRowKeysRef = ref([]);

function handleCheck(rowKeys) {
	checkedRowKeysRef.value = rowKeys;
}

const loadingQuery = ref(false);

const showFilterModal = ref(false);

function rowProps(row) {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			router.push({
				name: USER_CHECK.name,
				params: {
					id: row?.id
				}
			});
		}
	};
}

const payloadReactive = reactive({
	entity: {
		surname: "",
		name: "",
		email: "",
		phoneNumber: "",
		role: {
			id: "",
			name: ""
		}
	},
	filter: {
		page: {
			start: computed(() => (pagination.page - 1) * pagination.pageSize),
			end: computed(() => pagination.pageSize)
		}
	}
});

const roleOptions = ROLE_PRE_DEFINED;

async function query() {
	loadingQuery.value = true;
	await queryList(
		message,
		Service.Users.filteredList(payloadReactive),
		itemCount,
		tableData
	);
	loadingQuery.value = false;
}

const clickQuery = debounce(() => {
	query();
});

const pagination = reactive({
	page: 1,
	pageSize: 10,
	showSizePicker: true,
	pageSizes: [
		{ label: "10 每页", value: 10 },
		{ label: "15 每页", value: 15 },
		{ label: "20 每页", value: 20 },
		{ label: "30 每页", value: 30 }
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
		query();
	}
});


onMounted(() => {
	props.updateMenuItem("userInfo");
	props.updateBreadcrumbArray(B_USER_INDEX);
	query();
});
</script>

<template>
	<n-layout-header bordered class="h-3em" position="absolute">
		<n-flex class="h-3em items-center m-l-1em m-r-1em" justify="center">
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
				:loading="loadingQuery"
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
			@update-checked-row-keys="handleCheck"
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
		<n-form :model="payloadReactive">
			<n-form-item label="用户名" path="id">
				<n-input-group>
					<n-input
						v-model:value="payloadReactive.entity.surname"
						:allow-input="inputValidator.noSideSpace"
						:style="{ width: '30%' }"
						placeholder="姓"
					/>
					<n-input-group-label>&nbsp;</n-input-group-label>
					<n-input
						v-model:value="payloadReactive.entity.name"
						:allow-input="inputValidator.noSideSpace"
						placeholder="名"
					/>
				</n-input-group>
			</n-form-item>
			<n-form-item label="邮箱" path="email">
				<n-input
					v-model:value="payloadReactive.entity.email"
					:allow-input="inputValidator.noSideSpace"
					clearable
					placeholder="输入邮箱"
				/>
			</n-form-item>
			<n-form-item label="电话" path="phone">
				<n-input
					v-model:value="payloadReactive.entity.phoneNumber"
					:allow-input="inputValidator.onlyAllowNumber"
					clearable
					maxlength="11"
					placeholder="输入电话"
				/>
			</n-form-item>
			<n-form-item label="角色" path="role">
				<n-select
					v-model:value="payloadReactive.entity.role.name"
					:options="roleOptions"
					clearable
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

<style scoped>
.n-menu .n-menu-item-content .n-menu-item-content-header a {
	font-weight: 800 !important;
}
</style>
