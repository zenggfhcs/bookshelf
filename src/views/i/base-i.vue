<script setup>
import {h, onMounted, ref} from "vue";
import {
   NButton,
   NFlex,
   NForm,
   NLayout,
   NLayoutFooter,
   NLayoutHeader,
   NLayoutSider,
   NMenu,
   NPopover,
   NScrollbar
} from 'naive-ui';

import {
   Book as BookManagerIcon,
   BookOpen as BookInfoManagerIcon,
   BookReader as DebitManagerIcon,
   UsersCog as UserManagerIcon
} from "@vicons/fa";
import {OperationsRecord as LogManager} from "@vicons/carbon";
import {RouterLink} from "vue-router";
import {expandIcon, generateProps, renderIcon} from "@/utils/generate.js";
import {MANAGER_BOOK, MANAGER_BOOK_INFO, MANAGER_DEBIT, MANAGER_USER} from "@/router/RouterValue.js";
import BookBrain from "@/icons/book-brain.vue";

const collapsed = ref(false);

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
            generateProps(MANAGER_BOOK.name),
            {default: () => '书籍管理'}
         ),
      key: 'm-book',
      icon: renderIcon(BookManagerIcon)
   },
   {
      label: () =>
         h(
            RouterLink,
            generateProps(MANAGER_BOOK_INFO.name),
            {default: () => '书籍信息管理'}
         ),
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

const leave = ref(false);

onMounted(() => {
   //#region 监听侧边栏动作，展开时执行动画
   // document.querySelector('.n-layout-toggle-button').onclick = () => {
   //    if (collapsed.value === false) {
   //       // add
   //       document.querySelector('#logo-text').classList.add('logo-text-animation')
   //    }
   //    else {
   //       // remove
   //       document.querySelector('#logo-text').classList.remove('logo-text-animation')
   //    }
   // }
   //#endregion
})

</script>

<template>
   <n-layout class="h-100vh" has-sider>
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
         <n-layout-header bordered class="h-3em">
            <n-flex :size="0" :wrap="false">
               <a href="/manage">
                  <div class="logo">
                     <BookBrain/>
                  </div>
               </a>
               <div class="logo-text-box">
                  <div id="logo-text" class="logo-text">
                     BookBrain
                  </div>
               </div>

            </n-flex>
         </n-layout-header>
         <n-layout class="absolute top-3em bottom-3em left-0 right-0">

            <n-scrollbar>
               <n-menu
                  :collapsed="collapsed"
                  :collapsed-icon-size="22"
                  :collapsed-width="64"
                  :expand-icon="expandIcon"
                  :options="menuOptions"
                  class="font-size-1.2rem font-800"
               />
            </n-scrollbar>
         </n-layout>
         <n-layout-footer
            bordered
            class="h-3em overflow-hidden"
            position="absolute"
         >
            <n-flex :wrap="false" class="h-full over-hidden">
               <div class="text-center w-16 school">gzucm</div>
               <div>
                  @yunxia
               </div>
            </n-flex>

         </n-layout-footer>
      </n-layout-sider>
      <n-layout>
         <n-layout-header bordered class="h-3em">

            <n-flex :wrap="false" class="mr4" justify="end">
               <n-popover class="p-0" trigger="click">
                  <template #trigger>
                     <n-button class="m-.2em h-3em w-3em b-rd-50% p-0 b-0 cursor-pointer">
                        <span class="font-800 font-size-1em"
                              style="font-family: inter,sans-serif;">ME</span>
                     </n-button>

                  </template>
                  <n-form label-placement="left">
                     <n-button :bordered="false" class="no-border-btn">
                        登出
                     </n-button>
                  </n-form>
               </n-popover>

            </n-flex>
         </n-layout-header>
         <n-layout class=" absolute top-3em bottom-0 left-0 right-0">
            <router-view v-slot="{ Component}">
               <component :is="Component"/>
            </router-view>
         </n-layout>

      </n-layout>
   </n-layout>
</template>

<style scoped>
@import "src/styles/no-border-btn.css";

#app {
}

.n-layout-footer {
   font-size: 16px;
}

.logo {
   flex: 0 0 auto;
   width: 4em;
   height: 3em;
   padding: calc((3em - 40px) / 2) calc((4em - 40px) / 2);
}

.logo-text-box {
   flex: 1 1 auto;
   height: 3em;
   line-height: 3em;
   color: black;
}

.logo-text {
   font-size: 1.8rem;
   letter-spacing: .125em;
   font-weight: bolder;
   text-shadow: 2px 2px 4px rgba(0, 0, 0, .8);
   font-family: "Chinese Quotes", serif;
}

.school {
   flex: 0 0 auto;
}
</style>

