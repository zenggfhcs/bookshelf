<script setup>
import { Service } from "@/api/index.js";
import {
	NBackTop,
	NButton,
	NCard,
	NDataTable,
	NLayout,
	NLayoutContent,
	NLayoutSider,
	NPagination,
	NSelect,
	NSpace,
	NTree,
	useMessage
} from "naive-ui";
import { onMounted, ref } from "vue";

const message = useMessage();

const props = defineProps(["updateMenuItem"]);
{
	props.updateMenuItem("j-type-query");
}

const defaultExpandedKeys = ref([]);

const treeDataRef = ref([]);

const tableDataRef = ref([]);

const loading = ref(false);

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
		key: "publishDate"
	},
	{
		title: "索引号",
		key: "callNumber"
	}
];


const pageSizeOptions = [
	{
		value: 20,
		label: "20 / 页"
	},
	{
		value: 50,
		label: "50 / 页"
	},
	{
		value: 100,
		label: "100 / 页"
	}
];

const pageSizeRef = ref(10);

function setItemLabel(item) {
	item.label = `${item.key}  ${item.value}`;
	if (!item.children || !item.children.length) {
		// 清除叶子节点的展开按键
		item.children = null;
		return;
	}
	item?.children?.forEach(setItemLabel);
}

onMounted(() => {
	Service.BookInfos.getFirstLevelType()
		.then((res) => {
			res?.forEach((item) => {
				setItemLabel(item);
			});
			treeDataRef.value = res;
		})
		.catch((err) => {
			console.log(err);
		});
});

function nodeProps({ option }) {
	return {
		onClick() {
			// todo 查询对应分类书籍
			message.info("[Click] " + option.label);
		}
	};
}
</script>

<template>
	<n-card>
		<n-layout has-sider>
			<n-layout-sider class="m-r-4" collapse-mode="width" width="500">
				<n-card class="h-100%" title="中图法分类（点击类别查看）">
					<n-tree
						:data="treeDataRef"
						:default-expanded-keys="defaultExpandedKeys"
						:node-props="nodeProps"
						accordion
						selectable
						show-line
					/>
				</n-card>
			</n-layout-sider>
			<n-card>
				<n-space v-if="tableDataRef.length" vertical>
					<n-space>
						<n-pagination v-model:page="tableDataRef.length" :page-count="100" simple />
						<n-select v-model:value="pageSizeRef" :options="pageSizeOptions" class="w-7em" size="small" />
						<n-button class="ml-2" size="small" type="primary">排序</n-button>
					</n-space>
					<n-layout-content>
						<n-data-table
							:columns="cols"
							:data="tableDataRef"
							:loading="loading"
							:show-header="false"
							:single-line="false"
							bordered
							remote />
					</n-layout-content>
					<n-space reverse>
						<n-pagination v-model:page="tableDataRef.length" :page-count="100" simple />
						<n-select v-model:value="pageSizeRef" :options="pageSizeOptions" class="w-7em" size="small" />
					</n-space>
				</n-space>
			</n-card>
		</n-layout>
	</n-card>
	<n-back-top :right="100" />
</template>

<style scoped></style>
