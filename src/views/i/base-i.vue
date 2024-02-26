<script setup>
import {h, ref} from "vue";
import {NIcon, NLayout, NLayoutFooter, NLayoutHeader, NLayoutSider, NMenu, NScrollbar} from 'naive-ui';

import {
   Book as BookManagerIcon,
   BookOpen as BookInfoManagerIcon,
   BookReader as DebitManagerIcon,
   UsersCog as UserManagerIcon
} from "@vicons/fa";
import {OperationsRecord as LogManager} from "@vicons/carbon";
import {RouterLink} from "vue-router";
import {generateProps} from "@/utils/generate.js";
import {MANAGER_DEBIT, MANAGER_USER} from "@/router/RouterValue.js";
import {expandIcon, renderIcon} from "@/utils/IconGenerator.js";

const collapsed = ref(true);
const menuStyle = `font-size: 1.2rem`;

const menuOptions = [
   {
      label: () =>
         h(
            RouterLink,
            generateProps(MANAGER_DEBIT.name),
            {default: () => '借阅记录'}
         ),
      key: 'm-debit',
      icon: renderIcon(DebitManagerIcon)
   },
   {
      label: () =>
         h(
            RouterLink,
            generateProps(MANAGER_USER.name),
            {default: () => '书籍管理'}
         )
      ,
      key: 'm-book',
      icon: renderIcon(BookManagerIcon)
   },
   {
      label: '书籍信息管理',
      key: 'm-book-info',
      icon: renderIcon(BookInfoManagerIcon)
   },
   {
      label: () =>
         h(
            RouterLink,
            generateProps(MANAGER_USER.name),
            {default: () => '用户管理'}
         )
      ,
      key: 'm-user',
      icon: renderIcon(UserManagerIcon)
   },
   {
      label: '系统日志',
      key: 'log',
      icon: renderIcon(LogManager)
   }
]


</script>

<template>
   <n-layout style="height: 100vh">
      <n-layout-header bordered style="height: 48px;">
         天堂桥
         <a href="/login">
            <button>login</button>
         </a>
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 48px; bottom: 48px">
         <n-layout-sider
            :collapsed="collapsed"
            :collapsed-width="64"
            :width="240"
            bordered
            collapse-mode="width"
            show-trigger
            @collapse="collapsed = true"
            @expand="collapsed = false"
         >
            <n-scrollbar>
               <n-menu
                  :collapsed="collapsed"
                  :collapsed-icon-size="22"
                  :collapsed-width="64"
                  :expand-icon="expandIcon"
                  :options="menuOptions"
                  :style="menuStyle"
               />
            </n-scrollbar>
         </n-layout-sider>
         <n-layout :native-scrollbar="false" content-style="padding: 8px;">
            <router-view v-slot="{ Component}">
               <component :is="Component" />
            </router-view>
         </n-layout>
      </n-layout>
      <n-layout-footer
         bordered
         position="absolute"
         style="height: 48px;"
      >
         地府路
      </n-layout-footer>
   </n-layout>
</template>

<style scoped>

</style>

