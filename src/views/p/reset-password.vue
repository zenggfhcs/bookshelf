<script setup>
import {Mail, Service} from "@/api/index.js";
import {messageOptions} from "@/constant/options.js";
import {REG_EMAIL} from "@/constant/regular-expression.js";
import {ResponseCode} from "@/constant/response-code.js";
import {goto} from "@/router/goto.js";
import {LOGIN} from "@/router/RouterValue.js";
import {debounce} from "@/utils/debounce.js";
import {gCode} from "@/utils/generate.js";
import {formValidator} from "@/utils/validator.js";
import {ChevronBackOutline} from "@vicons/ionicons5";
import {NButton, NCountdown, NFlex, NForm, NFormItem, NGi, NGrid, NInput, useMessage} from "naive-ui";
import {ref} from "vue";

/**
 * form ref 定位
 * @type {Ref<UnwrapRef<null>>}
 */
const formRef = ref(null);

/**
 * 页面信息通知对象
 * @type {MessageApiInjection}
 */
const message = useMessage();

/**
 * form model object
 */
const model = ref({
	email: null,
	code: null,
	authenticationString: null,
	reenteredAuthenticationString: null,
});

/**
 * 确认密码的 ref，用于触发输入密码的 input 的验证
 */
const reenteredRef = ref(null);

const codeRef = ref(null);

/**
 * 加载标志
 * ：
 * 加载中为 true，否则 false
 * @Default false
 */
const loading = ref(false);

const sendCodeLoading = ref(false);

/**
 * 验证码有效标识，获取过验证码，并且验证码有效为 true
 * 没有获取过验证码，或者验证码均已失效后，置为 false
 */
const ObtainedCode = ref(false);

/**
 * 邮箱验证结果标志
 * ：
 * 通过验证为 true，否则为 false
 */
const emailValidated = ref(false);

/**
 * 计时按钮格式返回
 * @param minutes 分钟数
 * @param seconds 秒数
 */
const renderCountdown = ({minutes, seconds}) => {
	return `(${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")})`;
}

/**
 * 计时器标识ref，用于重置计时器
 * @type {Ref<any>}
 */
const countdownRef = ref();

/**
 * 验证码，保存有效的验证码，验证码过期会被重置为 ''
 */
const code = ref('');

/**
 * 计时器时长
 */
const duration = ref(3 * 60 * 1000);

/**
 * 计时器完成回调函数
 */
const countdownFinish = () => {
	// 停止计时
	ObtainedCode.value = false;
	// 重置计时器
	countdownRef.value.reset();
	// 重置验证码
	code.value = '';
}

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

function handleCodeAfterConfirmed() {
	if (model.value.code) {
		codeRef.value?.validate({trigger: "validate-code"});
		return true;
	}
	return false;
}

const rules = {
	email: [
		{
			required: true,          // 字段必填
			trigger: ['input', 'blur'],
			validator(rule, value) {      // 自定义检查
				emailValidated.value = false;
				if (value === undefined || value === null || value.length === 0) {
					return new Error("请输入邮箱");
				} else if (!REG_EMAIL.test(value.trim())) {
					return new Error("邮箱格式错误");
				}
				emailValidated.value = true;
				return true;
			}
		}
	],
	code: [
		{
			required: true,
			trigger: ['input', 'blur'], // todo diy 触发方式，在表单验证时触发
			message: '请输入验证码',
		}, {
			trigger: ['validate-code'],
			validator(rule, value) {
				if (value.trim() !== code.value) {
					return new Error("验证码错误");
				}
				return true;
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
				return true;
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
 * 发送验证码
 */
const sendCode = debounce((e) => {
	e.preventDefault();
	code.value = gCode();

	const _entity = {
		email: model.value.email,
		authenticationString: code.value?.toString()
	}
	sendCodeLoading.value = true;
	Mail.sendCode(_entity)
		.then(res => {
			message.success("发送成功，请查看邮箱邮件", messageOptions);
			console.log(res);
			ObtainedCode.value = true;
		})
		.catch(err => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
			sendCodeLoading.value = false;
		})
});

/**
 * 注册
 * @param e event
 */
const resetPassword = debounce((e) => {
	e.preventDefault();                       // 父默认方法
	formValidator(formRef, message, () => {
		loading.value = true;
		Service.Users.resetPassword(model.value)
			.then(res => {
				const data = res.data;
				if (data?.code !== ResponseCode.SUCCESS) {
					message.error(data.message);
					return;
				}
				message.success("修改成功，3秒后自动跳转到登录界面...", messageOptions);
				setTimeout(() => {
					goto(LOGIN);
				}, 3000);
			})
			.catch(err => {
				message.error(err.message);
			})
			.finally(() => {
				loading.value = false;
			});
	})
});
</script>

<template>
	<n-flex class="items-center" vertical>
		<div class="text-center font-800 font-size-1.5em">重置密码</div>
		<div class="text-center">
			<span class="font-size-.9em color-#8c98a4">
				输入您的注册邮箱，我们为您发送一封包含验证码的邮件，在此输入以重置您的密码
			</span>
		</div>
	</n-flex>
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
				placeholder="输入邮箱"
				@keydown.enter.prevent
			/>
		</n-form-item>
		<n-form-item first label="验证码" path="code" size="large">
			<div class="flex w-100%">
				<n-input
					ref="codeRef"
					v-model:value="model.code"
					class="flex-auto"
					placeholder="输入验证码"
					style="border-radius: .1em 0 0 .1em"
					@keydown.enter.prevent
				/>
				<n-button :disabled="ObtainedCode || !emailValidated" :loading="sendCodeLoading"
				          class="b-rd-0"
				          style="border-radius: 0 .1em .1em 0" type="info" @click="sendCode">
					<span v-show="!ObtainedCode">获取</span>
					<span v-show="ObtainedCode">
                           <n-countdown
	                           ref="countdownRef"
	                           :active="ObtainedCode"
	                           :duration="duration"
	                           :on-finish="countdownFinish"
	                           :render="renderCountdown"/>
                        </span>
				</n-button>
			</div>
		</n-form-item>
		<n-form-item first label="密码" path="authenticationString" size="large">
			<n-input
				v-model:value="model.authenticationString"
				:maxlength="17"
				:minlength="7"
				placeholder="输入密码"
				show-password-on="mousedown"
				type="password"
				@input="handlePasswordInput"
				@keydown.enter.prevent
			/>
		</n-form-item>
		<n-form-item first label="确认密码" path="reenteredAuthenticationString" size="large">
			<n-input
				ref="reenteredRef"
				v-model:value="model.reenteredAuthenticationString"
				:maxlength="17"
				:minlength="7"
				placeholder="再次输入密码"
				show-password-on="mousedown"
				type="password"
				@keydown.enter.prevent
			/>
		</n-form-item>
		<n-grid :cols="5" x-gap="12">
			<n-gi :span="2">
				<router-link :to="LOGIN">
					<n-button :bordered="false" class="w-100%"
					          secondary size="large" strong type="tertiary">
						<template #icon>
							<ChevronBackOutline/>
						</template>
						前去登入
					</n-button>
				</router-link>
			</n-gi>
			<n-gi :span="3">
				<n-button :loading="loading" class="w-100%" size="large"
				          type="success" @click="resetPassword">
					重置密码
				</n-button>
			</n-gi>
		</n-grid>
	</n-form>

</template>

<style scoped>
@import "@/styles/form-item-input.css";
@import "@/styles/no-border-btn.css";
</style>
