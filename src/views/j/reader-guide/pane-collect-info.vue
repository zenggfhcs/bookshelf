<template>
	<v-chart :option="option" autoresize class="absolute right-0 left-0" />
</template>

<script setup>
import { action } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { PieChart } from "echarts/charts";
import { LegendComponent, TitleComponent, TooltipComponent } from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { useMessage } from "naive-ui";
import { computed, inject, onMounted, provide, ref } from "vue";
import VChart, { THEME_KEY } from "vue-echarts";

const message = useMessage();

use([
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	PieChart,
	CanvasRenderer
]);

const theme = inject("theme");

const themeValue = computed(() => theme && theme.value ? 'dark' : null);

provide(THEME_KEY, themeValue);

const option = ref({
	title: {
		text: "馆藏",
		left: "center"
	},
	tooltip: {
		trigger: "item",
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	legend: {
		orient: "vertical",
		left: "left",
		data: []
	},
	series: [
		{
			name: "",
			type: "pie",
			radius: [50, 250],
			center: ["50%", "50%"],
			roseType: "area",
			itemStyle: {
				borderRadius: 8
			},
			data: [],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: "rgba(0, 0, 0, 0.5)"
				}
			}
		}
	]
});

onMounted(() => {
	action(message, Service.Books.collectionInfo(), (res) => {
		option.value.series[0].data = res?.map(item => {
			return {
				value: item?.collectCount,
				name: `${item?.collectType} ${item?.typeName}`
			};
		});

		option.value.legend.data = res?.map(item => {
			return `${item?.collectType} ${item?.typeName}`;
		});
	})
});
</script>

<style scoped>
</style>
