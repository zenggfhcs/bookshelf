<script setup>
import {NLayout, NLayoutHeader, NMenu} from 'naive-ui'
import {h} from "vue";
import {RouterLink} from "vue-router";
import {expandIcon, generateProps, renderIcon} from "@/utils/generate.js";
import {HOME} from "@/router/RouterValue.js";
import {Home} from "@vicons/fa";
import Test from "@/views/test.vue";

const menuOptions = [
   {
      label: () =>
         h(
            RouterLink,
            generateProps(HOME.name),
            {default: () => '首页'}
         ),
      key: 'm-debit',
      icon: renderIcon(Home)
   }, {
      label: () =>
         h(
            RouterLink,
            generateProps(HOME.name),
            {default: () => '首页'}
         ),
      key: 'm-debit',
      icon: renderIcon(Home)
   }, {
      label: () =>
         h(
            RouterLink,
            generateProps(HOME.name),
            {default: () => '首页'}
         ),
      key: 'm-debit',
      icon: renderIcon(Home)
   },
]
</script>

<template>
   <n-layout style="height: 100vh;">
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
         <test/>
      </n-layout>

   </n-layout>
</template>

<style scoped>
.n-layout-header {
   padding: calc((3em - 42px) / 2) 0;
   height: 3em;
}
</style>