<script setup>

import { messageOptions } from "@/constant/options.js";
import { debounce } from "@/utils/debounce.js";
import { NButton, NCard, NFlex, NInput, NSpace, useMessage } from "naive-ui";
import { ref } from "vue";

const feedbackRef = ref("");

const message = useMessage();

const loadingFeedback = ref(false);

const feedbackHandler = debounce(() => {
	if (feedbackRef.value.length < 10) {
		message.warning("反馈需要10个字以上", messageOptions);
		return;
	}

	loadingFeedback.value = true;

	loadingFeedback.value = false;
});
</script>

<template>

	<n-flex class="items-center" vertical>
		<n-card class="w-40em">
			<n-space vertical>
				<span class="font-bold font-size-1.2em text-center"> 反馈内容 </span>
				<n-input v-model:value="feedbackRef" :autosize="{minRows: 5}" maxlength="255" show-count type="textarea" />
				<n-flex justify="right">
					<n-button :loading="loadingFeedback" type="primary" @click.prevent="feedbackHandler"> 发送反馈</n-button>
				</n-flex>
			</n-space>
		</n-card>
	</n-flex>
</template>

<style scoped>

</style>