<script setup>
import { action } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { messageOptions } from "@/constant/options.js";
import { REG_BASE64 } from "@/constant/regular-expression.js";

import { NInput, useMessage } from "naive-ui";
import { onMounted } from "vue";

const query = defineProps({
	token: String
});

const message = useMessage();

const msgReactive = message.create("", messageOptions);

function updateMessage(type, content) {
	msgReactive.type = type;
	msgReactive.content = content;
}

const start = async () => {
	updateMessage("success", "连接成功");

	updateMessage("info", "发起验证");

	updateMessage("loading", "验证中");

	action(message, Service.Users.verifyEmail(query.token), () => {
		message.success("验证通过", messageOptions);
	}, () => {
		message.error("验证失败，请联系管理员(1635276938@qq.com)", messageOptions);
	});
};

onMounted(() => {
	const _qt = query.token;
	if (!(_qt && REG_BASE64.test(_qt))) {
		updateMessage("error", "无效的token");
		return;
	}
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
