<script setup>
import { action, addItem, queryList, removeItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { B_PERMISSION } from "@/constant/breadcrumb.js";
import { INFO } from "@/constant/default-info.js";
import { messageOptions } from "@/constant/options.js";
import IAdd from "@/icons/i-add.vue";
import IDelete from "@/icons/i-delete.vue";
import IReload from "@/icons/i-reload.vue";
import { debounce } from "@/utils/debounce.js";
import { copyMatchingProperties, subMatchingProperties } from "@/utils/index.js";
import { renderCell } from "@/utils/render.js";
import { formValidator, inputValidator } from "@/utils/validator.js";
import {
	NBackTop,
	NButton,
	NDataTable,
	NDropdown,
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
import { computed, h, nextTick, onMounted, reactive, ref } from "vue";

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
		title: "权限名",
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
		title: "权限 url",
		key: "url",
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		render: (row) => {
			if (!row?.url) return renderCell();
			return row?.url;
		}
	},
	{
		title: "权限描述",
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

const updateFormRef = ref();

const addRules = {
	name: [
		{
			required: true,
			message: "请输入",
			trigger: ["input", "blur"]
		}
	],
	url: [
		{
			required: true,
			message: "请输入",
			trigger: ["input", "blur"]
		}
	]
};

const updateRules = {
	name: [
		{
			required: true,
			message: "请输入",
			trigger: ["input", "blur"]
		}
	],
	url: [
		{
			required: true,
			message: "请输入",
			trigger: ["input", "blur"]
		}
	],
	remark: []
};

const checkedRowKeysRef = ref([]);

function handleCheck(rowKeys) {
	checkedRowKeysRef.value = rowKeys;
}

const loadingQuery = ref(false);

const loadingAdd = ref(false);

const loadingUpdate = ref(false);

const showAddModal = ref(false);

const showUpdateModal = ref(false);

const showDropdownRef = ref(false);

function handleSelect(key) {
	showDropdownRef.value = false;
	// console.log(currentSelectedNodeRef);
	switch (key) {
		case "edit": {
			showUpdateModal.value = true;
			break;
		}
		case "del": {
			props.showModal("error", "删除二次确认", "是否要删除该权限？", debounce(async () => {
				await removeItem(message, Service.Permissions.remove(currentSelectedRow.id));
				await query();
			}));
			break;
		}
	}
}

const xRef = ref(0);

const yRef = ref(0);

const options = [
	{
		label: () => h("span", { style: { color: "#f2c97d" } }, "编辑"),
		key: "edit"
	},
	{
		label: () => h("span", { style: { color: "#e88080" } }, "删除"),
		key: "del"
	}
];

const currentSelectedRow = reactive({
	id: 0,
	name: "",
	url: "",
	remark: "",
	revision: ""
});

function rowProps(row) {
	return {
		// onDblclick: (e) => {
		// 	e.preventDefault();
		// 	Object.assign(updateInfo, INFO.PERMISSION);
		// 	copyMatchingProperties(row, updateInfo);
		// 	showUpdateModal.value = true;
		// },
		onContextmenu: (e) => {
			e.preventDefault();
			copyMatchingProperties(row, currentSelectedRow);
			copyMatchingProperties(row, updateInfo);
			showDropdownRef.value = false;
			nextTick().then(() => {
				showDropdownRef.value = true;
				xRef.value = e.clientX;
				yRef.value = e.clientY;
			});
		}
	};
}

const payload = reactive({
	entity: {
		name: "",
		url: "",
		remark: ""
	},
	filter: {
		page: {
			start: computed(() => (pagination.page - 1) * pagination.pageSize),
			end: computed(() => pagination.pageSize)
		}
	}
});

const addInfo = reactive({
	name: "",
	url: "",
	remark: ""
});

const updateInfo = reactive({
	id: 0,
	name: "",
	url: "",
	remark: "",
	revision: 0
});


async function query() {
	loadingQuery.value = true;
	await queryList(
		message,
		Service.Permissions.filteredList(payload),
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

const showAddModalHandler = debounce(() => {
	Object.assign(addInfo, INFO.PERMISSION);
	showAddModal.value = true;
});

const addHandler = debounce(() => {
	formValidator(addFormRef, message, async () => {
		loadingAdd.value = true;

		await addItem(message, Service.Permissions.add(addInfo), () => {
			showAddModal.value = false;
			query();
		});

		loadingAdd.value = false;
	});

});

const updateHandler = debounce(() => {
	formValidator(updateFormRef, message, async () => {
		loadingUpdate.value = true;

		const _subInfo = subMatchingProperties(currentSelectedRow, updateInfo);
		_subInfo.id = currentSelectedRow.id;
		_subInfo.revision = currentSelectedRow.revision;
		await action(message, Service.Permissions.update(_subInfo), () => {
			message.success("更新成功", messageOptions);
			showUpdateModal.value = false;
			query();
		});

		loadingUpdate.value = false;
	});
});


onMounted(() => {
	props.updateMenuItem("i-permission");
	props.updateBreadcrumbArray(B_PERMISSION);
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
			<n-button type="success" @click.prevent="showAddModalHandler">
				<template #icon>
					<IAdd />
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

	<n-dropdown
		:on-clickoutside="handleSelect"
		:options="options"
		:show="showDropdownRef"
		:x="xRef"
		:y="yRef"
		placement="bottom-start"
		trigger="manual"
		@clickoutside="showDropdownRef = false;"
		@select="handleSelect"
	/>
	<n-modal
		id="add-modal"
		v-model:show="showAddModal"
		:mask-closable="false"
		class="w-25em"
		preset="dialog"
		title="添加角色"
		transform-origin="center"
	>
		<n-form ref="addFormRef" :model="addInfo" :rules="addRules">
			<n-form-item label="权限名" path="name">
				<n-input
					v-model:value="addInfo.name"
					:allow-input="inputValidator.noSideSpace"
					placeholder="名"
				/>
			</n-form-item>
			<n-form-item label="权限 url" path="url">
				<n-input
					v-model:value="addInfo.url"
					:allow-input="inputValidator.noSideSpace"
					clearable
					placeholder="描述"
				/>
			</n-form-item>
			<n-form-item label="权限描述" path="remark">
				<n-input
					v-model:value="addInfo.remark"
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
	<n-modal
		id="update-modal"
		v-model:show="showUpdateModal"
		:mask-closable="false"
		class="w-25em"
		preset="dialog"
		title="修改权限"
		transform-origin="center">
		<n-form ref="updateFormRef" :model="updateInfo" :rules="updateRules">
			<n-form-item label="权限名" path="name">
				<n-input
					v-model:value="updateInfo.name"
					:allow-input="inputValidator.noSideSpace"
					placeholder="名"
				/>
			</n-form-item>
			<n-form-item label="权限url" path="url">
				<n-input
					v-model:value="updateInfo.url"
					:allow-input="inputValidator.noSideSpace"
					clearable
					placeholder="描述"
				/>
			</n-form-item>
			<n-form-item label="权限描述" path="remark">
				<n-input
					v-model:value="updateInfo.remark"
					:allow-input="inputValidator.noSideSpace"
					clearable
					placeholder="描述"
				/>
			</n-form-item>
		</n-form>
		<n-flex justify="right">
			<n-button
				:loading="loadingUpdate"
				type="success"
				@click.prevent="updateHandler">
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
