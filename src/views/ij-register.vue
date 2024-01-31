<script setup>
import {NButton, NFlex, NForm, NFormItem, NInput, useMessage} from "naive-ui";
import {debounce} from "@/utils/debounce.js";


const message = useMessage();

/**
 * 登录
 * @param e event
 */
const register = debounce((e) => {
   e.preventDefault();                          // 父默认方法
   validate();
}, 555);

const validate = () => {

};

const userRegister = () => {

};
</script>

<template>
   <n-flex>
      <n-form id="register-form" class="i-form">
         <n-form-item label="email" size="large">
            <n-input placeholder="邮箱"
                     type="text"
            />
         </n-form-item>
         <n-form-item label="email" size="large">
            <n-input placeholder="验证码"
                     type="text"
            />
         </n-form-item>
         <n-flex justify="space-between">
            <a>
               <n-button type="tertiary">
                  ⬅login
               </n-button>
            </a>
            <n-button type="primary" @click="register">
               register
            </n-button>
         </n-flex>
      </n-form>
   </n-flex>
</template>

<style scoped>

.i-input {
   font-size: 1.2rem;
}

.i-form {
   width: 17em;
}


</style>