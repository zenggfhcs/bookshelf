<template>
   <n-layout style="height: 100vh">
      <n-layout-header bordered style="height: 64px; padding: 24px">
         天堂桥
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px">
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
                  :render-icon="renderMenuIcon"
                  :render-label="renderMenuLabel"
                  :style="manuStyle"
               />
            </n-scrollbar>
         </n-layout-sider>
         <n-layout :native-scrollbar="false" content-style="padding: 24px;">
            <n-layout-sider>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
               <n-h2>平山道</n-h2>
            </n-layout-sider>
         </n-layout>
      </n-layout>
      <n-layout-footer
         bordered
         position="absolute"
         style="height: 64px; padding: 24px"
      >
         地府路
      </n-layout-footer>
   </n-layout>
</template>

<script lang="ts" setup>
import {h, ref} from "vue";
import {MenuOption, NH2, NIcon, NLayout, NLayoutFooter, NLayoutSider, NMenu, NScrollbar} from 'naive-ui';

const collapsed = ref(true);
const manuStyle = `font-size: 1.5rem`;

const menuOptions: MenuOption[] = [
   {
      label: '借阅管理',
      key: 'm-debit',
      children: [
         {
            label: '查看',
            key: 'debit-get'
         }
      ]
   },
   {
      label: '书籍管理',
      key: 'm-book',
      children: [
         {
            label: '书籍查询',
            key: 'book-search'
         },
         {
            label: '书籍入库',
            key: 'book-create'
         },
         {
            label: '书籍出库',
            key: 'book-delete'
         },
         {
            label: '书籍更新',
            key: 'book-update'
         },
      ]
   },
   {
      label: '书籍信息管理',
      key: 'm-book-info',
      children: [
         {
            label: '书籍信息查询',
            key: 'book-info-search'
         },
         {
            label: '添加书籍信息',
            key: 'book-info-create'
         },
         {
            label: '删除书籍信息',
            key: 'book-info-delete'
         },
         {
            label: '更新书籍信息',
            key: 'book-info-update'
         },
      ]
   },
   {
      label: '用户管理',
      key: 'm-user',
      children: [
         {
            label: '查询用户',
            key: 'user-search'
         },
         {
            label: '添加用户',
            key: 'user-create'
         },
         {
            label: '删除用户',
            key: 'user-delete'
         },
         {
            label: '更新用户',
            key: 'user-update'
         },
      ]
   },
   {
      label: '系统日志',
      key: 'log',
      children: [
         {
            label: '查看',
            key: 'debit-log'
         },
         {
            label: '变更',
            key: 'update-log',
         },
         {
            label: '删除',
            key: 'delete-log',
         },
         {
            label: 'error',
            key: 'error-log',
         }
      ]
   }
]

/**
 *
 * @param option
 */
function renderMenuLabel(option: MenuOption) {
   if ('href' in option) {
      return h(
         'a',
         {href: option.href, target: '_blank'},
         option.label as string
      )
   }
   return option.label as string
}

// function renderIcon(icon: Component) {
//    return () => h(NIcon, null, {default: () => h(icon)})
// }

/**
 *
 * @param option
 */
function renderMenuIcon(option: MenuOption) {
   // 渲染图标占位符以保持缩进
   if (option.key === 'sheep-man') return true
   // 返回 falsy 值，不再渲染图标及占位符
   if (option.key === 'food') return null
   return h(NIcon, null, {default: () => h(null)})
}

function expandIcon() {
   return h(NIcon, null, {default: () => h(null)})
}

</script>

<style scoped>
</style>