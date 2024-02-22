<script setup>
import {h, nextTick, onMounted, ref} from 'vue'
import {NDataTable, NDropdown, useMessage} from 'naive-ui'

onMounted(() => { // 加载数据

})

const data = [
   {no: 1, title: 'Hello', length: '3:21'},
   {no: 2, title: 'Roll with It', length: '3:59'},
   {no: 3, title: 'Wonder wall', length: '4:18'},
   {no: 4, title: "Don't Look Back in Anger", length: '4:48'},
   {no: 5, title: 'Hey Now!', length: '5:41'},
   {no: 6, title: 'Untitled', length: '0:44'},
   {no: 7, title: 'Some Might Say', length: '5:29'},
   {no: 8, title: 'Cast No Shadow', length: '4:51'},

   {no: 9, title: "She's Electric", length: '3:40'},
   {no: 10, title: 'Monitoring Glory', length: '5:03'},
   {no: 11, title: 'Untitled', length: '0:39'}, {no: 9, title: "She's Electric", length: '3:40'},
   {no: 10, title: 'Monitoring Glory', length: '5:03'},
   {no: 11, title: 'Untitled', length: '0:39'},
   {no: 12, title: 'Champagne Supernova', length: '7:27'}
]


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
      :row-props="rowProps"
      :pagination="pagination"
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