<script setup>
import {Service} from "@/api/index.js";
import {ResponseCode} from "@/constant/response-code.js";

import {sleep} from "@/utils/sleep.js";
import {useMessage} from "naive-ui";
import {onMounted} from "vue";


const query = defineProps({
   token: String
})
onMounted(() => {
   start();
})

const message = useMessage();

const msgReactive = message.create("", {
   duration: 10000
})

const updateMessage = (type, content) => {
   msgReactive.type = type;
   msgReactive.content = content;
}


const start = async () => {

   updateMessage("success", "连接成功");
   await sleep();

   updateMessage("info", "发起验证");
   await sleep();

   updateMessage("loading", "验证中");
   await sleep();

   Service.Users.verifyRegister(query.token)
      .then(res => {
         const data = res.data;
         if (data?.code !== ResponseCode.SUCCESS) {
            updateMessage("error", "VERIFIED_FAILED: 验证失败，请联系管理员(1635276938@qq.com)");
         } else {
            updateMessage("success", "验证通过");
         }
      })
      .catch(err => {
         updateMessage("error", err.message);
      })
      .finally(() => {
      });

}
</script>

<template>

</template>

<style scoped>

</style>