<script setup>

import { action } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { messageOptions } from "@/constant/options.js";
import { formatTime } from "@/utils/format.js";
import { NButton, NDataTable, NDivider, useMessage } from "naive-ui";
import { h, onMounted, ref } from "vue";

const message = useMessage();

const loadingReturnRef = ref(false);

const cols = [
	{
		title: "题名",
		key: "book.bookInfo.bookName",
		render: (row) => {
			return `${row.book.bookInfo.bookName} | ${row.book.bookInfo.author}`;
		}
	},
	{
		title: "借期",
		key: "creationTime",
		render: (row) => {
			return formatTime(row.creationTime);
		}
	},
	{
		title: "还期",
		key: "returnDeadline"
	},
	{
		title: "状态",
		key: "returnDeadline",
		render: (row) => {
			if (new Date(row.returnDeadline) < new Date()) {
				return "已逾期";
			}
			return "借阅中";
		}
	},
	/*{
		title: "操作",
		key: "action",
		render: (row) => {
			return h(
				NButton,
				{
					loading: loadingReturnRef.value,
					bordered: false,
					type: "warning",
					onClick: async () => {
						loadingReturnRef.value = true;

						action(message, Service.Debits.restore(row), () => {
							message.success("归还成功", messageOptions);
							query();
						});

						loadingReturnRef.value = false;
					}
				},
				{ default: () => "归还" }
			);
		}
	}*/
];

const tableDataRef = ref([]);

const loadingQuery = ref(false);

function query() {
	action(message, Service.Debits.currentDebits(), (res) => {
		tableDataRef.value = [...res];
	});
}

onMounted(() => {
	query();
});
</script>

<template>
	<span class="font-bold font-size-1.2em text-center"> 当前借阅情况 </span>
	<n-divider />
	<n-data-table :columns="cols" :data="tableDataRef" :loading="loadingQuery" />
	<n-divider />
</template>

<style scoped>

</style>