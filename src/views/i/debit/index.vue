<script setup>
import {Service} from "@/api/index.js";
import {ResponseCode} from "@/constant/response-code.js";
import Write from "@/icons/Write.vue";
import {checkLoginState} from "@/utils/check-login-state.js";
import {gCol} from "@/utils/generate.js";
import {Search} from "@vicons/ionicons5";
import {
   NButton,
   NDataTable,
   NDivider,
   NDropdown,
   NFlex,
   NForm,
   NFormItem,
   NGi,
   NGrid,
   NIcon,
   NInput,
   NLayout,
   NLayoutFooter,
   NPagination,
   NPopover,
   NSpin,
   useMessage
} from 'naive-ui'
import {h, nextTick, onMounted, reactive, ref} from 'vue'

//#region all

onMounted(() => { // 加载数据
   checkLoginState();
   find();
})

const message = useMessage();

const messageOptions = {
   duration: 10000
}

const loading = ref(false);

const filter = {
   page: {
      start: 0,
      end: 10
   }
}

const entity = {}

let formData = [];

const pageCount = ref(0);

const setPageCount = (count) => {
   pageCount.value = Math.ceil(count / pagination.pageSize);
}

const find = () => {
   loading.value = true;
   Service.Debits.list(entity, filter)
      .then(res => {
         const data = res.data;
         if (!data || data?.code !== ResponseCode.SUCCESS) {
            message.error(data?.msg);
            return;
         }
         // console.log(data)
         setPageCount(data?.data?.count);
         formData = data?.data?.data;
      })
      .catch(err => {
         message.error(err.message);
      })
      .finally(() => {
         loading.value = false;
      });
}

const showDropdown = ref(false)

const cols = [
   gCol('id', 'id'),
   gCol('书籍', 'bookName'),
   gCol('借阅人', 'borrower'),
   gCol('借阅时间', 'borrowTime'),
   gCol('应还时间', 'returnDeadline'),
   gCol('状态', 'state'),
   gCol('备注', 'remark'),
]


const paginationReactive = reactive({
   page: 1,
   pageSize: 10,
   showSizePicker: true,
   pageSizes: [{label: '10 每页', value: 10,}, {label: '15 每页', value: 15,}, {
      label: '20 每页',
      value: 20,
   }, {label: '30 每页', value: 30,}, {label: '40 每页', value: 40,}, {label: '50 每页', value: 50,},],
   showQuickJumper: true,
   onUpdatePageSize: (pageSize) => {
      paginationReactive.pageSize = pageSize;
      paginationReactive.onUpdatePage(1);
   },
   onUpdatePage: (page) => {
      paginationReactive.page = page;
      filter.page.start = (page - 1) * paginationReactive.pageSize;
      filter.page.end = paginationReactive.pageSize;
      find();
   }
});
const pagination = paginationReactive;


//#region 右键快捷菜单
/**
 * 快捷菜单内容
 */
const options = [
   {
      label: () => h('span', {style: {color: 'green'}}, '标为已归还'),
      key: 'return'
   }, {
      label: () => h('span', {style: {color: 'red'}}, '催还'),
      key: 'urge'
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
//#endregion


//#endregion

</script>

<template class="relative">
   <n-layout :native-scrollbar="false" class="absolute top-0 bottom-3em" content-style="padding: 1em;">
      <n-spin :show="loading">
         <n-data-table
            :columns="cols"
            :data="formData"
            :row-props="rowProps"
            :single-line="false"
         />
      </n-spin>
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
   </n-layout>
   <n-layout-footer class="h-3em" position="absolute">
      <n-flex :size="0" class="items-center" justify="right">
         <n-pagination
            v-model:page="pagination.page"
            v-model:page-size="pagination.pageSize"
            v-model:page-sizes="pagination.pageSizes"
            :on-update-page="pagination.onUpdatePage"
            :on-update-page-size="pagination.onUpdatePageSize"
            :page-count="pageCount"
            show-quick-jumper
            show-size-picker
            size="large"
         >
            <template #prefix="{ pageCount}">
               共 {{ pageCount }} 项
            </template>
            <template #suffix="{}">
               页
            </template>
         </n-pagination>
         <n-popover trigger="click">
            <template #trigger>
               <n-button class="m-.3em h-2.4em w-2.4em b-rd-50%">
                  <template #icon>
                     <n-icon>
                        <write/>
                     </n-icon>
                  </template>
               </n-button>
            </template>
            <n-form label-placement="left">
               <span class="font-size-1.2em font-800">精确查询</span>
               <n-divider class="m-1!"/>
               <n-grid :cols="4" x-gap="12">
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>

               </n-grid>
               <span class="font-size-1.2em font-800">模糊查询</span>
               <n-divider class="m-1!"/>
               <n-grid :cols="4" x-gap="12">
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="label">
                        <n-input/>
                     </n-form-item>
                  </n-gi>
               </n-grid>
            </n-form>
         </n-popover>
         <n-button class="m-.3em h-2.4em w-2.4em b-rd-50%">
            <n-icon>
               <search/>
            </n-icon>
         </n-button>
      </n-flex>
   </n-layout-footer>
</template>

<style scoped>
* {
   padding: 0;
}

.n-menu .n-menu-item-content .n-menu-item-content-header a {
   font-weight: 800 !important;
}

</style>
