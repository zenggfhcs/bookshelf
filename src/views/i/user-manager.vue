<script setup>
import {h, nextTick, onMounted, ref} from 'vue'
import {NDataTable, NDropdown, useMessage} from 'naive-ui'
import {Service} from "@/api/index.js";

onMounted(() => { // 加载数据
   find();
})

const find = () => {
   const filter = {
      page: {
         start: 0,
         end: 10
      }
   }
   const entity = {

   }
   Service.Users.list(entity, filter).then(res => {
      console.log(res);
   });
}

const data = []


const showDropdown = ref(false)

const colsReactive = [
   {
      title: 'No.',
      key: 'no'
   },
   {
      title: 'Title',
      key: 'title'
   },
   {
      title: 'Length',
      key: 'length'
   }
]
const cols = colsReactive;


const pagination = {
   pageSize: 10
}


/* ============================ 右键快捷菜单 ============================ */
/**
 * 快捷菜单内容
 */
const options = [
   {
      label: '编辑',
      key: 'edit'
   },
   {
      label: () => h('span', {style: {color: 'red'}}, '删除'),
      key: 'delete'
   }
]

/**
 * 快捷菜单位置 x
 */
const x = ref(0);

/**
 * 快捷菜单位子 y
 */
const y = ref(0);

/**
 * 选择之后隐藏菜单
 */
const handleSelect = () => {
   showDropdown.value = false
}

/**
 * 点击菜单外部之后隐藏菜单
 */
const onClickOutSide = () => {
   showDropdown.value = false
}

const message = useMessage()
const rowProps = (row) => {
   return {
      onContextmenu: (e) => {
         message.info(JSON.stringify(row, null, 2))
         e.preventDefault()
         showDropdown.value = false
         nextTick().then(() => {
            showDropdown.value = true
            x.value = e.clientX
            y.value = e.clientY
         })
      }
   }
}
/* ============================ 右键快捷菜单 ============================ */
</script>

<template>
   <n-data-table
      :columns="cols"
      :data="data"
      :pagination="pagination"
      :row-props="rowProps"
   />
   <n-dropdown
      :on-clickoutside="onClickOutSide"
      :options="options"
      :show="showDropdown"
      :x="x"
      :y="y"
      placement="bottom-start"
      trigger="manual"
      @select="handleSelect"
   />
</template>

<style scoped>
* {
   padding: 0;
}
</style>