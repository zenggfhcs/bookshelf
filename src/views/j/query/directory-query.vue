<script setup>
import BookListItem from "@/components/book-list-item.vue";
import SearchGroup from "@/components/search-group.vue";
import {
	NCard,
	NDataTable,
	NFlex,
	NLayout,
	NLayoutContent,
	NLayoutSider,
	NTabPane,
	NTabs,
} from "naive-ui";
import { h, onMounted, ref } from "vue";

const modelArrayRef = ref([]);

const loading = ref(false);

const cols = [
	{
		title: () => h(SearchGroup, {}, { default: () => null }),
		key: "id",
		render: (row) => h(BookListItem, {}, { default: () => row?.id }),
	},
];

onMounted(() => {
	loading.value = true;
	modelArrayRef.value = Array.from({ length: 13 }).map((i) => ({
		id: i,
	}));
	loading.value = false;
});
</script>

<template>
	<n-tabs default-value="oasis" justify-content="space-evenly" type="line">
		<n-tab-pane name="oasis" tab="快速检索">
			<n-flex class="items-center" justify="center" vertical>
				<n-flex class="w-80em min-w-80em">
					<n-layout has-sider>
						<n-layout-sider
							:collapsed-width="16"
							:show-collapsed-content="false"
							:width="240"
							class="m-r-4"
							show-trigger="bar"
						>
							<n-card :bordered="false"> </n-card>
						</n-layout-sider>
						<n-layout-content>
							<n-data-table
								:bordered="false"
								:columns="cols"
								:data="modelArrayRef"
								:loading="loading"
								:show-header="false"
								:single-line="false"
								remote
							/>
						</n-layout-content>
					</n-layout>
				</n-flex>
			</n-flex>
		</n-tab-pane>
		<n-tab-pane name="the beatles" tab="高级检索"> 高级检索 </n-tab-pane>
	</n-tabs>
</template>

<style scoped></style>
