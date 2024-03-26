<script setup>
import {B_I} from "@/constant/breadcrumb.js";
import router from "@/router/Router.js";
import {DEBIT_CHECK} from "@/router/RouterValue.js";
import {renderCell} from "@/utils/render.js";
import {NCard, NDataTable, NGi, NGrid, NLayout, NTag} from "naive-ui";
import {h} from "vue";

const props = defineProps(["updateMenuItem", "updateBreadcrumbArray"]);

const cols = [
	{
		title: "id",
		key: "id",
		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		width: 100,
		minWidth: 50,
		render: (row) => h(
			NTag,
			{
				type: "info",
				bordered: false,
			},
			{
				default: () => row?.id
			}
		),
	},
];

const tableData = Array.from({length: 100}).map((_, index) => {
	return {
		id: index
	}
});

const rowProps = row => {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			router.push({
				name: DEBIT_CHECK.name,
				params: {
					id: row?.id,
				}
			});
		}
	}
}

//#region 生命周期钩子
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
{
	props.updateMenuItem("i-index");
	props.updateBreadcrumbArray(B_I);
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion
</script>

<template>
	<n-layout :native-scrollbar="false" content-class="p-.875em">
		<n-grid :cols="4" :x-gap="14" :y-gap="14">
			<n-gi>
				<n-card title="今日借阅">
					第1个card
				</n-card>
			</n-gi>
			<n-gi>
				<n-card title="今日归还">
					第2个card
				</n-card>
			</n-gi>
			<n-gi>
				<n-card title="今日活跃用户">
					第3个card
				</n-card>
			</n-gi>
			<n-gi>
				<n-card title="今日归还">
					第4个card
				</n-card>
			</n-gi>
			<n-gi :span="4">
				<n-card title="逾期未还">
					<n-data-table
						:columns="cols"
						:data="tableData"
						:max-height="300"
						:render-cell="renderCell"
						:row-props="rowProps"
						:single-line="false" striped
					/>
				</n-card>
			</n-gi>
		</n-grid>

	</n-layout>
</template>

<style scoped>

</style>