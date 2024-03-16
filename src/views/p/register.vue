<script setup>
import {Service} from "@/api/index.js";
import {messageOptions} from "@/constant/options.js";
import {REG_EMAIL} from "@/constant/regular-expression.js";
import {ResponseCode} from "@/constant/response-code.js";
import {goto} from "@/router/goto.js";
import {LOGIN} from "@/router/RouterValue.js";
import {debounce} from "@/utils/debounce.js";
import {NButton, NForm, NFormItem, NGi, NGrid, NInput, NSpin, useMessage} from "naive-ui";
import {ref} from "vue";


const formRef = ref(null);
const message = useMessage();
const model = ref({
	email: null,
	authenticationString: null,
	reenteredAuthenticationString: null,
});

const reenteredRef = ref(null);

const loading = ref(false);

function validatePasswordStartWith(rule, value) {
	return !!model.value.authenticationString && model.value.authenticationString.startsWith(value) && model.value.authenticationString.length >= value.length;
}

function validatePasswordSame(rule, value) {
	return value === model.value.authenticationString;
}

function handlePasswordInput() {
	if (model.value.reenteredAuthenticationString) {
		reenteredRef.value?.validate({trigger: "authenticationString-input"});
	}
}

const rules = {
	email: [
		{
			required: true,          // 字段必填
			trigger: ['input', 'blur'],
			validator(rule, value) {      // 自定义检查
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
			trigger: ['input', 'blur'],
			validator(rule, value) {
				if (value === undefined || value === null || value.length === 0) {
					return new Error("请输入密码");
				} else if (value.length < 7 || value.length > 17) {
					return new Error("password 长度应为 7-17")
				}
			}
		}
	],
	reenteredAuthenticationString: [
		{
			required: true,
			message: '请再次输入密码',
			trigger: ['input', 'blur']
		},
		{
			validator: validatePasswordStartWith,
			message: '两次密码输入不一致',
			trigger: 'input'
		},
		{
			validator: validatePasswordSame,
			message: '两次密码输入不一致',
			trigger: ['blur', 'authenticationString-input']
		}
	]
};

/**
 * 注册
 * @param e event
 */
const register = debounce((e) => {
		e.preventDefault();                       // 父默认方法
		formRef.value?.validate((errors) => {
			if (errors) {
				message.error("表单没有通过验证，请检查表单项", messageOptions);
				return;
			}
			loading.value = true;
			Service.Users.register(model.value)
				.then(res => {
					const data = res.data;
					if (data?.code !== ResponseCode.SUCCESS) {
						message.error(data?.msg, messageOptions);
						return
					}
					message.success("注册成功，验证链接已经发送到您的邮箱，3秒后自动跳转到登录界面...", messageOptions)
					setTimeout(() => {
						goto(LOGIN);
					}, 3000);
				})
				.catch(err => {
					message.error(err.message, {
						duration: 10000,
						closable: true
					});
				})
				.finally(() => {
					loading.value = false;
				});
		});
	})
;

</script>
<template>
	<div class="w-100%">
		<div class="text-center font-800 font-size-1.5em" style="font-family: Inter serif;">创建您的账户</div>
		<div class="text-center m-b-4">
			<span>已经有账户了?</span>
			<router-link :to="LOGIN" class="p-0 m-0 font-size-1rem font-800 color-emerald">
				在此登入
			</router-link>
		</div>
		<n-grid :cols="11" class="items-center text-center h-2em m-b-4" x-gap="4">
			<n-gi span="5">
				<div class="w-100% h-.2 bg-#8c98a4"></div>
			</n-gi>
			<n-gi class="font-size-1.3em" span="1">
				OR
			</n-gi>
			<n-gi span="5">
				<div class="w-100% h-.2 bg-#8c98a4"></div>
			</n-gi>
		</n-grid>
	</div>
	<n-spin :show="loading" class="w-100%">
		<n-form
			id="login-form"
			ref="formRef"
			:model="model"
			:rules="rules"
		>
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
			<n-form-item first label="确认密码" path="reenteredAuthenticationString" size="large">
				<n-input
					ref="reenteredRef"
					v-model:value="model.reenteredAuthenticationString"
					:disabled="!model.authenticationString"
					:maxlength="17"
					:minlength="7"
					placeholder="请再次正确输入您的密码"
					type="password"
					@keydown.enter.prevent
				/>
			</n-form-item>
			<n-form-item>
				<n-button
					:disabled="!model.email"
					class="w-100%"
					size="large"
					type="success"
					@click="register">
					注册
				</n-button>
			</n-form-item>
		</n-form>
	</n-spin>
</template>

<style scoped>
@import "/src/styles/form-item-input.css";
</style>
