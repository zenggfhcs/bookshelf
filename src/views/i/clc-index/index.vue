<script setup>

import { action, addItem, removeItem, updateItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import IReload from "@/icons/i-reload.vue";
import { debounce } from "@/utils/debounce.js";
import { copyMatchingProperties, subMatchingProperties } from "@/utils/index.js";
import { formValidator, inputValidator } from "@/utils/validator.js";
import {
	NBackTop,
	NButton,
	NDropdown,
	NFlex,
	NForm,
	NFormItem,
	NIcon,
	NInput,
	NLayout,
	NLayoutHeader,
	NModal,
	NTree,
	useMessage
} from "naive-ui";
import { computed, h, nextTick, onMounted, reactive, ref } from "vue";

const props = defineProps({
	showModal: Function,
	updateBreadcrumbArray: Function,
	updateMenuItem: Function
});

const defaultExpandedKeys = ref([]);

const message = useMessage();

const showDropdownRef = ref(false);

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

const showAddModal = ref(false);

const addInfo = reactive({
	parent: computed(() => lastParent.id),
	key: "",
	value: ""
});

const addHandler = debounce(async () => {
	if (addFormRef.value) {
		formValidator(addFormRef, message, async () => {
			await addItem(message, Service.ClcIndexes.add(addInfo));
			showAddModal.value = false;
			query(lastParent.id);
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

function edit() {

}

const showEditModal = ref(false);

function handleSelect(key) {
	showDropdownRef.value = false;
	// console.log(currentSelectedNodeRef);
	switch (key) {
		case "edit": {
			copyMatchingProperties(currentSelectedNode, updateInfo);
			showEditModal.value = true;
			break;
		}
		case "del": {
			props.showModal("error", "删除二次确认", "是否要删除该分类？", debounce(async () => {
				await removeItem(message, Service.ClcIndexes.remove(currentSelectedNode.id));
				query(lastParent.id);
			}));
			break;
		}
	}
}

const currentSelectedNode = reactive({
	id: 0,
	key: "",
	value: "",
	revision: 0
});

function nodeProps({ option }) {
	return {
		onClick() {
			// message.warning(JSON.stringify(option));
			const _option = {
				id: option.id,
				key: option.key
			};
			copyMatchingProperties(_option, lastParent);
			pathRef.value.push(_option);
			query(option.id);
		},
		onContextmenu: (e) => {
			e.preventDefault();
			copyMatchingProperties(option, currentSelectedNode);
			showDropdownRef.value = false;
			nextTick().then(() => {
				showDropdownRef.value = true;
				xRef.value = e.clientX;
				yRef.value = e.clientY;
			});
		}
	};
}

function setItemLabel(item) {
	item.label = `${item.key}  ${item.value}`;
}

const treeDataRef = ref([]);

const pathRef = ref([{
	id: 0,
	key: "全部"
}]);

const lastParent = reactive({
	id: 0,
	key: "全部"
});

function back(parent, index) {
	if (index === pathRef.value.length - 1) {
		return;
	}
	copyMatchingProperties(pathRef.value[index], lastParent);
	pathRef.value.length = index + 1;
	query(parent);
}

const updateHandler = debounce(() => {
	if (editFormRef.value) {
		formValidator(editFormRef, message, async () => {
			const _subInfo = subMatchingProperties(currentSelectedNode, updateInfo);
			_subInfo.id = currentSelectedNode.id;
			_subInfo.revision = currentSelectedNode.revision;
			await updateItem(message, Service.ClcIndexes.update(_subInfo));
			showEditModal.value = false;
			query(lastParent.id);
		});
	}
});

const loadingQuery = ref(false);

function query(parent) {
	loadingQuery.value = true;
	action(message, Service.ClcIndexes.getByParent(parent), (res) => {
		res?.forEach((item) => {
			setItemLabel(item);
		});
		treeDataRef.value = [...res];
	});
	loadingQuery.value = false;
}

const queryHandler = debounce(() => {
	query(lastParent.id);
});

onMounted(() => {
	props.updateMenuItem("i-clc-index");
	props.updateBreadcrumbArray(); // todo 添加面包屑
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
			<template v-for="(item, index) in pathRef">
				<n-button secondary type="tertiary" @click.prevent="back(item.id, index)">
					{{ item.key }}
				</n-button>
				<span v-if="index < pathRef.length - 1"> > </span>
			</template>
			<n-button type="success" @click.prevent="showAddModal = true;">添加</n-button>
		</n-flex>

	</n-layout-header>
	<n-layout
		id="main"
		:native-scrollbar="false"
		class="absolute top-3em bottom-0 left-0 right-0"
		content-style="padding: .3em 1em;"
	>
		<n-flex class="items-center" vertical>
			<n-tree
				v-if="treeDataRef.length"
				:data="treeDataRef"
				:default-expanded-keys="defaultExpandedKeys"
				:node-props="nodeProps"
				accordion
				selectable
				show-line
			/>
			<!--			<template v-for="(item, index) in treeDataRef" :key="index">-->
			<!--				<n-button class="max-w-max min-w-30em">{{`${item.key} ${item.value}`}}</n-button>-->
			<!--			</template>-->
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
		v-model:show="showEditModal"
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
		v-model:show="showAddModal"
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