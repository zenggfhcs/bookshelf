<script setup>
import AdvancedQuery from "@/views/j/query/advanced-query.vue";
import QuickQuery from "@/views/j/query/quick-query.vue";
import ReadGuide from "@/views/j/query/read-guide.vue";
import TypeQuery from "@/views/j/query/type-query.vue";
import { NTabPane, NTabs } from "naive-ui";
import { onBeforeMount, ref } from "vue";

const props = defineProps({
	keyword: String,
	updateMenuItem: Function,
	defaultTab: String
});

function getTabName() {
	switch (props.defaultTab) {
		case "quick" : {
			return "quick-query";
		}
		case "advanced" : {
			return "advanced-query";
		}
		case "type" : {
			return "type-query";
		}
		case "guide" : {
			return "read-guide";
		}
	}
}

const typeRef = ref(props.defaultTab ? getTabName() : "quick-query");

onBeforeMount(() => {
	props.updateMenuItem("j-query");
});
</script>

<template>
	<n-tabs :default-value="typeRef" animated placement="left" type="line">
		<n-tab-pane name="quick-query" tab="快速检索">
			<QuickQuery :keyword="props.keyword" />
		</n-tab-pane>
		<n-tab-pane name="advanced-query" tab="高级检索">
			<AdvancedQuery />
		</n-tab-pane>
		<n-tab-pane name="type-query" tab="分类检索">
			<TypeQuery />
		</n-tab-pane>
		<n-tab-pane name="read-guide" tab="读者指引">
			<ReadGuide />
		</n-tab-pane>
	</n-tabs>
</template>

<style scoped>

</style>