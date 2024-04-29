<script setup>
import { action } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { messageOptions } from "@/constant/options.js";
import { REG_EMAIL } from "@/constant/regular-expression.js";
import { goto } from "@/router/goto.js";
import { LOGIN } from "@/router/route-value.js";
import { debounce } from "@/utils/debounce.js";
import { formValidator } from "@/utils/validator.js";
import { NButton, NDivider, NFlex, NForm, NFormItem, NInput, useMessage } from "naive-ui";
import { reactive, ref } from "vue";

const formRef = ref(null);
const message = useMessage();
const info = reactive({
	email: "",
	authenticationString: "",
	reenteredAuthenticationString: ""
});

const reenteredRef = ref(null);

const loadingRef = ref(false);

function validatePasswordStartWith(_, value) {
	return !!info.authenticationString &&
		info.authenticationString.startsWith(value) &&
		info.authenticationString.length >= value.length;
}

function validatePasswordSame(_, value) {
	return value === info.authenticationString;
}

function handlePasswordInput() {
	console.log("handlePasswordInput");
	if (info.reenteredAuthenticationString) {
		reenteredRef.value?.validate({ trigger: "authenticationString-input" });
	}
}

const rules = {
	email: [
		{
			required: true, // 字段必填
			trigger: ["input", "blur"],
			validator(_, value) {
				// 自定义检查
				if (value === undefined || value === null || value.length === 0) {
					return new Error("请输入邮箱");
				} else if (!REG_EMAIL.test(value.trim())) {
					return new Error("邮箱格式错误");
				}
			}
		}
	],
	authenticationString: [
		{
			required: true,
			trigger: ["input", "blur"],
			validator(_, value) {
				if (value === undefined || value === null || value.length === 0) {
					return new Error("请输入密码");
				} else if (value.length < 7 || value.length > 17) {
					return new Error("长度应为 7-17");
				}
			}
		}
	],
	reenteredAuthenticationString: [
		{
			required: true,
			message: "请再次输入密码",
			trigger: ["input", "blur"]
		},
		{
			validator: validatePasswordStartWith,
			message: "两次密码输入不一致",
			trigger: "input"
		},
		{
			validator: validatePasswordSame,
			message: "两次密码输入不一致",
			trigger: ["blur", "authenticationString-input"]
		}
	]
};

/**
 * 注册
 * @param e event
 */
const registerHandler = debounce(() => {
	formValidator(formRef, message, async () => {
		loadingRef.value = true;

		await action(message, Service.Users.register(info), (_) => {
			message.success(
				"注册成功，验证链接已经发送到您的邮箱，3秒后自动跳转到登录界面...",
				messageOptions
			);
			setTimeout(() => {
				goto(LOGIN);
			}, 3000);
		});

		loadingRef.value = false;
	});
});
</script>
<template>
	<n-flex class="items-center" vertical>
		<div
			class="text-center font-800 font-size-1.5em"
			style="font-family: Inter serif"
		>
			创建您的账户
		</div>
		<div class="text-center">
			<span>已经有账户了?</span>
			<router-link
				:to="LOGIN"
				class="p-0 m-0 font-size-1rem font-800 color-emerald"
			>
				在此登入
			</router-link>
		</div>
		<n-divider>OR</n-divider>
	</n-flex>
	<n-form id="login-form" ref="formRef" :model="info" :rules="rules">
		<n-form-item label="邮箱" path="email">
			<n-input
				v-model:value="info.email"
				:maxlength="32"
				:minlength="5"
				placeholder="请正确输入您的邮箱"
				@keydown.enter.prevent
			/>
		</n-form-item>
		<n-form-item label="密码" path="authenticationString">
			<n-input
				v-model:value="info.authenticationString"
				:maxlength="17"
				:minlength="7"
				placeholder="请正确输入您的密码"
				type="password"
				@input="handlePasswordInput"
				@keydown.enter.prevent
			/>
		</n-form-item>
		<n-form-item
			ref="reenteredRef"
			first
			label="确认密码"
			path="reenteredAuthenticationString">
			<n-input
				v-model:value="info.reenteredAuthenticationString"
				:maxlength="17"
				:minlength="7"
				placeholder="请再次正确输入您的密码"
				type="password"
				@keydown.enter.prevent
			/>
		</n-form-item>
		<n-form-item>
			<n-button
				:loadingRef="loadingRef"
				class="w-100%"
				type="success"
				@click.prevent="registerHandler"
			>
				注册
			</n-button>
		</n-form-item>
	</n-form>
</template>

<style scoped>
@import "/src/styles/form-item-input.css";

.n-layout .n-divider:not(.n-divider--vertical) {
	margin: 0.3em 0;
}
</style>
