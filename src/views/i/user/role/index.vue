<script setup>
import { action, queryList } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { B_ROLE_INDEX } from "@/constant/breadcrumb.js";
import { messageOptions } from "@/constant/options.js";
import IAdd from "@/icons/i-add.vue";
import IDelete from "@/icons/i-delete.vue";
import IReload from "@/icons/i-reload.vue";
import router from "@/router/index.js";
import { ROLE_CHECK } from "@/router/route-value.js";
import { debounce } from "@/utils/debounce.js";
import { renderCell } from "@/utils/render.js";
import { formValidator, inputValidator } from "@/utils/validator.js";
import {
	NBackTop,
	NButton,
	NDataTable,
	NFlex,
	NForm,
	NFormItem,
	NIcon,
	NInput,
	NLayout,
	NLayoutFooter,
	NLayoutHeader,
	NModal,
	NPagination,
	useMessage
} from "naive-ui";
import { computed, onMounted, reactive, ref } from "vue";

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
		title: "角色名",
		key: "name",
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			if (!row?.name) return renderCell();
			return row?.name;
		}
	},
	{
		title: "角色描述",
		key: "remark",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			if (!row?.remark) return renderCell();
			return row?.remark;
		}
	}
];

const addFormRef = ref();

const addRules = {
	name: [
		{
			required: true,
			message: "请输入",
			trigger: ["input", "blur"]
		}
	]
};

const checkedRowKeysRef = ref([]);

function handleCheck(rowKeys) {
	checkedRowKeysRef.value = rowKeys;
}

const loadingQuery = ref(false);

const loadingAdd = ref(false);

const showAddModal = ref(false);

function rowProps(row) {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			router.push({
				name: ROLE_CHECK.name,
				params: {
					id: row?.id
				}
			});
		}
	};
}

const payloadReactive = reactive({
	entity: {
		name: "",
		remark: ""
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
		Service.Roles.filteredList(payloadReactive),
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

const addHandler = debounce(() => {
	formValidator(addFormRef, message, async () => {
		loadingAdd.value = true;

		await action(message, Service.Roles.add(payloadReactive.entity), () => {
			message.success("添加成功", messageOptions);
			showAddModal.value = false;
			query();
		});

		loadingAdd.value = false;
	});

});


onMounted(() => {
	props.updateMenuItem("roleInfo");
	props.updateBreadcrumbArray(B_ROLE_INDEX);// todo
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
			<n-button type="success" @click.prevent="showAddModal = true">
				<template #icon>
					<n-icon :component="IAdd" />
				</template>
				新增
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
		id="add-modal"
		v-model:show="showAddModal"
		:mask-closable="false"
		class="w-25em"
		preset="dialog"
		title="添加角色"
		transform-origin="center"
	>
		<n-form ref="addFormRef" :model="payloadReactive.entity" :rules="addRules">
			<n-form-item label="角色名" path="name">
				<n-input
					v-model:value="payloadReactive.entity.name"
					:allow-input="inputValidator.noSideSpace"
					placeholder="名"
				/>
			</n-form-item>
			<n-form-item label="邮箱" path="email">
				<n-input
					v-model:value="payloadReactive.entity.remark"
					:allow-input="inputValidator.noSideSpace"
					clearable
					placeholder="描述"
				/>
			</n-form-item>
		</n-form>
		<n-flex justify="right">
			<n-button
				:loading="loadingAdd"
				type="success"
				@click.prevent="addHandler">
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
