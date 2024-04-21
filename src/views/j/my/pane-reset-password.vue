<script setup>

import { action, queryItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import NoData from "@/components/no-data.vue";
import { messageOptions } from "@/constant/options.js";
import { debounce } from "@/utils/debounce.js";
import logout from "@/utils/logout.js";
import { formValidator } from "@/utils/validator.js";

import { NButton, NCard, NFlex, NForm, NFormItem, NInput, NSpace, NTag, useMessage } from "naive-ui";
import { onMounted, reactive, ref } from "vue";

const message = useMessage();

const info = reactive({
	id: "",
	email: "",
	authenticationString: "",
	newAuthenticationString: "",
	reenteredNewAuthenticationString: "",
	revision: 0
});

const reenteredRef = ref();

function validateAuthenticationStringStartWith(_, value) {
	return (
		!!info.newAuthenticationString &&
		info.newAuthenticationString.startsWith(value) &&
		info.newAuthenticationString.length >= value.length
	);
}

function validateAuthenticationStringSame(_, value) {
	return value === info.newAuthenticationString;
}

function handleAuthenticationStringInput() {
	if (info.reenteredNewAuthenticationString) {
		reenteredRef.value?.validate({ trigger: "authenticationString-input" });
	}
}

const rules = {
	authenticationString: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入密码"
		}
	],
	newAuthenticationString: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入新密码"
		}
	],
	reenteredNewAuthenticationString: [
		{
			required: true,
			message: "请再次输入新密码",
			trigger: ["input", "blur"]
		},
		{
			validator: validateAuthenticationStringStartWith,
			message: "两次密码输入不一致",
			trigger: "input"
		},
		{
			validator: validateAuthenticationStringSame,
			message: "两次密码输入不一致",
			trigger: ["blur", "authenticationString-input"]
		}
	]

};

const resetFormRef = ref();

const loadingReset = ref(false);

const resetHandler = debounce(() => {
	formValidator(resetFormRef, message, async () => {
		loadingReset.value = true;

		await action(message, Service.Users.resetPasswordByUpdate(info), () => {
			message.success("更改成功", messageOptions);
			// todo 更改成功需要重新登录，这里退出登录
			logout(message);
		});

		loadingReset.value = false;
	});
});

onMounted(() => {
	queryItem(
		message,
		Service.Users.tokenUser(),
		info
	);
});
</script>

<template>

	<n-flex justify="center">
		<n-card class="w-30em">
			<n-space vertical>
				<span class="font-bold font-size-1.2em text-center"> 修改密码 </span>
				<n-form ref="resetFormRef" :model="info" :rules="rules" label-align="right" label-placement="left"
				        label-width="auto">
					<n-form-item label="邮箱">
						<n-tag v-if="info.email" :bordered="false" type="success">
							{{ info.email }}
						</n-tag>
						<NoData v-else />
					</n-form-item>
					<n-form-item label="原密码" path="authenticationString">
						<n-input v-model:value="info.authenticationString" placeholder="请输入密码" />
					</n-form-item>
					<n-form-item label="新密码" path="newAuthenticationString">
						<n-input v-model:value="info.newAuthenticationString" placeholder="请再次输入密码" />
					</n-form-item>
					<n-form-item first label="确认新密码" path="reenteredNewAuthenticationString">
						<n-input
							ref="reenteredRef"
							v-model:value="info.reenteredNewAuthenticationString" placeholder="请再次输入密码"
							@input="handleAuthenticationStringInput" />
					</n-form-item>
				</n-form>
				<n-flex justify="right">
					<n-button :loading="loadingReset" type="primary" @click.prevent="resetHandler"> 提交</n-button>
				</n-flex>
			</n-space>
		</n-card>
	</n-flex>
</template>

<style scoped>

</style>