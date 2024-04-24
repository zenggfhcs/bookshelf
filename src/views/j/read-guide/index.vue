<script setup>
import PaneBookRankingList from "@/views/j/read-guide/pane-book-rankings.vue";
import PaneCollectInfo from "@/views/j/read-guide/pane-collect-info.vue";
import PaneReaderRankingList from "@/views/j/read-guide/pane-reader-rankings.vue";
import { NTabPane, NTabs } from "naive-ui";
import { onBeforeMount, ref } from "vue";

const props = defineProps({
	keyword: String,
	updateMenuItem: Function,
	tab: String
});

function getTabName() {
	switch (props.tab) {
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
		default: {
			return "quick-query";
		}
	}
}

const typeRef = ref(props.tab ? getTabName() : "quick-query");

onBeforeMount(() => {
	props.updateMenuItem("j-read-guide");
});
</script>

<template>
	<n-tabs animated placement="left" type="line">
		<n-tab-pane name="book-ranking-list" tab="书籍借阅排行榜">
			<PaneBookRankingList />
		</n-tab-pane>
		<n-tab-pane name="reader-ranking-list" tab="读者借阅排行榜">
			<PaneReaderRankingList />
		</n-tab-pane>
		<n-tab-pane name="collect-info" tab="馆藏信息">
			<PaneCollectInfo />
		</n-tab-pane>
	</n-tabs>
</template>

<style scoped>

</style>