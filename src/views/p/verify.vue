<script setup>
import { Service } from "@/api/index.js";
import { messageOptions } from "@/constant/options.js";
import { REG_BASE64 } from "@/constant/regular-expression.js";
import { SC } from "@/constant/response-code.js";

import { sleep } from "@/utils/sleep.js";
import { NInput, useMessage } from "naive-ui";
import { onMounted } from "vue";

const query = defineProps({
	token: String,
});

const message = useMessage();

const msgReactive = message.create("", messageOptions);

function updateMessage(type, content) {
	msgReactive.type = type;
	msgReactive.content = content;
	sleep();
}

const start = async () => {
	updateMessage("success", "连接成功");

	updateMessage("info", "发起验证");

	updateMessage("loading", "验证中");

	Service.Users.verifyEmail(query.token)
		.then((res) => {
			const data = res.data;
			if (data?.code !== SC.SUCCESS) {
				updateMessage(
					"error",
					"VERIFIED_FAILED: 验证失败，请联系管理员(1635276938@qq.com)",
				);
			} else {
				updateMessage("success", "验证通过");
			}
		})
		.catch((err) => {
			updateMessage("error", err.message);
		})
		.finally(() => {});
};

onMounted(() => {
	const _qt = query.token;
	if (!(_qt && REG_BASE64.test(_qt))) {
		updateMessage("error", "无效的token");
		return;
	}
	sleep();
	if (_qt) start();
});
</script>

<template>
	<n-input
		autosize
		placeholder="可以输入点什么，但没有别的意义"
		type="textarea"
	/>
</template>

<style scoped></style>
