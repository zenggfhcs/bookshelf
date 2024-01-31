<style scoped>
.i-form {
   width: 17em;
}
</style>

<template>
   <n-flex justify="center">
      <n-form id="login-form" ref="formRef" :model="model" :rules="rules"
              class="i-form">
         <n-form-item label="user-id" path="name" size="large">
            <n-input
               v-model:value="model.name"
               :maxlength="length.max"
               placeholder="账号"
               @keydown.enter.prevent
            />
         </n-form-item>
         <n-form-item label="password" path="password" size="large">
            <n-input
               v-model:value="model.password"
               :maxlength="length.max"
               placeholder="密码"
               type="password"
               @keydown.enter.prevent
            />
         </n-form-item>
         <n-flex justify="space-between">
            <a>
               <n-button type="tertiary">
                  ⬅register
               </n-button>
            </a>
            <n-button type="primary" @click="login">
               login
            </n-button>
         </n-flex>
      </n-form>
   </n-flex>
</template>

<script setup>
import {ref} from "vue";
import {NButton, NFlex, NForm, NFormItem, NInput, useMessage} from "naive-ui";
import {debounce} from "@/utils/debounce.js";
import {REG_USER_ID} from "@/utils/reg-string.js";


const formRef = ref(null);
const message = useMessage();
const modelRef = ref({
   name: null,
   password: null,
});
const model = modelRef;

const rules = {
   name: [
      {
         required: true,               // 字段必填
         validator(rule, value) {      // 自定义检查
            if (value === null || value.length === 0) {
               return new Error("请输入账号");
            } else if (value.length < length.min) {
               return new Error("user-id 长度应为 7-19")
            } else if (!(REG_USER_ID.test(value))) {
               return new Error("这不是一个有效的 user-id");
            }
         },
      }
   ],
   password: [
      {
         required: true,
         validator(rule, value) {
            if (value === null || value.length === 0) {
               return new Error("请输入密码");
            } else if (value.length < length.min) {
               return new Error("password 长度应为 7-19")
            }
         },
      }
   ]
};

const length = {
   min: 7,
   max: 19
}

/**
 * 登录
 * @param e event
 */
const login = debounce((e) => {
   e.preventDefault();                       // 父默认方法
   formRef.value?.validate((errors) => {     // 验证表单
      if (!errors) {                         // 验证通过
         // message.success("");
         userLogin();                        // 进行登录
      } else {
         message.error("login error");
      }
   });
}, 555);

const validate = (message, messageContent, form, then) => {
   form?.value?.validate((errors) => {
      if (!errors) {
         then();
      } else {
         message?.error(messageContent);
      }
   });
};


const userLogin = (user) => {       // 登录
   console.log(user);
}
</script>