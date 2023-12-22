<template>
   <i-header></i-header>
   <i-sidebar></i-sidebar>
   <i-main>
   </i-main>
   <i-form>
      <i-btn type="success" wide="wide" value="按钮"/>
      <i-btn type="worn" wide="wide" value="按钮"/>
      <i-btn type="error" wide="wide" value="按钮"/>
      <br>
      <br>
      <i-input/>
   </i-form>


   <i-input-pwd/>
</template>

<script setup>
import IHeader from "@/components/container/i-header.vue";
import ISidebar from "@/components/container/i-sideber.vue";
import IMain from "@/components/container/i-main.vue";
import IBtn from "@/components/general/i-btn.vue";
import IInput from "@/components/general/i-input.vue";
import IForm from "@/components/general/i-form.vue";
import IInputPwd from "@/components/general/i-input-pwd.vue";
import {BaseService} from "@/static/js/service/BaseService.js";
import {User} from "@/static/js/model/User.js";
import {Filter} from "@/static/js/model/Filter.js";

const user = new User();
user.name = 1;
</script>
<style scoped>
</style>