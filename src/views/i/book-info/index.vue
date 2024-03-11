<script setup>
import {Service} from "@/api/index.js";
import {transType} from "@/constant/pre-defined/log.js";
import {mapOperations} from "@/constant/pre-defined/map.js";
import {ResponseCode} from "@/constant/response-code.js";
import Write from "@/icons/Write.vue";
import router from "@/router/Router.js";
import {checkLoginState} from "@/utils/check-login-state.js";
import {debounce} from "@/utils/debounce.js";
import {timestampToDateTimeString} from "@/utils/index.js";
import {inputValidator} from "@/utils/validator.js";
import {AddCircle, Search} from "@vicons/ionicons5";
import {
   NBackTop,
   NButton,
   NDataTable,
   NDatePicker,
   NDivider,
   NFlex,
   NForm,
   NFormItem,
   NIcon,
   NInput,
   NLayout,
   NLayoutFooter,
   NLayoutHeader,
   NPagination,
   NPopover,
   NSpin,
   NTag,
   useMessage
} from "naive-ui"
import {h, onMounted, reactive, ref} from "vue"

//#region entity
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const entity = reactive({
   id: '',
   name: '',
});
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region message
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const message = useMessage();

const messageOptions = {
   duration: 10000
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region 数据表信息
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

let tableData = [];

const loadingFind = ref(false);
const rowProps = (row) => {
   return {
      onDblclick: (e) => {
         e.preventDefault();
         router.push(`/manage/publishers/${row?.id}`);
      }
   }
}

//#region find
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const timestamp = reactive({
   creationTime: null,
   lastUpdatedTime: null,
})

const filter = reactive({
   page: {
      start: 0,
      end: 10
   },
   creationTime: {
      start: null,
      end: null,
   },
   lastUpdatedTime: {
      start: null,
      end: null,
   },
});

const pre_find = () => {
   // todo
   filter.creationTime.start = timestampToDateTimeString(timestamp.creationTime?.[0]);
   filter.creationTime.end = timestampToDateTimeString(timestamp.creationTime?.[1]);

   filter.lastUpdatedTime.start = timestampToDateTimeString(timestamp.lastUpdatedTime?.[0]);
   filter.lastUpdatedTime.end = timestampToDateTimeString(timestamp.lastUpdatedTime?.[1]);
}

const find = () => {
   loadingFind.value = true;

   pre_find();

   Service.BookInfos.list(entity, filter)
      .then(res => {
         const data = res.data;
         if (!data || data?.code !== ResponseCode.SUCCESS) {
            message.error(data?.msg, messageOptions);
            return;
         }
         itemCount.value = data?.data?.count;
         tableData = data?.data?.data;
      })
      .catch(err => {
         message.error(err.message, messageOptions);
      })
      .finally(() => {
         loadingFind.value = false;
      });
};

const clickFind = debounce(e => {
   e.preventDefault();
   find();
})
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region 分页组件
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const ext = {
   id: {maxWidth: 77, width: 50},
   type: {
      render: (row) => {
         return h(
            NTag,
            {
               style: {
                  marginRight: '.3em'
               },
               type: transType(row?.type),
               bordered: false
            },
            {
               default: () => mapOperations.getByValue(row?.type)
            }
         );
      }
   },
}

const cols = [
   {
      title: "id",
      key: "id",
      // 可拖动
      resizable: true,
      // 溢出省略
      ellipsis: {
         tooltip: true
      },
      width: 100,
      minWidth: 50,
      render: (row) => h(
         NTag,
         {
            type: "info",
            bordered: false,
         },
         {
            default: () => row?.id
         }
      ),
   },
   {
      title: "名称",
      key: "bookName",
      // 可拖动
      resizable: true,
      // 溢出省略
      ellipsis: {
         tooltip: true
      },
   },
   {
      title: "作者",
      key: "author",
      // 可拖动
      resizable: true,
      // 溢出省略
      ellipsis: {
         tooltip: true
      },
   },
   {
      title: "类型",
      key: "bookType",
      // 可拖动
      resizable: true,
      // 溢出省略
      ellipsis: {
         tooltip: true
      },
   },
   {
      title: "正文语种",
      key: "lang",
      // 可拖动
      resizable: true,
      // 溢出省略
      ellipsis: {
         tooltip: true
      },
   },
   {
      title: "关键字",
      key: "keyword",
      // 可拖动
      resizable: true,
      // 溢出省略
      ellipsis: {
         tooltip: true
      },
   },
   {
      title: "价格",
      key: "price",
      // 可拖动
      resizable: true,
      // 溢出省略
      ellipsis: {
         tooltip: true
      },
   },
   {
      title: "库存",
      key: "stock",
      // 可拖动
      resizable: true,
      // 溢出省略
      ellipsis: {
         tooltip: true
      },
   }
]

const itemCount = ref(0);

const paginationReactive = reactive({
   page: 1,
   pageSize: 10,
   showSizePicker: true,
   pageSizes: [
      {label: "10 每页", value: 10,},
      {label: "15 每页", value: 15,},
      {label: "20 每页", value: 20,},
      {label: "30 每页", value: 30,}
   ],
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
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


//#region 生命周期钩子
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
/**
 * 组件挂载完成时调用
 */
onMounted(() => { // 加载数据
   checkLoginState();
   find();
})
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion
</script>

<template>
   <n-layout-header class="h-2.4em top-3em" position="absolute">
      <n-flex class="h-2.4em items-center" style="margin: 0.3em 1em;">
         <router-link to="/manage/publishers/add">
            <n-button>
               <template #icon>
                  <addCircle/>
               </template>
               添加
            </n-button>
         </router-link>
         <n-popover placement="top" trigger="click">
            <template #trigger>
               <n-button class="h-2.4em m-l-a">
                  <template #icon>
                     <n-icon>
                        <write/>
                     </n-icon>
                  </template>
                  修改条件
               </n-button>
            </template>
            <span class="font-size-1.2em font-800">精确查询</span>
            <n-form :model="entity">
               <n-divider class="m-1!"/>
               <n-form-item label="id" path="id">
                  <n-input v-model:value="entity.id" :allow-input="inputValidator.onlyAllowNumber"
                           clearable
                           placeholder="输入id"/>
               </n-form-item>
               <n-form-item label="出版社名称" path="name">
                  <n-input v-model:value="entity.name" :allow-input="inputValidator.noSideSpace"
                           clearable placeholder="输入出版社名称"/>
               </n-form-item>
            </n-form>
            <n-form :model="filter">
               <span class="font-size-1.2em font-800">模糊查询</span>
               <n-divider class="m-1!"/>
               <n-form-item label="创建时间">
                  <n-date-picker v-model:value="timestamp.creationTime" clearable type="datetimerange"
                                 update-value-on-close/>
               </n-form-item>
               <n-form-item label="最后修改时间">
                  <n-date-picker v-model:value="timestamp.lastUpdatedTime" clearable type="datetimerange"
                                 update-value-on-close/>
               </n-form-item>
            </n-form>
         </n-popover>
         <n-button class="h-2.4em" @click="clickFind">
            <template #icon>
               <n-icon>
                  <search/>
               </n-icon>
            </template>
            查找
         </n-button>
      </n-flex>
   </n-layout-header>

   <n-layout id="main" :native-scrollbar="false" class="absolute top-3em bottom-2.4em left-0 right-0"
             content-style="padding: 0 1em .3em 1em;">
      <!--   返回顶部   -->
      <n-back-top :bottom="2" :right="20"/>
      <!--   数据表   -->
      <n-spin :show="loadingFind">
         <n-data-table
            :columns="cols"
            :data="tableData"
            :row-props="rowProps"
            :single-line="false"
         />
      </n-spin>

   </n-layout>

   <n-layout-footer class="h-2.4em" position="absolute">
      <n-flex :size="0" class="items-center mr4 h-100%" justify="center">
         <n-pagination
            v-model:page="pagination.page"
            v-model:page-size="pagination.pageSize"
            v-model:page-sizes="pagination.pageSizes"
            :item-count="itemCount"
            :on-update-page="pagination.onUpdatePage"
            :on-update-page-size="pagination.onUpdatePageSize"
            class="text-center"
            show-quick-jumper
            show-size-picker
            size="large"
         >
            <template #prefix="{ itemCount}">
               共 {{ itemCount }} 项
            </template>
            <template #goto>
               跳至
            </template>
            <template #suffix="{}">
               页
            </template>
         </n-pagination>
      </n-flex>
   </n-layout-footer>
</template>

<style scoped>

.n-menu .n-menu-item-content .n-menu-item-content-header a {
   font-weight: 800 !important;
}

.n-date-picker {
   flex: 1;
}

</style>