<script setup>
import {ref} from "vue";
import {NButton, NFlex, NForm, NFormItem, NInput, useMessage} from "naive-ui";
import {debounce} from "@/utils/debounce.js";
import {LOGIN_FORM} from "@/constant/Rules.js";
import {Service} from "@/api/index.js";

const formRef = ref(null);
const message = useMessage();
const model = ref({
   email: null,
   authenticationString: null,
});


/**
 * 登录
 * @param e event
 */
const login = debounce((e) => {
   e.preventDefault();                       // 父默认方法
   formRef.value?.validate((errors) => {     // 验证表单
      if (!errors) {                         // 验证通过
         Service.Users.login(model.value)
            .then(res => {
               const data = res.data;
               if (data?.code !== 200) {
                  message.error(data?.msg);
               }
            }).catch(err => {
              message.error(err.message);
         });
      } else {
         message.error("login error");
      }
   });
}, 555);


</script>

<template>
   <n-flex justify="center">
      <n-form id="login-form" ref="formRef" :model="model" :rules="LOGIN_FORM"
              class="i-form">
         <n-form-item label="user-id" path="name" size="large">
            <n-input
               v-model:value="model.name"
               :minlength="5"
               :maxlength="32"
               placeholder="账号"
               @keydown.enter.prevent
            />
         </n-form-item>
         <n-form-item label="password" path="password" size="large">
            <n-input
               v-model:value="model.password"
               :minlength="7"
               :maxlength="17"
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

<style scoped>
.i-form {
   width: 17em;
}
</style>
