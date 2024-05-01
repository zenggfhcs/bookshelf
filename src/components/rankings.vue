<script setup>
import IFirstPlace from "@/icons/i-first-place.vue";
import ISecondPlace from "@/icons/i-second-place.vue";
import IThirdPlace from "@/icons/i-third-place.vue";
import { NDataTable, NDivider } from "naive-ui";
import { h } from "vue";

const props = defineProps({
	cols: Array,
	data: Array
});

function renderByRanking(ranking) {
	let targetIcon = null;
	switch (ranking) {
		case 1: {
			targetIcon = IFirstPlace;
			break;
		}
		case 2: {
			targetIcon = ISecondPlace;
			break;
		}
		case 3: {
			targetIcon = IThirdPlace;
		}
	}

	return h(targetIcon,
		{
			style: {
				width: "30px",
				height: "30px"
			}
		},
		null);
}

const cols = [
	{
		title: "排名",
		key: "ranking",
		width: 80,
		render: (row) => {
			const ranking = row.ranking + 1;
			if (ranking >= 1 && ranking <= 3) {
				return renderByRanking(ranking);
			}
			return h("span",
				{
					style: {
						paddingLeft: "3.65px"
					}
				},
				{ default: () => ranking });
		}
	},
	...props.cols
];

</script>

<template>
	<n-divider title-placement="center">
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