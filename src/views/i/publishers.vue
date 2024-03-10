<script setup>
import {Service} from "@/api/index.js";
import {checkLoginState} from "@/constant/Provider.js";
import {ResponseCode} from "@/constant/ResponseCode.js";
import Write from "@/icons/Write.vue";
import {debounce} from "@/utils/debounce.js";
import {gCol, renderIcon} from "@/utils/generate.js";
import {timestampToDateTimeString} from "@/utils/index.js";
import {AddCircle, Search} from "@vicons/ionicons5";
import {
   NBackTop,
   NButton,
   NDataTable,
   NDatePicker,
   NDivider,
   NDropdown,
   NFlex,
   NForm,
   NFormItem,
   NGi,
   NGrid,
   NIcon,
   NInput,
   NInputGroup,
   NInputGroupLabel,
   NLayout,
   NLayoutFooter,
   NLayoutHeader,
   NModal,
   NPagination,
   NPopover,
   NSpace,
   NSpin,
   NTag,
   useMessage
} from "naive-ui"
import {h, nextTick, onMounted, reactive, ref} from "vue"

//#region entity
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const entity = {
   add: reactive({
      name: '',
      remark: ''
   }),
   find: reactive({
      id: '',
      name: '',
   }),
   update: reactive({
      id: '',
      name: '',
      remark: '',
      revision: ''
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

   Service.Publishers.list(entity.find, filter)
      .then(res => {
         const data = res.data;
         if (!data || data?.code !== ResponseCode.SUCCESS) {
            message.error(data?.msg, messageOptions);
            return;
         }

         itemCount.value = data?.data?.count;
         tableData = data?.data?.data;
         tableData.map(item => {
            if (!item.name.endsWith("出版社")) {
               item.name = item.name + "出版社";
            }
         })
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
const cols = [
   gCol("id", "id"),
   gCol("出版社名称", "name"),
   gCol("备注", "remark"),
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

//#region add
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

const showAdd = ref(false);

const loadingAdd = ref(false);

const addFormRef = ref(null);

const addRule = {
   name: {
      required: true,
      trigger: ["input", "blur"],
      validator(rule, value) {
         if (value === undefined || value === null || value.length === 0) {
            return new Error("请输入");
         }
      }
   }
}

const add = debounce((e) => {
   e.preventDefault();
   addFormRef.value?.validate((errors) => {
      if (errors) {
         message.error("添加失败", messageOptions);
         return;
      }
      loadingAdd.value = true;
      Service.Publishers.add(entity.add)
         .then(res => {
            const data = res.data;
            if (!data || data?.code !== ResponseCode.SUCCESS) {
               message.error(data?.msg, messageOptions);
               return;
            }

            message.success("添加成功", messageOptions);
            showAdd.value = false;
            pagination.onUpdatePage(pagination.page);
         })
         .catch(err => {
            message.error(err.message, messageOptions);
         })
         .finally(() => {
            loadingAdd.value = false;
         })
   })
}, 777);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region update
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const showUpdate = ref(false);

const loadingUpdate = ref(false);

const updateFormRef = ref(null);

const updateRule = {
   name: {
      required: true,
      trigger: ['input', 'blur'],
      validator(rule, value) {
         if (value === undefined || value === null || value.length === 0) {
            return new Error("不能为空");
         }
      }
   }
}

const getToUpdate = (id, loadingMessage) => {
   let _type;
   let _content;
   Service.Publishers.getToUpdate(id)
      .then(res => {
         const _returnData = res.data;
         if (_returnData?.code !== ResponseCode.SUCCESS) {
            message.error("查找需要更新的数据失败", messageOptions);
            _type = "error";
            _content = "查找失败";
            return;
         }

         entity.update.id = _returnData.data?.id;
         entity.update.name = _returnData.data?.name;
         entity.update.remark = _returnData.data?.remark;
         entity.update.revision = _returnData.data?.revision;
         {
            if (entity.update.name.endsWith("出版社")) {
               entity.update.name = /^(.*?)出版社$/.exec(entity.update.name)?.[1];
            }
         }
         _type = "success";
         _content = "查找完成";

         showUpdate.value = true;

      })
      .catch(err => {
         message.error(err.message, messageOptions);
      })
      .finally(() => {
         loadingMessage.type = _type;
         loadingMessage.content = _content;
      })
}

const update = debounce((e) => {
   e.preventDefault();
   updateFormRef.value?.validate(errors => {
      if (errors) {
         message.error("修改失败", messageOptions);
         return;
      }
      loadingUpdate.value = true;
      Service.Publishers.update(entity.update)
         .then(res => {
            const _returnData = res.data;
            if (_returnData?.code !== ResponseCode.SUCCESS) {
               message.error(_returnData?.msg, messageOptions);
               return;
            }
            message.success("修改成功", messageOptions);
            find();
         })
         .catch(err => {
            message.error(err.message, messageOptions);
         })
         .finally(() => {
            loadingUpdate.value = false;
            showUpdate.value = false;
         });

   })
}, 777);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region remove
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const showRemove = ref(false);


const remove = () => {
   const _id = currentRow?.id;
   Service.Publishers.remove(_id)
      .then(res => {
         const _returnData = res.data;
         if (_returnData?.code !== ResponseCode.SUCCESS) {
            message.error(_returnData?.msg, messageOptions);
         }
         message.success("删除成功", messageOptions);

         { // 当删除最后一页最后一行时，需要查询上一页
            let _page = pagination.page;
            if (itemCount.value % pagination.pageSize === 1 && _page > 1) {
               _page--;
            }
            pagination.onUpdatePage(_page); // 此处调用了 find
         }

      })
      .catch(err => {
         message.error(err.message, messageOptions);
      })
      .finally(() => {
         showRemove.value = false;
      })
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region 快捷菜单
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

const showDropdown = ref(false)
/**
 * 快捷菜单位置 x
 */
const x = ref(0);
/**
 * 快捷菜单位子 y
 */
const y = ref(0);

let currentRow = {
   id: null,
   name: null,
   remark: null
};

const menuManipulation = {
   update: () => {
      const loadingMessage = message.create('查找中', {
         type: "loading"
      })
      getToUpdate(currentRow.id, loadingMessage);
   },
   remove: () => {
      showRemove.value = true;
   },
}
const shortcutMenu = {
   /**
    * 右键显示菜单
    * @param row 右键的行对应的数据
    */
   rowProps: (row) => {
      return {
         onContextmenu: (e) => {
            e.preventDefault()
            showDropdown.value = false
            nextTick().then(() => {
               showDropdown.value = true
               x.value = e.clientX
               y.value = e.clientY
            })
            currentRow = row;
         }
      }
   },
   /**
    * 选择之后隐藏菜单
    */
   handleSelect: () => showDropdown.value = false,
   /**
    * 点击菜单外部之后隐藏菜单
    */
   onClickOutSide: () => showDropdown.value = false,
   options: [
      {
         label: () => h(
            "span",
            {
               style: {color: "green"}
            },
            "修改"
         ),
         key: "update",
         icon: renderIcon(Search),
         props: {
            onClick: menuManipulation.update
         }
      }, {
         label: () => h("span", {style: {color: "red"}}, "删除"),
         key: "remove",
         props: {
            onClick: menuManipulation.remove
         }
      }
   ]
}
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
         <n-button @click="showAdd = true">
            <template #icon>
               <addCircle/>
            </template>
            添加
         </n-button>
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
   <n-layout id="main" :native-scrollbar="false" class="absolute top-3em bottom-3em"
             content-style="padding: 0 1em .3em 1em;">
      <!--   返回顶部   -->
      <n-back-top :right="20" :bottom="2"/>
      <!--   数据表   -->
      <n-spin :show="loadingFind">
         <n-data-table
            :columns="cols"
            :data="tableData"
            :row-props="shortcutMenu.rowProps"
            :single-line="false"
         />
      </n-spin>
      <!--   数据表右键菜单   -->
      <n-dropdown
         :on-clickoutside="shortcutMenu.onClickOutSide"
         :options="shortcutMenu.options"
         :show="showDropdown"
         :x="x"
         :y="y"
         placement="bottom-start"
         trigger="manual"
         @select="shortcutMenu.handleSelect"
      />
      <!-- 添加面板 -->
      <n-modal
         id="add-modal"
         v-model:show="showAdd"
         title="添加"
         preset="dialog"
         transform-origin="center"
         type="default"
      >
         <n-spin :show="loadingAdd">
            <n-form ref="addFormRef" :rules="addRule" :model="entity.add" style="--n-font-size: 16px;">
               <n-form-item label="出版社名称" path="name">
                  <n-input-group>
                     <n-input v-model:value="entity.add.name" clearable placeholder="输入出版社名称" maxlength="32"/>
                     <n-input-group-label>出版社</n-input-group-label>
                  </n-input-group>
               </n-form-item>

               <n-form-item label="备注" path="remark">
                  <n-input v-model:value="entity.add.remark" clearable placeholder="输入备注"/>
               </n-form-item>
            </n-form>
            <n-flex justify="right">
               <n-button type="success" @click="add">
                  确定
               </n-button>
            </n-flex>
         </n-spin>
      </n-modal>

      <!--   更新面板   -->
      <n-modal
         id="update-modal"
         v-model:show="showUpdate"
         preset="dialog"
         type="warning"
      >
         <n-spin :show="loadingUpdate">
            <n-form ref="updateFormRef" :rules="updateRule" :model="entity.update">
               <n-form-item label="出版社名称" path="name">
                  <n-input-group>
                     <n-input v-model:value="entity.update.name" clearable placeholder="输入出版社名称" maxlength="32"/>
                     <n-input-group-label>出版社</n-input-group-label>
                  </n-input-group>
               </n-form-item>

               <n-form-item label="备注" path="remark">
                  <n-input v-model:value="entity.update.remark" clearable placeholder="输入备注"/>
               </n-form-item>
            </n-form>
            <n-flex justify="right">
               <n-button type="warning" @click="update">
                  更新
               </n-button>
            </n-flex>
         </n-spin>
      </n-modal>

      <!--   删除面板   -->
      <n-modal
         id="remove-modal"
         title="删除二次确认"
         v-model:show="showRemove"
         type="error"
         preset="dialog"
         transform-origin="center"
         style="--n-font-size: 16px;"
      >
         <n-space vertical>
         <span>
            您是否要删除以下出版社:
         </span>
            <n-tag type="warning">{{ currentRow.name }}</n-tag>

            <n-flex justify="right">
               <n-button type="error" @click="remove">
                  确定
               </n-button>
            </n-flex>
         </n-space>
      </n-modal>
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

</style>
