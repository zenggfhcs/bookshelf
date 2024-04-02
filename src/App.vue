<script setup>
import {ThEME} from "@/storage/key.js";
import {local} from "@/storage/local.js";
import {
	darkTheme,
	dateZhCN,
	NConfigProvider,
	NDialogProvider,
	NMessageProvider,
	NModalProvider,
	NWatermark,
	zhCN
} from "naive-ui";
import {onBeforeMount, ref} from "vue";

// 是暗色主题
const isDark = ref(false);
{
	let _ = local.get(ThEME) // 刷新时读取
	if (_) {
		isDark.value = _ === "true"; // bool string to bool
	} else {
		local.put(ThEME, false); // save
	}
}

/**
 * 切换
 * @param v target value
 */
const switchTheme = (v = !isDark.value) => {
	if (isDark.value === v) return;
	isDark.value = v;
	// todo 可能有性能影响，替代方案是在 onBeforeUnmount 中执行，但是刷新页面时没有执行，达不到预期
	local.put(ThEME, isDark.value?.toString());
}

//#region 生命周期
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
onBeforeMount(() => {
	document.documentElement.style.fontSize = '16px';
})
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion
</script>

<template>
	<n-watermark
		:font-size="16"
		:height="384"
		:line-height="16"
		:rotate="-15"
		:width="384"
		:x-offset="12"
		:y-offset="70"
		content="大家艰苦一下，牛奶和面包都会有的"
		cross
		fullscreen
	/>
	<n-config-provider :date-locale="dateZhCN" :locale="zhCN" :theme="isDark ? darkTheme : null">
		<n-modal-provider>
			<n-dialog-provider>
				<n-message-provider>
					<RouterView v-slot="{ Component }">
						<component
							:is="Component"
							:switchTheme="switchTheme"
						/>
					</RouterView>
				</n-message-provider>
			</n-dialog-provider>
		</n-modal-provider>
	</n-config-provider>
</template>

<style>
a {
	color: var(--n-text-color);
}
</style>
