<script setup>
import {Service} from "@/api/index.js";
import {checkLoginState} from "@/constant/Provider.js";
import {ResponseCode} from "@/constant/ResponseCode.js";
import Write from "@/icons/Write.vue";
import router from "@/router/Router.js";
import {debounce} from "@/utils/debounce.js";
import JsonViewer from "vue-json-viewer";
import {gCol} from "@/utils/generate.js";
import {timestampToDateTimeString} from "@/utils/index.js";
import {Search} from "@vicons/ionicons5";
import {
   NBackTop,
   NButton,
   NDataTable,
   NDatePicker,
   NDivider,
   NFlex,
   NForm,
   NFormItem,
   NGi,
   NGrid,
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


const typeName = {
   select: "查询",
   update: "更新",
   delete: "删除",
   insert: "插入",
}

const serviceName = {
   Publisher: "出版社",
   Debit: "借阅记录",
   User: "用户",
   BookInfo: "书籍信息",
   Book: "书籍"
}
//#region entity
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const entity = {
   find: reactive({
      id: '',
      name: '',
   }),
}
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

const rowProps = row => {
   return {
      onDblclick: (e) => {
         e.preventDefault();

         router.push(`/`);
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
   age: {
      start: 0,
      end: 255
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

   Service.Logs.list(entity.find, filter)
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

const getType = (elapsedTime) => {
   if (elapsedTime > 1000) {
      return "error";
   }
   if (elapsedTime > 50) {
      return "warning";
   }
   return "info";
}

const render = {
   type: {
      render: (row) => {
         return h(
            NTag,
            {
               style: {
                  marginRight: '.3em'
               },
               type: 'info',
               bordered: false
            },
            {
               default: () => typeName[row?.type]
            }
         );
      }
   },
   serviceName: {
      render: (row) => {
         return h(
            NTag,
            {
               style: {
                  marginRight: '.3em'
               },
               type: 'info',
               bordered: false
            },
            {
               default: () => serviceName[row?.serviceName.split(".")?.[0]]
            })
      }
   },
   elapsedTime: {
      render: (row) => {
         return h(
            NTag,
            {
              type: getType(row?.elapsedTime),
               bordered: false,
            },
            {
               default: () => row?.elapsedTime,
            }
         )
      }
   },
   output: {
      render: (row) => {
         return h(
            JsonViewer,
            {
               value: JSON.parse(row?.output)
            }
         )
      }
   }
}

const cols = [
   gCol("id", "id",),
   gCol("操作类型", "type", render.type),
   gCol("数据名", "serviceName", render.serviceName),
   gCol("数据-Id", "dataId"),
   gCol("运行时间-毫秒值", "elapsedTime", render.elapsedTime),
   gCol("操作者-Id", "createdBy"),
]

const itemCount = ref(0);

const paginationReactive = reactive({
   page: 1,
   pageSize: 10,
   showSizePicker: true,
   pageSizes: [
      {label: "10 每页", value: 10,},
      {label: "20 每页", value: 20,},
      {label: "30 每页", value: 30,},
      {label: "50 每页", value: 50,}
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

//#region input allow 验证函数
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const inputValidate = {
   onlyAllowNumber: (s) => !s || /^\d+$/.test(s),
   noSideSpace: (s) => !s.startsWith(' ') && !s.endsWith(' '),
}
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

<template class="relative">
   <n-layout-header position="absolute" class="h-2.4em top-3em">
      <n-flex class="h-2.4em items-center" style="margin: 0.3em 1em;">
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
            <n-form :model="entity.find">
               <n-divider class="m-1!"/>
               <n-grid :cols="2" x-gap="12">
                  <n-gi>
                     <n-form-item label="id" path="id">
                        <n-input v-model:value="entity.find.id" :allow-input="inputValidate.onlyAllowNumber"
                                 clearable
                                 placeholder="输入id"/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="出版社名称" path="name">
                        <n-input v-model:value="entity.find.name" :allow-input="inputValidate.noSideSpace"
                                 clearable placeholder="输入出版社名称"/>
                     </n-form-item>
                  </n-gi>
               </n-grid>
            </n-form>
            <n-form :model="filter">
               <span class="font-size-1.2em font-800">模糊查询</span>
               <n-divider class="m-1!"/>
               <n-grid :cols="2" x-gap="12">
                  <n-gi :span="2">
                     <n-form-item label="创建时间">
                        <n-date-picker update-value-on-close v-model:value="timestamp.creationTime" clearable
                                       type="datetimerange"/>
                     </n-form-item>
                  </n-gi>

                  <n-gi :span="2">
                     <n-form-item label="最后修改时间">
                        <n-date-picker update-value-on-close v-model:value="timestamp.lastUpdatedTime" clearable
                                       type="datetimerange"/>
                     </n-form-item>
                  </n-gi>
               </n-grid>
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
   <n-layout id="main" :native-scrollbar="false" class="absolute top-3em bottom-2.4em"
             content-style="padding: 0 1em .3em 1em;">
      <!--   返回顶部   -->
      <n-back-top style="--n-height: 2.4em; --n-width: 2.4em;" :right="20" :bottom="2"/>
      <!--   数据表   -->
      <n-spin :show="loadingFind">
         <n-data-table
            :columns="cols"
            :data="tableData"
            :single-line="false"
            :row-props="rowProps"
         />
      </n-spin>
   </n-layout>
   <n-layout-footer class="h-2.4em" position="absolute">
      <n-flex :size="0" class="items-center mr4 h-100%" justify="center">
         <n-pagination
            v-model:page="pagination.page"
            v-model:page-size="pagination.pageSize"
            v-model:page-sizes="pagination.pageSizes"
            :on-update-page="pagination.onUpdatePage"
            :on-update-page-size="pagination.onUpdatePageSize"
            :item-count="itemCount"
            show-quick-jumper
            show-size-picker
            size="large"
            class="text-center"
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
.jv-code {
   padding: 0 !important;
}
</style>/style>