<script setup>
import { Service } from "@/api/index.js";
import { messageOptions } from "@/constant/options.js";
import { REG_EMAIL } from "@/constant/regular-expression.js";
import { goto } from "@/router/goto.js";
import { LOGIN } from "@/router/RouterValue.js";
import { debounce } from "@/utils/debounce.js";
import { formValidator } from "@/utils/validator.js";
import { NButton, NDivider, NFlex, NForm, NFormItem, NInput, useMessage } from "naive-ui";
import { ref } from "vue";

const formRef = ref(null);
const message = useMessage();
const model = ref({
	email: null,
	authenticationString: null,
	reenteredAuthenticationString: null
});

const reenteredRef = ref(null);

const loading = ref(false);

function validatePasswordStartWith(_, value) {
	return (
		!!model.value.authenticationString &&
		model.value.authenticationString.startsWith(value) &&
		model.value.authenticationString.length >= value.length
	);
}

function validatePasswordSame(_, value) {
	return value === model.value.authenticationString;
}

function handlePasswordInput() {
	if (model.value.reenteredAuthenticationString) {
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
					return new Error("password 长度应为 7-17");
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
const register = debounce((e) => {
	e.preventDefault(); // 父默认方法
	formValidator(formRef, message, () => {
		loading.value = true;
		Service.Users.register(model.value)
			.then((_) => {
				message.success(
					"注册成功，验证链接已经发送到您的邮箱，3秒后自动跳转到登录界面...",
					messageOptions
				);
				setTimeout(() => {
					goto(LOGIN);
				}, 3000);
			})
			.catch((err) => {
				message.error(err.message, messageOptions);
			})
			.finally(() => {
				loading.value = false;
			});
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
	<n-form id="login-form" ref="formRef" :model="model" :rules="rules">
		<n-form-item label="邮箱" path="email" size="large">
			<n-input
				v-model:value="model.email"
				:maxlength="32"
				:minlength="5"
				placeholder="请正确输入您的邮箱"
				@keydown.enter.prevent
			/>
		</n-form-item>
		<n-form-item label="密码" path="authenticationString" size="large">
			<n-input
				v-model:value="model.authenticationString"
				:maxlength="17"
				:minlength="7"
				placeholder="请正确输入您的密码"
				type="password"
				@input="handlePasswordInput"
				@keydown.enter.prevent
			/>
		</n-form-item>
		<n-form-item
			first
			label="确认密码"
			path="reenteredAuthenticationString"
			size="large"
		>
			<n-input
				ref="reenteredRef"
				v-model:value="model.reenteredAuthenticationString"
				:maxlength="17"
				:minlength="7"
				placeholder="请再次正确输入您的密码"
				type="password"
				@keydown.enter.prevent
			/>
		</n-form-item>
		<n-form-item>
			<n-button
				:loading="loading"
				class="w-100%"
				size="large"
				type="success"
				@click="register"
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
