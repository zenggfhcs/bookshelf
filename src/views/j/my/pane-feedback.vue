<script setup>

import { NButton, NCard, NFlex, NInput, NSpace } from "naive-ui";
</script>

<template>

	<n-flex class="items-center" vertical>
		<n-card class="w-40em">
			<n-space vertical>
				<span class="font-bold font-size-1.2em text-center"> 反馈内容 </span>
				<n-input :autosize="{minRows: 5}" maxlength="255" show-count type="textarea" />
				<n-flex justify="right">
					<n-button type="primary" @click=""> 发送反馈</n-button>
				</n-flex>
			</n-space>
		</n-card>
	</n-flex>
</template>

<style scoped>

</style>