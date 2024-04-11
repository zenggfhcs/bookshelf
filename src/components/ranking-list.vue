<script setup>
import { NDataTable, NDivider } from "naive-ui";

const props = defineProps([]);

const cols = [
	{
		title: "排名",
		key: "index",
		width: 80
	},
	{
		title: "借阅次数", // 读者姓名
		key: "num",
		width: 100
	},
	{
		title: "书名", // 常读类型
		key: "bookName"
	},
	{
		title: "索书号", // 借书册数
		width: 160,
		key: "callNumber"
	}
];

const data = [
	{
		index: 1,
		num: 100,
		bookName: "123",
		callNumber: "123"
	}
];
</script>

<template>
	<n-divider title-placement="left">
		排行榜
	</n-divider>

	<n-data-table
		:columns="cols"
		:data="data"
		:single-line="false"
	/>
</template>

<style scoped>

</style>