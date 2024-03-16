<script setup>
import {Service} from "@/api/index.js";
import Bg from "@/components/bg.vue";
import {REG_EMAIL} from "@/constant/regular-expression.js";
import {ResponseCode} from "@/constant/response-code.js";
import {debounce} from "@/utils/debounce.js";
import {generateCode} from "@/utils/generate.js";
import {ChevronBackOutline} from "@vicons/ionicons5";
import {NButton, NCountdown, NFlex, NForm, NFormItem, NInput, NLayout, NSpin, useMessage} from "naive-ui";
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

/**
 * 加载标志
 * ：
 * 加载中为 true，否则 false
 * @Default false
 */
const loading = ref(false);

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
	return `再次获取(${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")})`;
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
const duration = ref(3 /** 60*/ * 1000);

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
			trigger: ['input', 'blur'],
			message: '请输入验证码',
		}, {
			trigger: ['validate-code', 'blur'],
			validator(rule, value) {
				if (value.trim() === code.value) {
					return true;
				}
				return new Error("验证码错误");
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
	code.value = generateCode();
	console.log(code.value);
	// todo 调用后端发送验证码
	ObtainedCode.value = true;
});

/**
 * 注册
 * @param e event
 */
const register = debounce((e) => {
	e.preventDefault();                       // 父默认方法

	formRef.value?.validate((errors) => {     // 验证表单
		if (!errors) {                         // 验证通过
			loading.value = false;
			Service.Users.login(model.value)
				.then(res => {
					const data = res.data;
					if (data?.code !== ResponseCode.SUCCESS) {
						message.error(data?.msg);
					}
				})
				.catch(err => {
					message.error(err.message);
				})
				.finally(() => {
					loading.value = false;
				});
		} else {
			message.error("login error");
		}
	});
}, 555);


</script>

<template>
	<n-layout position="absolute">
		<bg/>
		<n-flex justify="center">
			<n-flex class="w-120 p-8 m-t-16 b-rd-4 flex-col" justify="center">
				<div>
					<div class="text-center font-800 font-size-1.5em" style="font-family: Inter serif;">忘记密码?</div>
					<div class="text-center m-b-4">
               <span
	               class="font-size-.9em color-#8c98a4">输入您的注册邮箱，我们为您发送一封包含验证码的邮件，在此输入以重置您的密码</span>
					</div>
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
						<n-form-item first label="验证码" path="code" size="large">
							<div class="flex w-100%">
								<n-input
									v-model:value="model.code"
									:disabled="!code"
									class="flex-auto"
									placeholder="请正确输入您收到的验证码"
									style="border-radius: .1em 0 0 .1em"
									@input="handlePasswordInput"
									@keydown.enter.prevent
								/>
								<n-button :disabled="ObtainedCode || !emailValidated" class="b-rd-0"
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
								:disabled="!model.code"
								:maxlength="17"
								:minlength="7"
								placeholder="请正确输入您的密码"
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
								:disabled="!model.authenticationString"
								:maxlength="17"
								:minlength="7"
								placeholder="请再次正确输入您的密码"
								show-password-on="mousedown"
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
								重置密码
							</n-button>
						</n-form-item>
					</n-form>
				</n-spin>
				<n-flex class="w-100%" justify="left">
					<n-button :bordered="false" href="/login" secondary strong tag="a" type="tertiary">
						<template #icon>
							<ChevronBackOutline/>
						</template>
						前去登录
					</n-button>
				</n-flex>
			</n-flex>

		</n-flex>
	</n-layout>
</template>

<style scoped>
@import "@/styles/form-item-input.css";
@import "@/styles/no-border-btn.css";
</style>
