<script setup>
import { action, addItem, updateItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { debounce } from "@/utils/debounce.js";
import { subMatchingProperties } from "@/utils/index.js";
import { inputValidator } from "@/utils/validator.js";
import {
	NButton,
	NCollapseItem,
	NDataTable,
	NFlex,
	NForm,
	NFormItem,
	NInput,
	NModal,
	NSpace,
	useMessage
} from "naive-ui";
import { onMounted, reactive, ref } from "vue";

const props = defineProps({
	group: String,
	title: String,
	showModal: Function
});

const message = useMessage();


const isShowAddModalRef = ref(false);

const isShowUpdateModalRef = ref(false);

const rules = {
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
	toName: {
		required: true,
		message: "请输入",
		trigger: ["input", "blur"]
	},
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
	key: null,
	label: null,
	toName: null,
	iconName: null,
	revision: 0
});

const currentRow = reactive({
	id: null,
	parentId: null,
	group: null,
	key: null,
	label: null,
	toName: null,
	iconName: null,
	revision: 0
});

const updateInfo = reactive({
	id: null,
	parentId: null,
	group: null,
	key: null,
	label: null,
	toName: null,
	iconName: null,
	revision: 0
});

function remove() {

}

function resetInfo(info) {
	for (const key in info) {
		info[key] = null;
	}
}

const showAddChildrenModalHandler = debounce(([id, group]) => {
	resetInfo(addInfo);
	addInfo.parentId = id;
	addInfo.group = group;
	isShowAddModalRef.value = true;
});

const showAddModalHandler = debounce((group) => {
	resetInfo(addInfo);
	addInfo.group = group;
	isShowAddModalRef.value = true;
});

const addHandler = debounce(async () => {
	await addItem(message, Service.Routes.add(addInfo));
	isShowAddModalRef.value = false;
	query();
});

const updateHandler = debounce(async () => {
	const _subInfo = subMatchingProperties(currentRow, updateInfo);
	_subInfo.id = currentRow.id;
	_subInfo.revision = currentRow.revision;
	console.log(currentRow);
	await updateItem(message, Service.Routes.update(_subInfo));
	isShowUpdateModalRef.value = false;
	query();
});

function query() {
	action(message, Service.Routes.getByGroup(props.group), (res) => {
		tableDateReaderMenuRef.value = res;
	});
}

const queryHandler = debounce(() => {
	query();
});

const tableDateReaderMenuRef = ref([]);

onMounted(() => {
	query();
});
</script>

<template>
	<n-collapse-item :name="props.group" :title="props.title">
		<template #header-extra>
			<n-space>
				<n-button :bordered tertiary type="info" @click.prevent="queryHandler">刷新</n-button>
				<n-button :bordered type="success" @click.prevent="showAddModalHandler(props.group)">添加</n-button>
			</n-space>
		</template>
		<n-data-table :columns="cols" :data="tableDateReaderMenuRef" />
	</n-collapse-item>
	<n-modal
		id="add-modal"
		v-model:show="isShowAddModalRef"
		:mask-closable="false"
		class="w-25em"
		preset="dialog"
		title="添加"
		transform-origin="center">
		<n-form :model="addInfo" :rules="rules">
			<n-space v-if="addInfo.group || addInfo.parentId" class="m-t-.3em m-b-.3em" label="">
				<div v-if="addInfo.group">组：{{ addInfo.group }}</div>
				<div v-if="addInfo.parentId">父组：{{ addInfo.parentId }}</div>
			</n-space>
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