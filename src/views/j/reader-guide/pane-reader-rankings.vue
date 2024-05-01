<script setup>
import { action } from "@/api/action.js";
import { Service } from "@/api/index.js";
import Rankings from "@/components/rankings.vue";
import Search from "@/icons/i-query.vue";
import IReload from "@/icons/i-reload.vue";
import { debounce } from "@/utils/debounce.js";
import { dateDisabled } from "@/utils/disabled.js";
import {
	NButton,
	NCard,
	NDatePicker,
	NFlex,
	NInputGroup,
	NInputGroupLabel,
	NSelect,
	NSpace,
	NSpin,
	useMessage
} from "naive-ui";
import { onBeforeMount, reactive, ref } from "vue";

const message = useMessage();

const info = reactive({
	year: 2024,
	month: 4,
	type: null,
	size: 20
});

const cols = [
	{
		title: "借阅次数",
		key: "count",
		width: 120
	},
	{
		title: "读者",
		key: "target",
		render: (row) => {
			let res = "";
			if (row.target.surname) {
				res += row.target.surname + " ";
			}
			if (row.target.name) {
				res += row.target.name + " ";
			}
			if (row.target.displayName) {
				res += `(${row.target.displayName})`;
			}

			return res;
		}
	}
];

const dateRef = ref(Date.parse(new Date().toDateString()));

const queryHandler = debounce(() => {
	query();
});

function reset() {
	dateRef.value = Date.parse(new Date().toDateString());
	info.type = null;
	info.size = 20;
}

const typeOptionsRef = ref([]);

const sizeOptions = [
	{
		label: "20",
		value: 20
	},
	{
		label: "50",
		value: 50
	},
	{
		label: "100",
		value: 100
	}
];

function preQuery() {
	const date = new Date(dateRef.value);
	info.year = date.getFullYear();
	info.month = date.getMonth() + 1; // 获取到的 month从 0开始，0代表一月，+1进行修正
}

const isQueriedRef = ref(false);

const loadingQuery = ref(false);

async function query() {
	loadingQuery.value = true;

	preQuery();

	await action(message, Service.Debits.readerDebitRankings(info), (res) => {
		rankingsRef.value = res.map((item, index) => {
			item.ranking = index;
			return item;
		});
		if (!isQueriedRef.value) {
			isQueriedRef.value = true;
		}
	});

	loadingQuery.value = false;
}

const rankingsRef = ref([]);

onBeforeMount(() => {
	action(message, Service.ClcIndexes.firstLevel(), (res) => {
		typeOptionsRef.value = res?.map(item => {
			return {
				value: item.key,
				label: `${item.key}  ${item.value}`
			};
		});
	});
});
</script>

<template>
	<n-spin :show="loadingQuery">
		<n-space justify="center">
			<n-date-picker
				v-model:value="dateRef"
				:is-date-disabled="dateDisabled"
				class="w-8em"
				type="month"
				update-value-on-close
				value-format="yyyy-MM-dd"
			/>
			<n-input-group>
				<n-input-group-label>分类号:</n-input-group-label>
				<n-select
					v-model:value="info.type"
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
			<n-button :bordered="false" type="primary" @click.prevent="queryHandler">
				<template #icon>
					<Search />
				</template>
				查询
			</n-button>
			<n-button secondary @click.prevent="reset">
				<template #icon>
					<IReload />
				</template>
				重置
			</n-button>
		</n-space>
		<n-flex class="items-center" justify="center" vertical>
			<n-flex class="w-80em" vertical>
				<div>
					<Rankings v-if="rankingsRef.length" :cols="cols" :data="rankingsRef" />
					<n-card v-else-if="isQueriedRef" class="m-t-1em">无数据</n-card>
				</div>
			</n-flex>
		</n-flex>
	</n-spin>
</template>

<style scoped>

</style>