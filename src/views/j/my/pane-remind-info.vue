<script setup>

import { queryList } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { NDataTable, NDivider, useMessage } from "naive-ui";
import { onMounted, reactive, ref } from "vue";

const message = useMessage();

const cols = [
	{
		title: "题名",
		key: "book.bookInfo.bookName"
	},
	{
		title: "借期",
		key: "creationTime",
		render: (row) => {
			return row.creationTime;
		}
	},

	{
		title: "还期",
		key: "returnDeadline"
	}
];

const tableDataRef = ref([]);

const itemCountRef = ref(0);

const loadingQuery = ref(false);

const payloadReactive = reactive({
	entity: {},
	filter: {
		page: {
			start: 0,
			end: 10
		}
	}
});

onMounted(async () => {
	await queryList(
		message,
		Service.Debits.remindedList(payloadReactive),
		itemCountRef,
		tableDataRef
	);
});
</script>

<template>
	<span class="font-bold font-size-1.2em text-center"> 催还图书信息 </span>
	<n-divider />
	<n-data-table :columns="cols" :data="tableDataRef" :loading="loadingQuery" />
	<n-divider />
</template>

<style scoped>

</style>