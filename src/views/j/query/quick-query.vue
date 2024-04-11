<script setup>

import Search from "@/icons/search.vue";
import keywordStore from "@/store/keywordStore.js";
import QueryResult from "@/views/j/query/query-result.vue";
import { NButton, NFlex, NInput, NInputGroup, NSelect } from "naive-ui";
import { onMounted, onUnmounted, reactive, ref } from "vue";

const props = defineProps(["updateMenuItem"]);

const queryKeywordStore = keywordStore();

const queryKeyword = ref(queryKeywordStore.key);

const _entity = reactive({});

const queryContentTypeOptions = [
	{
		label: "任意内容",
		value: ""
	},
	{
		label: "ISBN",
		value: "isbn"
	},
	{
		label: "CIP",
		value: "cip"
	},
	{
		label: "书名（前缀）",
		value: "bookName"
	}

];

const queryContentTypeRef = ref("");


onMounted(() => {
	props.updateMenuItem("j-quick-query");
	console.log(queryKeyword);
});

onUnmounted(() => {
	queryKeywordStore.key = "";
});
</script>

<template>
	<n-flex class="items-center" justify="center" vertical>
		<n-flex class="w-80em" vertical>
			<n-input-group>
				<n-select
					v-model:value="queryContentTypeRef"
					:options="queryContentTypeOptions"
					class="w-12em"
				/>
				<n-input v-model:value="queryKeyword" placeholder="请输入关键字" />
				<n-button type="primary">
					<template #icon>
						<Search />
					</template>
				</n-button>
			</n-input-group>
			<QueryResult />
		</n-flex>
	</n-flex>
</template>

<style scoped>

</style>