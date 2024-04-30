<script setup>
import { action, addItem, removeItem, updateItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { B_ROUTE } from "@/constant/breadcrumb.js";
import { debounce } from "@/utils/debounce.js";
import { copyMatchingProperties, subMatchingProperties } from "@/utils/index.js";
import { resetInfo } from "@/utils/reset.js";
import { inputValidator } from "@/utils/validator.js";
import {
	NBackTop,
	NInputNumber,
	NButton,
	NDataTable,
	NDropdown,
	NFlex,
	NForm,
	NFormItem,
	NInput,
	NLayout,
	NLayoutHeader,
	NModal,
	useMessage
} from "naive-ui";
import { h, nextTick, onMounted, reactive, ref } from "vue";

const props = defineProps({
	showModal: Function,
	updateMenuItem: Function,
	updateBreadcrumbArray: Function
});

const message = useMessage();


const cols = [
	{
		title: "组",
		key: "group"
	},
	{
		title: "名称",
		key: "key"
	},
	{
		title: "显示名",
		key: "label"
	},
	{
		title: "跳转页面路由名",
		key: "toName"
	},
	{
		title: "图标名",
		key: "iconName"
	},
	{
		title: "顺序",
		key: "order"
	}
];

const tableData = ref([]);

const currentSelectedRow = reactive({
	id: null,
	parentId: null,
	group: null,
	order: 0,
	key: null,
	label: null,
	toName: null,
	iconName: null,
	revision: 0
});

const showDropdownRef = ref(false);
const xRef = ref(0);
const yRef = ref(0);

const updateInfo = reactive({
	id: null,
	parentId: null,
	group: null,
	order: 0,
	key: null,
	label: null,
	toName: null,
	iconName: null,
	revision: 0
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
			showDropdownRef.value = false;
			nextTick().then(() => {
				showDropdownRef.value = true;
				xRef.value = e.clientX;
				yRef.value = e.clientY;
			});
		}
	};
}

function handleSelect(key) {
	showDropdownRef.value = false;
	// console.log(currentSelectedNodeRef);
	switch (key) {
		case "edit": {
			copyMatchingProperties(currentSelectedRow, updateInfo);
			isShowUpdateModalRef.value = true;
			break;
		}
		case "del": {
			props.showModal("error", "删除二次确认", "是否要删除该路由？", debounce(async () => {
				await removeItem(message, Service.Routes.remove(currentSelectedRow.id));
				await query();
			}));
			break;
		}
		case "add-child": {
			resetInfo(addInfo);
			addInfo.group = currentSelectedRow.group;
			addInfo.parentId = currentSelectedRow.id;
			isShowAddModalRef.value = true;
			break;
		}
	}
}

const options = [
	{
		label: () => h("span", { style: { color: "#63e2b7" } }, "添加子项"),
		key: "add-child"
	},
	{
		label: () => h("span", { style: { color: "#f2c97d" } }, "编辑"),
		key: "edit"
	},
	{
		label: () => h("span", { style: { color: "#e88080" } }, "删除"),
		key: "del"
	}
];

const loadingQuery = ref(false);

const addHandler = debounce(async () => {
	await addItem(message, Service.Routes.add(addInfo));
	isShowAddModalRef.value = false;
	await query();
});

const isShowUpdateModalRef = ref(false);

const updateHandler = debounce(async () => {
	const _subInfo = subMatchingProperties(currentSelectedRow, updateInfo);
	_subInfo.id = currentSelectedRow.id;
	_subInfo.revision = currentSelectedRow.revision;
	console.log(currentSelectedRow);
	await updateItem(message, Service.Routes.update(_subInfo));
	isShowUpdateModalRef.value = false;
	await query();
});

async function query() {
	loadingQuery.value = true;

	await action(message, Service.Routes.firstLevel(), (res) => {
		tableData.value = res;
	});

	loadingQuery.value = false;
}

const rules = {
	group: {
		required: true,
		message: "请输入",
		trigger: ["input", "blur"]
	},
	key: {
		required: true,
		message: "请输入",
		trigger: ["input", "blur"]
	},
	label: {
		required: true,
		message: "请输入",
		trigger: ["input", "blur"]
	},
	// toName: {
	// 	required: true,
	// 	message: "请输入",
	// 	trigger: ["input", "blur"]
	// },
	iconName: {
		required: true,
		message: "请输入",
		trigger: ["input", "blur"]
	}
};

const addInfo = reactive({
	id: null,
	parentId: null,
	group: null,
	order: 0,
	key: null,
	label: null,
	toName: null,
	iconName: null,
	revision: 0
});

const isShowAddModalRef = ref(false);

const showAddModalHandler = debounce((group) => {
	resetInfo(addInfo);
	addInfo.group = group;
	isShowAddModalRef.value = true;
});

const queryHandler = debounce(() => {
	query();
});


onMounted(() => {
	props.updateMenuItem("i-route");
	props.updateBreadcrumbArray(B_ROUTE);
	query();
});
</script>

<template>
	<n-layout-header bordered class="h-3em" position="absolute">
		<n-flex class="h-3em items-center m-l-1em m-r-1em" justify="center">
			<n-button :bordered tertiary type="info" @click.prevent="queryHandler">刷新</n-button>
			<n-button :bordered type="success" @click.prevent="showAddModalHandler(props.group)">添加</n-button>
		</n-flex>
	</n-layout-header>
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
		/>
	</n-layout>
	<n-modal
		id="add-modal"
		v-model:show="isShowAddModalRef"
		:mask-closable="false"
		class="w-25em"
		preset="dialog"
		title="添加"
		transform-origin="center">
		<n-form :model="addInfo" :rules="rules">
			<n-form-item label="组" path="group">
				<n-input
					v-model:value="addInfo.group"
					:allow-input="inputValidator.noSideSpace"
					clearable
				/>
			</n-form-item>
			<n-form-item label="名称" path="key">
				<n-input
					v-model:value="addInfo.key"
					:allow-input="inputValidator.noSideSpace"
					clearable
				/>
			</n-form-item>
			<n-form-item label="显示名" path="label">
				<n-input
					v-model:value="addInfo.label"
					:allow-input="inputValidator.noSideSpace"
					clearable
				/>
			</n-form-item>
			<n-form-item label="目标路由" path="toName">
				<n-input
					v-model:value="addInfo.toName"
					:allow-input="inputValidator.noSideSpace"
					clearable
				/>
			</n-form-item>
			<n-form-item label="图标名" path="iconName">
				<n-input
					v-model:value="addInfo.iconName"
					:allow-input="inputValidator.noSideSpace"
					clearable
				/>
			</n-form-item>
			<n-form-item label="顺序" path="order">
				<n-input-number v-model:value="addInfo.order" :min="0" clearable />
			</n-form-item>
		</n-form>
		<n-flex justify="right">
			<n-button
				type="success"
				@click.prevent="addHandler">
				提交
			</n-button>
		</n-flex>
	</n-modal>
	<n-modal
		id="update-modal"
		v-model:show="isShowUpdateModalRef"
		:mask-closable="false"
		class="w-25em"
		preset="dialog"
		title="添加"
		transform-origin="center">
		<n-form :model="updateInfo" :rules="rules">
			<n-form-item label="组" path="group">
				<n-input
					v-model:value="updateInfo.group"
					:allow-input="inputValidator.noSideSpace"
					clearable
				/>
			</n-form-item>
			<n-form-item label="名称" path="key">
				<n-input
					v-model:value="updateInfo.key"
					:allow-input="inputValidator.noSideSpace"
					clearable
				/>
			</n-form-item>
			<n-form-item label="显示名" path="label">
				<n-input
					v-model:value="updateInfo.label"
					:allow-input="inputValidator.noSideSpace"
					clearable
				/>
			</n-form-item>
			<n-form-item label="目标路由" path="toName">
				<n-input
					v-model:value="updateInfo.toName"
					:allow-input="inputValidator.noSideSpace"
					clearable
				/>
			</n-form-item>
			<n-form-item label="图标名" path="iconName">
				<n-input
					v-model:value="updateInfo.iconName"
					:allow-input="inputValidator.noSideSpace"
					clearable
				/>
			</n-form-item>
			<n-form-item label="顺序" path="order">
				<n-input-number v-model:value="updateInfo.order" :min="0" clearable />
			</n-form-item>
		</n-form>
		<n-flex justify="right">
			<n-button
				type="success"
				@click.prevent="updateHandler">
				提交
			</n-button>
		</n-flex>
	</n-modal>
</template>

<style scoped>

</style>