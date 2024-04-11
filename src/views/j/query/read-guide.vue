<script setup>
import RankingList from "@/components/ranking-list.vue";
import IReload from "@/icons/i-reload.vue";
import Search from "@/icons/search.vue";
import { dateDisabled } from "@/utils/disabled.js";
import { NButton, NDatePicker, NFlex, NInputGroup, NInputGroupLabel, NSelect, NSpace } from "naive-ui";
import { onMounted, reactive, ref } from "vue";

const props = defineProps(["updateMenuItem"]);

const contentOptions = [
	{
		label: "图书排行",
		value: "book"
	},
	{
		label: "读者排行",
		value: "reader"
	}
];

const typeOptionsRef = ref([]);

const sizeOptions = [
	{
		label: "20",
		value: "20"
	},
	{
		label: "50",
		value: "50"
	},
	{
		label: "100",
		value: "100"
	}
];

const info = reactive({
	content: "book",
	date: Date.parse(new Date().toDateString()),
	type: "",
	size: "20"
});

function reset() {
	info.content = "book";
	info.date = Date.parse(new Date().toDateString());
	info.type = "";
	info.size = "20";
}

onMounted(async () => {
	props.updateMenuItem("j-read-guide");
});
</script>

<template>
	<n-flex class="items-center" justify="center" vertical>
		<n-flex class="w-80em">
			<n-space class="w-80em">
				<n-select
					v-model:value="info.content"
					:options="contentOptions"
					class="w-10em"
				/>
				<n-date-picker
					v-model:value="info.date"
					:is-date-disabled="dateDisabled"
					class="w-8em"
					type="month"
					update-value-on-close
					value-format="yyyy-MM-dd"
				/>
				<n-input-group>
					<n-input-group-label>分类号:</n-input-group-label>
					<n-select
						:options="typeOptionsRef"
						class="min-w-10em"
						clearable
					/>
				</n-input-group>
				<n-input-group>
					<n-input-group-label>前</n-input-group-label>
					<n-select
						v-model:value="info.size"
						:options="sizeOptions"
						class="min-w-5em"
					/>
					<n-input-group-label>名</n-input-group-label>
				</n-input-group>
				<n-button ghost type="primary">
					<template #icon>
						<Search />
					</template>
					查询
				</n-button>
				<n-button ghost type="primary" @click.prevent="reset">
					<template #icon>
						<IReload />
					</template>
					重置
				</n-button>
			</n-space>
			<RankingList />
		</n-flex>
	</n-flex>
</template>

<style scoped>

</style>