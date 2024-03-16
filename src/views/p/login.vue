<script setup>
import {Service} from "@/api/index.js";
import {messageOptions} from "@/constant/options.js";
import {REG_EMAIL} from "@/constant/regular-expression.js";
import {ResponseCode} from "@/constant/response-code.js";
import router from "@/router/Router.js";
import {REGISTER, RESET_PASSWORD} from "@/router/RouterValue.js";
import {debounce} from "@/utils/debounce.js";
import {NButton, NForm, NFormItem, NGi, NGrid, NInput, NSpin, useMessage} from "naive-ui";
import {onMounted, ref} from "vue";

onMounted(() => {
})


const formRef = ref(null);
const message = useMessage();
const model = ref({
	email: null,
	authenticationString: null,
});
const loading = ref(false);

const rules = {
	email: [
		{
			required: true,   // 字段必填
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
	]
};

/**
 * 登录
 * @param e event
 */
const login = debounce((e) => {
	e.preventDefault();                       // 父默认方法

	formRef?.value?.validate((errors) => {
		if (errors) {
			message.error("表单没有通过验证，请检查表单项", messageOptions);
			return;
		}
		loading.value = true;
		Service.Users.login(model.value)
			.then(res => {
				const data = res.data;
				if (data?.code === ResponseCode.SUCCESS) {
					// 登录
					localStorage.setItem("token", data?.data?.token);
					router.push("/");
				} else {
					message.error(data?.msg);
				}
			})
			.catch(err => {
				message.error(err.message);
			})
			.finally(() => {
				loading.value = false;
			});
	});
});


</script>

<template>
	<div class="w-100%">
		<div class="text-center font-800 font-size-1.5em" style="font-family: Inter serif;">登录您的账户</div>
		<div class="text-center m-b-4">
			<span>还没有账户吗?</span>
			<router-link :to="REGISTER" class="p-0 m-0 font-size-1rem font-800 color-emerald">在此注册
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
				<div class="w-100% relative">
					<n-input
						v-model:value="model.authenticationString"
						:maxlength="17"
						:minlength="7"
						autocapitalize="on"
						placeholder="请正确输入您的密码"
						show-password-on="mousedown"
						type="password"
						@keydown.enter.prevent
					/>
					<router-link :to="RESET_PASSWORD"
					             class="absolute bottom--1.7em right-0 h-2em line-height-2em color-#8c98a4">忘记密码?
					</router-link>
				</div>
			</n-form-item>
			<n-form-item>
				<n-button
					:disabled="!model.email"
					class="w-100%"
					size="large"
					type="success"
					@click="login">
					登入
				</n-button>
			</n-form-item>
		</n-form>
	</n-spin>
</template>

<style scoped>
@import "/src/styles/form-item-input.css";
</style>
