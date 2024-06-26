<script setup>
import { action } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { REG_EMAIL } from "@/constant/regular-expression.js";
import router from "@/router/index.js";
import { REGISTER, RESET_PASSWORD } from "@/router/route-value.js";
import { debounce } from "@/utils/debounce.js";
import { resetToken } from "@/utils/storage-operation.js";
import { formValidator } from "@/utils/validator.js";
import { NButton, NDivider, NFlex, NForm, NFormItem, NInput, useMessage } from "naive-ui";
import { onMounted, reactive, ref } from "vue";

onMounted(() => {
});

const formRef = ref(null);
const message = useMessage();
const model = reactive({
	email: null,
	authenticationString: null
});
const loadingRef = ref(false);

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
	]
};

/**
 * 登录
 * @param e event
 */
const login = debounce(() => {
	formValidator(formRef, message, async () => {
		loadingRef.value = true;

		await action(message, Service.Users.login(model), (res) => {
			const _tokenInfo = JSON.parse(res?.token);
			resetToken(_tokenInfo);
			router.push("/"); // todo goto index
		});

		loadingRef.value = false;
	});
});
</script>

<template>
	<n-flex class="items-center" vertical>
		<div class="text-center">
			<span class="font-800 font-size-1.5em">登录您的账户</span>
		</div>
		<div class="text-center">
			<span>还没有账户吗?</span>
			<router-link
				:to="REGISTER"
				class="p-0 m-0 font-size-1rem font-800 color-emerald"
			>在此注册
			</router-link>
		</div>
		<n-divider>OR</n-divider>
	</n-flex>
	<n-form id="login-form" ref="formRef" :model="model" :rules="rules">
		<n-form-item label="邮箱" path="email">
			<n-input
				v-model:value="model.email"
				:maxlength="32"
				:minlength="5"
				placeholder="输入邮箱"
				@keydown.enter.prevent
			/>
		</n-form-item>
		<n-form-item label="密码" path="authenticationString">
			<div class="w-100% relative">
				<n-input
					v-model:value="model.authenticationString"
					:maxlength="17"
					:minlength="7"
					autocapitalize="on"
					placeholder="输入密码"
					show-password-on="mousedown"
					type="password"
					@keydown.enter.prevent
				/>
				<router-link
					:to="RESET_PASSWORD"
					class="absolute bottom--1.7em right-0 h-2em line-height-2em color-#8c98a4"
				>忘记密码?
				</router-link>
			</div>
		</n-form-item>
		<n-form-item>
			<n-button
				:loadingRef="loadingRef"
				class="w-100%"
				type="success"
				@click.prevent="login"
			>
				登入
			</n-button>
		</n-form-item>
	</n-form>
</template>

<style scoped>
@import "/src/styles/form-item-input.css";

.n-layout .n-divider:not(.n-divider--vertical) {
	margin: 0.3em 0;
}

/*

input:-internal-autofill-selected

*/
</style>
