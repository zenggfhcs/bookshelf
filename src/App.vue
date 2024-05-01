<script setup>
import { Service } from "@/api/index.js";
import {
	darkTheme,
	dateZhCN,
	NConfigProvider,
	NDialogProvider,
	NMessageProvider,
	NModalProvider,
	NWatermark,
	useOsTheme,
	zhCN
} from "naive-ui";
import { onBeforeMount, onMounted, ref, provide } from "vue";


const watermarkRef = ref("大家艰苦一下，牛奶和面包都会有的");

const osTheme = useOsTheme();

const theme = ref(osTheme.value === "dark" ? darkTheme : null);

function switchTheme() {
	if (theme.value) {
		theme.value = null;
		return;
	}
	theme.value = darkTheme;
}

onBeforeMount(() => {
	provide("theme", theme);
});

onMounted(() => {
	Service.Users.tokenUser()
		.then(res => {
			watermarkRef.value = `${res?.surname}${res?.name}@${res?.phoneNumber}`;
		});
});
</script>

<template>
	<n-config-provider
		:date-locale="dateZhCN"
		:locale="zhCN" :theme="theme">
		<n-modal-provider>
			<n-dialog-provider>
				<n-message-provider>
					<RouterView v-slot="{ Component }">
						<component :is="Component" :switch-theme="switchTheme" />
					</RouterView>
				</n-message-provider>
			</n-dialog-provider>
		</n-modal-provider>
	</n-config-provider>
	<n-watermark
		:content="watermarkRef"
		:font-size="16"
		:height="384"
		:line-height="16"
		:rotate="-15"
		:width="384"
		:x-offset="12"
		:y-offset="70"
		cross
		fullscreen
	/>
</template>

<style>
a {
	color: var(--n-text-color);
}
</style>
