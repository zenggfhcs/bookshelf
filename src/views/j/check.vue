<script setup>
import BookListItem from "@/components/book-list-item.vue";
import SearchGroup from "@/components/search-group.vue";
import BookShelf from "@/icons/book-shelf.vue";
import {
	NBackTop,
	NCard,
	NCheckbox,
	NCollapse,
	NCollapseItem,
	NDataTable,
	NFlex,
	NGi,
	NGrid,
	NLayout,
	NLayoutContent,
	NLayoutSider,
	NSpace,
	NText,
} from "naive-ui";
import {h, onMounted, ref} from "vue";

const props = defineProps(['updateMenuItem']);
{
	props.updateMenuItem('j-check');
}

const modelArrayRef = ref([]);

const loading = ref(false);

const cols = [
	{
		title: () => h(
			SearchGroup,
			{},
			{default: () => null}
		),
		key: "id",
		render: (row) => h(
			BookListItem,
			{},
			{default: () => row?.id}
		)
	}
]

onMounted(() => {
	loading.value = true;
	modelArrayRef.value = Array.from({length: 13}).map(i => ({
		id: i
	}));
	loading.value = false;
})

const containerRef = ref();
</script>

<template>
	<n-flex class="items-center" justify="center" vertical>
		<n-flex class="w-80em min-w-80em">
			<n-layout has-sider>
				<n-layout-sider
					:show-collapsed-content="false"
					show-trigger="bar"
					:collapsed-width="16"
					class="m-r-4"
					:width="240">
					<n-card :bordered="false">
						<n-flex class="items-center flex-nowrap w-190px" vertical>
							<BookShelf class="w-8em h-8em"/>
							<n-space class="w-100%" vertical>
								<n-card title="数据类型">
									<n-flex style="flex-wrap: nowrap">
										<n-checkbox/>
										<n-grid class="flex-auto" cols="2">
											<n-gi>
												<n-text>图书</n-text>
											</n-gi>
											<n-gi>
												1234
											</n-gi>
											<n-gi>
												<n-text>CIP</n-text>
											</n-gi>
											<n-gi>
												1234
											</n-gi>
											<n-gi>
												<n-text>馆藏</n-text>
											</n-gi>
											<n-gi>
												1234
											</n-gi>
											<n-gi>
												<n-text>ISBN</n-text>
											</n-gi>
											<n-gi>
												1234
											</n-gi>
										</n-grid>
									</n-flex>
								</n-card>
								<n-card title="类型">
									<n-collapse>
										<n-collapse-item name="1" title="中图分类法">
											<template #header-extra/>
											<template #arrow/>
											<template #header/>
											<template v-for="i in 20">
												<n-flex class="items-center">
													<n-checkbox/>
													abc d
												</n-flex>
											</template>
										</n-collapse-item>
									</n-collapse>
								</n-card>
							</n-space>
						</n-flex>
					</n-card>
				</n-layout-sider>
				<n-layout-content>
					<n-data-table :loading="loading" remote :columns="cols" :data="modelArrayRef" :show-header="false"/>

				</n-layout-content>
			</n-layout>

		</n-flex>
	</n-flex>
	<n-back-top :right="100"/>
</template>

<style scoped>
.n-grid div:nth-child(n * 2) {
	text-align: right;
}
</style>