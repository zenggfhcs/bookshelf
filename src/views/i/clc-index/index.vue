<script setup>

import { action, addItem, removeItem, updateItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { B_CLC_INDEX } from "@/constant/breadcrumb.js";
import IAdd from "@/icons/i-add.vue";
import IReload from "@/icons/i-reload.vue";
import { debounce } from "@/utils/debounce.js";
import { copyMatchingProperties, subMatchingProperties } from "@/utils/index.js";
import { resetInfo } from "@/utils/reset.js";
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
	NLayoutHeader,
	NModal,
	useMessage
} from "naive-ui";
import { createVNode, h, nextTick, onMounted, reactive, ref } from "vue";

const props = defineProps({
	showModal: Function,
	updateBreadcrumbArray: Function,
	updateMenuItem: Function
});

const message = useMessage();

const tableData = ref([]);

const cols = [
	{
		title: "分类号",
		key: "key",
		width: 666,
		render: (row) => {
			return createVNode(
				"div",
				{
					style: {
						float: "right"
					}
				},
				{ default: () => row?.key }
			);
		}
	},
	{
		title: "分类号",
		key: "value"
	}
];

const showDropdownRef = ref(false);

const xRef = ref(0);

const yRef = ref(0);

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

const isShowAddModalRef = ref(false);

const addInfo = reactive({
	parent: 0,
	key: "",
	value: ""
});

const addHandler = debounce(async () => {
	if (addFormRef.value) {
		formValidator(addFormRef, message, async () => {
			await addItem(message, Service.ClcIndexes.add(addInfo));
			isShowAddModalRef.value = false;
			await query();
		});
	}
});

const editFormRef = ref();

const addFormRef = ref();

const rules = {
	key: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入"
		}
	],
	value: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入"
		}
	]
};

const updateInfo = reactive({
	id: 0,
	key: "",
	value: "",
	revision: 0
});

const isShowEditModalRef = ref(false);

function handleSelect(key) {
	showDropdownRef.value = false;
	// console.log(currentSelectedNodeRef);
	switch (key) {
		case "add-child": {
			resetInfo(addInfo);
			addInfo.parent = currentSelectedRow.id;
			isShowAddModalRef.value = true;
			break;
		}
		case "edit": {
			resetInfo(updateInfo);
			copyMatchingProperties(currentSelectedRow, updateInfo);
			isShowEditModalRef.value = true;
			break;
		}
		case "del": {
			props.showModal("error", "删除二次确认", "是否要删除该分类？", debounce(async () => {
				await removeItem(message, Service.ClcIndexes.remove(currentSelectedRow.id));
				await query(0);
			}));
			break;
		}
	}
}

const currentSelectedRow = reactive({
	id: 0,
	key: "",
	value: "",
	revision: 0
});

function rowProps(row) {
	return {
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

const updateHandler = debounce(() => {
	if (editFormRef.value) {
		formValidator(editFormRef, message, async () => {
			const _subInfo = subMatchingProperties(currentSelectedRow, updateInfo);
			_subInfo.id = currentSelectedRow.id;
			_subInfo.revision = currentSelectedRow.revision;
			await updateItem(message, Service.ClcIndexes.update(_subInfo));
			isShowEditModalRef.value = false;
			await query(0);
		});
	}
});

const loadingQuery = ref(false);

async function query() {
	loadingQuery.value = true;

	await action(message, Service.ClcIndexes.list(), (res) => {
		tableData.value = res;
	});
	loadingQuery.value = false;
}

const queryHandler = debounce(() => {
	query(0);
});

const showAddModalHandler = debounce(() => {
	resetInfo(addInfo);
	addInfo.parent = 0;
	isShowAddModalRef.value = true;
});

onMounted(() => {
	props.updateMenuItem("i-clc-index");
	props.updateBreadcrumbArray(B_CLC_INDEX); // todo 添加面包屑
	query(0);
});

</script>

<template>
	<n-layout-header bordered class="h-3em" position="absolute">
		<n-flex :wrap="false" class="h-3em items-center m-l-1em m-r-1em" justify="center">
			<n-button
				:loading="loadingQuery"
				class="h-2.4em"
				type="info"
				@click.prevent="queryHandler">
				<template #icon>
					<n-icon :component="IReload" />
				</template>
				刷新
			</n-button>
			<!--			<template v-for="(item, index) in pathRef">-->
			<!--				<n-button secondary type="tertiary" @click.prevent="back(item.id, index)">-->
			<!--					{{ item.key }}-->
			<!--				</n-button>-->
			<!--				<span v-if="index < pathRef.length - 1"> > </span>-->
			<!--			</template>-->
			<n-button type="success" @click.prevent="showAddModalHandler">
				<template #icon>
					<n-icon :component="IAdd" />
				</template>
				添加
			</n-button>
		</n-flex>

	</n-layout-header>
	<n-layout
		id="main"
		:native-scrollbar="false"
		class="absolute top-3em bottom-0 left-0 right-0"
		content-style="padding: .3em 1em;"
	>
		<n-flex class="items-center" vertical>
			<n-data-table
				:columns="cols"
				:data="tableData"
				:loading="loadingQuery"
				:row-props="rowProps"
				:single-line="false"
			/>
		</n-flex>
		<!--   返回顶部   -->
		<n-back-top />

	</n-layout>
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
		id="edit-modal"
		v-model:show="isShowEditModalRef"
		:mask-closable="false"
		class="w-25em"
		preset="dialog"
		title="修改"
		transform-origin="center"
		type="warning"
	>
		<n-form ref="editFormRef" :model="updateInfo" :rules="rules">
			<n-form-item label="分类号" path="key">
				<n-input
					v-model:value="updateInfo.key"
					:allow-input="inputValidator.noSideSpace"
					clearable
				/>
			</n-form-item>
			<n-form-item label="分类名" path="value">
				<n-input
					v-model:value="updateInfo.value"
					:allow-input="inputValidator.noSideSpace"
					clearable
				/>
			</n-form-item>
		</n-form>
		<n-flex justify="right">
			<n-button type="warning" @click.prevent="updateHandler">
				提交
			</n-button>
		</n-flex>
	</n-modal>
	<n-modal
		id="add-modal"
		v-model:show="isShowAddModalRef"
		:mask-closable="false"
		class="w-25em"
		preset="dialog"
		title="添加"
		transform-origin="center"
		type="success"
	>
		<n-form ref="addFormRef" :model="addInfo" :rules="rules">
			<n-form-item label="分类号" path="key">
				<n-input
					v-model:value="addInfo.key"
					:allow-input="inputValidator.noSideSpace"
					clearable
				/>
			</n-form-item>
			<n-form-item label="分类名" path="value">
				<n-input
					v-model:value="addInfo.value"
					:allow-input="inputValidator.noSideSpace"
					clearable
				/>
			</n-form-item>
		</n-form>
		<n-flex justify="right">
			<n-button type="success" @click.prevent="addHandler">
				提交
			</n-button>
		</n-flex>
	</n-modal>
</template>

<style scoped>

</style>