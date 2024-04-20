<script setup>
import { Service } from "@/api/index.js";
import { messageOptions } from "@/constant/options.js";
import { REG_EMAIL } from "@/constant/regular-expression.js";
import { goto } from "@/router/goto.js";
import { LOGIN } from "@/router/router-value.js";
import { debounce } from "@/utils/debounce.js";
import { copyMatchingProperties } from "@/utils/index.js";
import { formValidator } from "@/utils/validator.js";
import { ChevronBackOutline } from "@vicons/ionicons5";
import { NButton, NFlex, NForm, NFormItem, NGi, NGrid, NInput, NText, useMessage } from "naive-ui";
import { onBeforeMount, reactive, ref } from "vue";


const props = defineProps(["token"]);

/**
 * form ref 定位
 */
const formRef = ref(null);

/**
 * 页面信息通知对象
 */
const message = useMessage();

const resetFlagRef = ref(false);

/**
 * form info object
 */
const info = reactive({
	email: null,
	authenticationString: null,
	reenteredAuthenticationString: null,
	revision: 0,
	remark: ""
});

/**
 * 确认密码的 ref，用于触发输入密码的 input 的验证
 */
const reenteredRef = ref(null);

/**
 * 加载标志
 * ：
 * 加载中为 true，否则 false
 */
const loadingRef = ref(false);

function validatePasswordStartWith(_, value) {
	return (
		!!info.authenticationString &&
		info.authenticationString?.toString().startsWith(value) &&
		info.authenticationString.length >= value.length
	);
}

function validatePasswordSame(_, value) {
	return value === info.authenticationString;
}

function handlePasswordInput() {
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
				return true;
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
				return true;
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
const resetPassword = debounce(() => {
	formValidator(formRef, message, () => {
		loadingRef.value = true;
		Service.Users.resetPassword(info)
			.then((_) => {
				message.success("修改成功，3秒后自动跳转到登录界面...", messageOptions);
				setTimeout(() => {
					goto(LOGIN);
				}, 3000);
			})
			.catch((err) => {
				message.error(err.message, messageOptions);
			})
			.finally(() => {
				loadingRef.value = false;
			});
	});
});

const sendLink = debounce(() => {
	formValidator(formRef, message, async () => {
		loadingRef.value = true;
		await Service.Users.sendMailForResetPassword(info)
			.then(_ => {
				message.success("重置邮件已发送，请检查您的邮箱收件箱", messageOptions);
				return Promise.resolve();
			})
			.catch((err) => {
				message.error(err.message, messageOptions);
			})
			.finally(() => {
				loadingRef.value = false;
			});
		loadingRef.value = false;
	});
});

onBeforeMount(async () => {
	// 检查有没有 token
	if (props.token) {
		await Service.Token.verify(props.token)
			.then(res => {
				copyMatchingProperties(res, info);
				info.remark = props.token;
				resetFlagRef.value = true;
				return Promise.resolve();
			})
			.catch((err) => {
				message.error(err.message, messageOptions);
			})
			.finally(() => {
				loadingRef.value = false;
			});
	}
});
</script>

<template>
	<n-flex class="items-center" vertical>
		<div class="text-center font-800 font-size-1.5em">重置密码</div>
		<div class="text-center">
			<span class="font-size-.9em color-#8c98a4">
				<span v-if="resetFlagRef">重置您的密码</span>
				<span v-else>输入您的注册邮箱，我们为您发送一封包含重置链接的邮件，访问链接以重置您的密码</span>
			</span>
		</div>
	</n-flex>

	<n-form id="login-form" ref="formRef" :model="info" :rules="rules">
		<n-form-item label="邮箱" path="email" size="large">
			<n-text v-if="resetFlagRef" class="font-size-1.5em">
				{{ info.email }}
			</n-text>
			<n-input
				v-else
				v-model:value="info.email"
				:maxlength="32"
				:minlength="5"
				placeholder="输入邮箱"
				@keydown.enter.prevent
			/>
		</n-form-item>
		<!--		<n-form-item first label="验证码" path="code" size="large">-->
		<!--			<div class="flex w-100%">-->
		<!--				<n-input-->
		<!--					ref="codeRef"-->
		<!--					v-info:value="info.code"-->
		<!--					class="flex-auto"-->
		<!--					placeholder="输入验证码"-->
		<!--					style="border-radius: 0.1em 0 0 0.1em"-->
		<!--					@keydown.enter.prevent-->
		<!--				/>-->
		<!--				<n-button-->
		<!--					:disabled="ObtainedCode || !emailValidated"-->
		<!--					:loadingRef="sendCodeLoading"-->
		<!--					class="b-rd-0"-->
		<!--					style="border-radius: 0 0.1em 0.1em 0"-->
		<!--					type="info"-->
		<!--					@click.prevent="sendCode"-->
		<!--				>-->
		<!--					<span v-show="!ObtainedCode">获取</span>-->
		<!--					<span v-show="ObtainedCode">-->
		<!--						<n-countdown-->
		<!--							ref="countdownRef"-->
		<!--							:active="ObtainedCode"-->
		<!--							:duration="duration"-->
		<!--							:on-finish="countdownFinish"-->
		<!--							:render="renderCountdown"-->
		<!--						/>-->
		<!--					</span>-->
		<!--				</n-button>-->
		<!--			</div>-->
		<!--		</n-form-item>-->
		<n-form-item v-if="resetFlagRef" first label="密码" path="authenticationString" size="large">
			<n-input
				v-model:value="info.authenticationString"
				:maxlength="17"
				:minlength="7"
				placeholder="输入密码"
				show-password-on="mousedown"
				type="password"
				@input="handlePasswordInput"
				@keydown.enter.prevent
			/>
		</n-form-item>
		<n-form-item v-if="resetFlagRef"
		             first
		             label="确认密码"
		             path="reenteredAuthenticationString"
		             size="large"
		>
			<n-input
				ref="reenteredRef"
				v-model:value="info.reenteredAuthenticationString"
				:maxlength="17"
				:minlength="7"
				placeholder="再次输入密码"
				show-password-on="mousedown"
				type="password"
				@keydown.enter.prevent
			/>
		</n-form-item>
		<n-form-item>
			<n-grid :cols="5" x-gap="12">
				<n-gi :span="2">
					<router-link :to="LOGIN">
						<n-button
							:bordered="false"
							class="w-100%"
							secondary
							size="large"
							strong
							type="tertiary"
						>
							<template #icon>
								<ChevronBackOutline />
							</template>
							前去登入
						</n-button>
					</router-link>
				</n-gi>
				<n-gi :span="3">
					<n-button
						v-if="resetFlagRef"
						:loading="loadingRef"
						class="w-100%"
						size="large"
						type="success"
						@click.prevent="resetPassword"
					>
						重置密码
					</n-button>
					<n-button
						v-else
						:loading="loadingRef"
						class="w-100%"
						size="large"
						type="success"
						@click.prevent="sendLink"
					>
						请求重置
					</n-button>
				</n-gi>
			</n-grid>
		</n-form-item>
	</n-form>
</template>

<style scoped>
@import "@/styles/form-item-input.css";
@import "@/styles/no-border-btn.css";
</style>
