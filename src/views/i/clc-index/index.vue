<script setup>

import { action } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { NBackTop, NButton, NDropdown, NFlex, NLayout, NLayoutHeader, NTree, useMessage } from "naive-ui";
import { h, nextTick, onMounted, ref } from "vue";

const defaultExpandedKeys = ref([]);

const message = useMessage();

const showDropdownRef = ref(false);

const xRef = ref(0);

const yRef = ref(0);

const options = [
	{
		label: () => h("span", { style: { color: "yellow" } }, "编辑"),
		key: "edit"
	},
	{
		label: () => h("span", { style: { color: "green" } }, "添加子项"),
		key: "add"
	},
	{
		label: () => h("span", { style: { color: "red" } }, "删除"),
		key: "delete"
	}
];

function handleSelect() {
	showDropdownRef.value = false;
}

function nodeProps({ option }) {
	return {
		onClick() {
			// message.warning(JSON.stringify(option));
			pathRef.value.push({
				label: option.value,
				value: option.id
			});
			query(option.id);
		},
		onContextmenu: (e) => {
			e.preventDefault();
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
	item.value = `${item.key}`;
	// if (!item.children || !item.children.length) {
	// 	// 清除叶子节点的展开按键
	// 	item.children = null;
	// 	return;
	// }
	// item?.children?.forEach(setItemLabel);
}

const treeDataRef = ref([]);

const parentRef = ref(0);

const pathRef = ref([{
	label: "all",
	value: 0
}]);

function back(parent, index) {
	if (index === pathRef.value.length - 1) {
		return;
	}
	pathRef.value.length = index + 1;
	query(parent);
}

function query(parent) {
	action(message, Service.ClcIndexes.getByParent(parent), (res) => {
		res?.forEach((item) => {
			setItemLabel(item);
		});
		treeDataRef.value = [...res];
	});
}

onMounted(() => {
	query(0);
});

</script>

<template>
	<n-dropdown
		:on-clickoutside="handleSelect"
		:options="options"
		:show="showDropdownRef"
		:x="xRef"
		:y="yRef"
		placement="bottom-start"
		trigger="manual"
		@select="handleSelect"
	/>
	<n-layout-header bordered class="h-3em" position="absolute">
		<n-flex class="h-3em items-center m-l-1em m-r-1em" justify="center">
			<template v-for="(item, index) in pathRef">
				<n-button @click.prevent="back(item.value, index)">
					{{ item.label }}
				</n-button>
				<span v-if="index < pathRef.length - 1"> > </span>
			</template>
		</n-flex>
	</n-layout-header>

	<n-layout
		id="main"
		:native-scrollbar="false"
		class="absolute top-3em bottom-2.4em left-0 right-0"
		content-style="padding: .3em 1em;"
	>
		<n-tree
			v-if="treeDataRef.length"
			:data="treeDataRef"
			:default-expanded-keys="defaultExpandedKeys"
			:node-props="nodeProps"
			accordion
			selectable
			show-line
		/>
		<n-button dashed type="info">添加</n-button>
		<!--   返回顶部   -->
		<n-back-top />
	</n-layout>
</template>

<style scoped>

</style>