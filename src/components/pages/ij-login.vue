<style scoped>
.i-btn {
   width: 46%;
   margin: 2%;
}

.i-input {
   font-size: 1.2rem;
}
</style>
<template>
   <n-form ref="formRef" :model="model" :rules="rules" style="width: 20rem">
      <n-form-item path="name" size="large" label="user-number">
         <n-input
            v-model:value="model.name"
            :maxlength="length.max"
            @keydown.enter.prevent
            placeholder="账号"
            class="i-input"
         />
      </n-form-item>
      <n-form-item path="password" size="large" label="password">
         <n-input
            v-model:value="model.password"
            :maxlength="length.max"
            type="password"
            @keydown.enter.prevent
            placeholder="密码"
            class="i-input"
         />
      </n-form-item>
         <n-button type="primary" @click="register" class="i-btn">
            register
         </n-button>
         <n-button type="primary" @click="login" class="i-btn">
            login
         </n-button>
   </n-form>

   <pre>{{ JSON.stringify(model, null, 2) }}</pre>
</template>

<script setup>
import {ref} from "vue";
import {
   NForm,
   NInput,
   NFormItem,
   NButton
} from "naive-ui";
import {
   useMessage
} from "naive-ui";
import {debounce} from "@/static/js/utils/debounce.js";


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
            }
            else if (value.length < length.min) {
               return new Error("user-number 长度应为 7-19")
            }
            else if (!/\d+/.test(value)) {
               return new Error("这不是一个有效的 user-number");
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
            }
            else if (value.length < length.min) {
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


const userLogin = (user) => {       // 登录
   console.log(user);
}


const register = (e) => {
   e.preventDefault();                       // 父默认方法
}


const switchForm = () => {
   console.log(switchForm);
}
</script>