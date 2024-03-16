<script setup>
import {darkTheme, dateZhCN, NConfigProvider, NDialogProvider, NMessageProvider, NModalProvider, zhCN} from "naive-ui";
import {onBeforeMount, ref} from "vue";

onBeforeMount(() => {
	document.documentElement.style.fontSize = '16px';
})

// 是暗色主题
const isDark = ref(false);

{
	let _ = localStorage.getItem("isDark"); // 刷新时读取
	if (_) {
		isDark.value = _ === "true"; // bool string to bool
	} else {
		localStorage.setItem("isDark", "false"); // save
	}
}

/**
 * 切换
 * @param v target value
 */
const switchTheme = (v = !isDark.value) => {
	if (isDark.value === v) return;
	isDark.value = v;
	localStorage.setItem("isDark", isDark.value?.toString());
}
</script>

<template>
	<n-config-provider :date-locale="dateZhCN" :locale="zhCN" :theme="isDark ? darkTheme : null">
		<n-modal-provider>
			<n-dialog-provider>
				<n-message-provider>
					<RouterView v-slot="{ Component }">
						<component
							:is="Component"
							:isDark="isDark"
							:switchTheme="switchTheme"
						/>
					</RouterView>
				</n-message-provider>
			</n-dialog-provider>
		</n-modal-provider>
	</n-config-provider>
</template>

<style scoped></style>
