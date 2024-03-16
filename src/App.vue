<template>
	<n-config-provider :date-locale="dateZhCN" :locale="zhCN">
		<n-modal-provider>
			<n-dialog-provider>
				<n-message-provider>
					<router-view/>
				</n-message-provider>
			</n-dialog-provider>
		</n-modal-provider>
	</n-config-provider>
</template>

<script setup>
import {dateZhCN, NConfigProvider, NDialogProvider, NMessageProvider, NModalProvider, zhCN} from "naive-ui";
import {onBeforeMount} from "vue";

onBeforeMount(() => {
	document.documentElement.style.fontSize = '16px';
})
</script>

<style scoped></style>
