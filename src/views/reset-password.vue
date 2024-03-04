<script setup>
import {ref} from "vue";
import {NButton, NCountdown, NFlex, NForm, NFormItem, NInput, NSpin, useMessage} from "naive-ui";
import {ChevronBackOutline} from "@vicons/ionicons5"
import {debounce} from "@/utils/debounce.js";
import {Service} from "@/api/index.js";
import {ResponseCode} from "@/constant/ResponseCode.js";
import Bg from "@/components/bg.vue";
import {REG_EMAIL} from "@/constant/RegularExpression.js";
import {shuffleArray} from "@/utils/index.js";

//#region all
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
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
 * @type {Ref<UnwrapRef<{code: null, authenticationString: null, email: null, reenteredAuthenticationString: null}>>}
 */
const model = ref({
   email: null,
   code: null,
   authenticationString: null,
   reenteredAuthenticationString: null,
});

/**
 * 确认密码的 ref，用于触发输入密码的 input 的验证
 * @type {Ref<UnwrapRef<null>>}
 */
const reenteredRef = ref(null);

/**
 * 加载标志，点击按键提交后进入加载，回调或超时后退出加载
 * @type {Ref<UnwrapRef<boolean>>}
 */
const loading = ref(false);

/**
 * 验证码有效标识，获取过验证码，并且验证码有效为 true
 * 没有获取过验证码，或者验证码均已失效后，置为 false
 * @type {Ref<UnwrapRef<boolean>>}
 */
const ObtainedCode = ref(false);

/**
 * 邮箱验证结果标志
 * 通过验证 => true
 * 否则 => false
 * @type {Ref<UnwrapRef<boolean>>}
 */
const emailValidated = ref(false);

/**
 * 计时按钮格式返回
 * @param minutes
 * @param seconds
 * @returns {`再次获取(${string}:${string})`}
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
 * @type {Ref<UnwrapRef<string>>}
 */
const code = ref('');

/**
 * 计时器时长
 * @type {Ref<UnwrapRef<number>>}
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
 * 返回一个 [1, m] 之间的整数
 * @param m max
 * @returns {number}
 */
const randomInt = (m) => {
   return Math.floor(Math.random() * m + 1);
}

/**
 * 生成验证码
 * @returns {string}
 */
const generateCode = () => {
   let code = '';
   const l = randomInt(randomInt(3)) + 7;
   while (code.length < l) {
      code += (Math.ceil(Math.random() * 10000000))
         .toString(16);
   }
   code = shuffleArray(('!@#$%^&*()_+' + code).split("")).join("");
   return code.substring(0, l);
}

/**
 * 发送验证码
 */
const sendCode = () => {
   code.value = generateCode();
   console.log(code.value);
   ObtainedCode.value = true;
}

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


/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

</script>

<template>
   <bg/>
   <n-flex justify="center">
      <div class="w-120 bg-white p-8 m-t-16 b-rd-4 flex justify-center flex-col ">
         <div>
            <div class="text-center font-800 font-size-1.5em" style="font-family: Inter serif;">忘记密码?</div>
            <div class="text-center m-b-4">
               <span
                  class="font-size-.9em color-#8c98a4">输入您的注册邮箱，我们为您发送一封包含验证码的邮件，在此输入以重置您的密码</span>
            </div>
         </div>
         <n-spin :show="loading">
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
                  <div class="flex w-100% bg-#2080f0 b-rd-1">
                     <n-input
                        v-model:value="model.code"
                        :disabled="!code"
                        class="flex-auto"
                        placeholder="请正确输入您收到的验证码"
                        @input="handlePasswordInput"
                        @keydown.enter.prevent
                     />
                     <n-button :disabled="ObtainedCode || !emailValidated" type="info" @click="sendCode">
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
                     注册
                  </n-button>
               </n-form-item>
            </n-form>
         </n-spin>
         <div>
            <n-button :bordered="false" class="no-border-btn color-#8c98a4" href="/login" tag="a">
               <template #icon>
                  <ChevronBackOutline/>
               </template>
               前去登录
            </n-button>
         </div>

      </div>
   </n-flex>
</template>

<style scoped>
@import "/src/styles/form-item-input.css";
@import "src/styles/no-border-btn.css";
</style>
