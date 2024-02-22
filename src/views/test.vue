<template>
   <n-space vertical>
      <n-space>
         <n-switch v-model:value="inverted"/>
         inverted
      </n-space>
      <n-layout>
         <n-layout-header :inverted="inverted" bordered>
            Header Header Header
            <n-menu :inverted="inverted" :options="menuOptions" mode="horizontal"/>
         </n-layout-header>
         <n-layout has-sider>
            <n-layout-sider
               :collapsed-width="64"
               :inverted="inverted"
               :native-scrollbar="false"
               :width="240"
               bordered
               collapse-mode="width"
               show-trigger
               style="max-height: 320px"
            >
               <n-menu
                  :collapsed-icon-size="22"
                  :collapsed-width="64"
                  :inverted="inverted"
                  :options="menuOptions"
               />
            </n-layout-sider>
            <n-layout style="max-height: 320px"/>
         </n-layout>
         <n-layout-footer :inverted="inverted" bordered>
            Footer Footer Footer
         </n-layout-footer>
      </n-layout>
   </n-space>
</template>

<script setup>
import {h, ref} from "vue";
import {NIcon, NLayout, NLayoutFooter, NLayoutHeader, NLayoutSider, NMenu, NSwitch} from 'naive-ui';

import {BookOutline as BookIcon, PersonOutline as PersonIcon, WineOutline as WineIcon} from "@vicons/ionicons5";

import {BookReader} from "@vicons/fa"

function renderIcon(icon) {
   return () => h(NIcon, null, {default: () => h(icon)});
}

const menuOptions = [
   {
      label: "且听风吟",
      key: "hear-the-wind-sing",
      icon: renderIcon(BookReader)
   },
   {
      label: "1973年的弹珠玩具",
      key: "pinball-1973",
      icon: renderIcon(BookIcon),
      disabled: true,
      children: [
         {
            label: "鼠",
            key: "rat"
         }
      ]
   },
   {
      label: "寻羊冒险记",
      key: "a-wild-sheep-chase",
      disabled: true,
      icon: renderIcon(BookIcon)
   },
   {
      label: "舞，舞，舞",
      key: "dance-dance-dance",
      icon: renderIcon(BookIcon),
      children: [
         {
            type: "group",
            label: "人物",
            key: "people",
            children: [
               {
                  label: "叙事者",
                  key: "narrator",
                  icon: renderIcon(PersonIcon)
               },
               {
                  label: "羊男",
                  key: "sheep-man",
                  icon: renderIcon(PersonIcon)
               }
            ]
         },
         {
            label: "饮品",
            key: "beverage",
            icon: renderIcon(WineIcon),
            children: [
               {
                  label: "威士忌",
                  key: "whisky"
               }
            ]
         },
         {
            label: "食物",
            key: "food",
            children: [
               {
                  label: "三明治",
                  key: "sandwich"
               }
            ]
         },
         {
            label: "过去增多，未来减少",
            key: "the-past-increases-the-future-recedes"
         }
      ]
   }
];
const inverted = ref(false);
</script>