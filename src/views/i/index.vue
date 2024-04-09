<script setup>
import { B_I } from "@/constant/breadcrumb.js";
import router from "@/router/index.js";
import { DEBIT_CHECK } from "@/router/RouterValue.js";
import { renderCell } from "@/utils/render.js";
import {
	NCard,
	NDataTable,
	NGi,
	NGrid,
	NLayout,
	NNumberAnimation,
	NTag,
} from "naive-ui";
import { h, onMounted, ref } from "vue";

const props = defineProps(["updateMenuItem", "updateBreadcrumbArray"]);

const cols = [
	{
		title: "id",
		key: "id",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true,
		},
		width: 100,
		minWidth: 50,
		render: (row) =>
			h(
				NTag,
				{
					type: "info",
					bordered: false,
				},
				{
					default: () => row?.id,
				},
			),
	},
];

const tableData = ref([]);

async function init() {
	const _array = Array.from({ length: 100 }).map((_, index) => {
		return {
			id: index,
		};
	});
	return new Promise((resolve) => {
		resolve({
			list: _array,
		});
	});
}

function rowProps(row) {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			router.push({
				name: DEBIT_CHECK.name,
				params: {
					id: row?.id,
				},
			});
		},
	};
}
onMounted(async () => {
	init().then((res) => {
		tableData.value = res.list;
	});
});
{
	props.updateMenuItem("i-index");
	props.updateBreadcrumbArray(B_I);
}
</script>

<template>
	<n-layout
		:native-scrollbar="false"
		content-class="p-1em"
		position="absolute"
	>
		<n-grid :cols="4" :x-gap="14" :y-gap="14">
			<n-gi>
				<n-card title="借阅">
					<n-number-animation
						ref="numberAnimationInstRef"
						:from="0"
						:to="12039"
					/>
				</n-card>
			</n-gi>
			<n-gi>
				<n-card title="今日归还"> 第2个card</n-card>
			</n-gi>
			<n-gi>
				<n-card title="今日活跃用户"> 第3个card</n-card>
			</n-gi>
			<n-gi>
				<n-card title="今日归还"> 第4个card</n-card>
			</n-gi>
			<n-gi :span="2">
				<n-card title="逾期未还">
					<n-data-table
						:columns="cols"
						:data="tableData"
						:max-height="300"
						:render-cell="renderCell"
						:row-props="rowProps"
						:single-line="false"
						striped
					/>
				</n-card>
			</n-gi>
			<n-gi :span="4">
				<n-card title="馆藏全览">
					<n-data-table
						:columns="cols"
						:data="tableData"
						:max-height="300"
						:render-cell="renderCell"
						:row-props="rowProps"
						:single-line="false"
						striped
					/>
				</n-card>
			</n-gi>
			<n-gi :span="2">
				<n-card title="借阅数排行榜">
					<n-data-table
						:columns="cols"
						:data="tableData"
						:max-height="300"
						:render-cell="renderCell"
						:row-props="rowProps"
						:single-line="false"
						striped
					/>
				</n-card>
			</n-gi>
			<n-gi :span="2">
				<n-card title="借阅天数排行榜">
					<n-data-table
						:columns="cols"
						:data="tableData"
						:max-height="300"
						:render-cell="renderCell"
						:row-props="rowProps"
						:single-line="false"
						striped
					/>
				</n-card>
			</n-gi>
		</n-grid>
	</n-layout>
</template>

<style scoped></style>
