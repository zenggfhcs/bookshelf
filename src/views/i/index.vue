<script setup>
import { Service } from "@/api/index.js";
import { B_I } from "@/constant/breadcrumb.js";
import router from "@/router/index.js";
import { DEBIT_CHECK } from "@/router/route-value.js";
import { NCard, NGi, NGrid, NLayout, NNumberAnimation, NTag } from "naive-ui";
import { h, onMounted, reactive, ref } from "vue";

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
		render: (row) =>
			h(
				NTag,
				{
					type: "info",
					bordered: false
				},
				{
					default: () => row?.id
				}
			)
	}
];

const tableData = ref([]);

function rowProps(row) {
	return {
		onDblclick: (e) => {
			e.preventDefault();
			router.push({
				name: DEBIT_CHECK.name,
				params: {
					id: row?.id
				}
			});
		}
	};
}

const todayDebitCount = reactive({
	from: 0,
	to: 0
});

const todayRestoreCount = reactive({
	from: 0,
	to: 0
});

const todayActiveUserCount = reactive({
	from: 0,
	to: 0
});

const todayNewUserCount = reactive({
	from: 0,
	to: 0
});

onMounted(async () => {
	props.updateMenuItem("i-index");
	props.updateBreadcrumbArray(B_I);

	Service.Debits.getTodayDebitCount().then(res => {
		todayDebitCount.to = +res;
	});

	Service.Debits.getTodayRestoreCount().then(res => {
		todayRestoreCount.to = +res;
	});


	Service.Users.todayActiveUserCount().then(res => {
		todayActiveUserCount.to = +res;
	});

	Service.Users.todayNewUserCount().then(res => {
		todayNewUserCount.to = +res;
	});
});
</script>

<template>
	<n-layout
		:native-scrollbar="false"
		content-class="p-1em"
		position="absolute">
		<n-grid :cols="4" :x-gap="14" :y-gap="14">
			<n-gi>
				<n-card title="今日借阅">
					<n-number-animation
						ref="numberAnimationInstRef"
						:from="todayDebitCount.from"
						:to="todayDebitCount.to"
					/>
				</n-card>
			</n-gi>
			<n-gi>
				<n-card title="今日归还">
					<n-number-animation
						ref="numberAnimationInstRef"
						:from="todayRestoreCount.from"
						:to="todayRestoreCount.to"
					/>
				</n-card>
			</n-gi>
			<n-gi>
				<n-card title="今日活跃用户">
					<n-number-animation
						ref="numberAnimationInstRef"
						:from="todayActiveUserCount.from"
						:to="todayActiveUserCount.to"
					/>
				</n-card>
			</n-gi>
			<n-gi>
				<n-card title="今日新增用户">
					<n-number-animation
						ref="numberAnimationInstRef"
						:from="todayNewUserCount.from"
						:to="todayNewUserCount.to"
					/>
				</n-card>
			</n-gi>
		</n-grid>
	</n-layout>
</template>

<style scoped></style>
