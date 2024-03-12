<script setup>
import {J_HOME} from "@/router/RouterValue.js";
import {checkLoginState} from "@/utils/check-login-state.js";
import {expandIcon, gProps, renderIcon} from "@/utils/generate.js";
import {Home} from "@vicons/fa";
import {NLayout, NLayoutHeader, NMenu} from 'naive-ui'
import {h, onMounted} from "vue";
import {RouterLink} from "vue-router";


onMounted(() => {
   checkLoginState();
   // localStorage.clear();
})

const menuOptions = [
   {
      label: () =>
         h(
            RouterLink,
            gProps(J_HOME.name),
            {default: () => '首页'}
         ),
      key: 'm-debit',
      icon: renderIcon(Home)
   },
]
</script>

<template>
   <n-layout position="absolute">
      <n-layout-header>
         <n-menu
            :collapsed-icon-size="16"
            :expand-icon="expandIcon"
            :options="menuOptions"
            class="font-size-5"
            mode="horizontal"
         />
      </n-layout-header>
      <n-layout :native-scrollbar="false" content-style="padding: 8px;" position="absolute"
                style="top: 3em; bottom: 0; background-color: #00bd7e">
      </n-layout>

   </n-layout>
</template>

<style scoped>

.n-layout-header {
   padding: calc((3em - 42px) / 2) 0;
   height: 3em;
}

</style>