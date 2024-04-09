<script setup>
import DirectoryQuery from "@/views/j/query/directory-query.vue";
import { NBackTop, NTabPane, NTabs } from "naive-ui";

const props = defineProps(["updateMenuItem"]);
{
	props.updateMenuItem("j-check");
}
</script>

<template>
	<n-tabs default-value="oasis" justify-content="space-evenly" type="line">
		<n-tab-pane name="oasis" tab="目录检索">
			<DirectoryQuery />
		</n-tab-pane>
		<n-tab-pane name="the beatles" tab="类型检索"> 类型检索 </n-tab-pane>
		<n-tab-pane name="jay chou" tab="读书指引"> 读书指引 </n-tab-pane>
	</n-tabs>
	<n-back-top :right="100" />
</template>

<style scoped>
.n-grid div:nth-child(2n) {
	text-align: right;
}
</style>
