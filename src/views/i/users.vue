<script setup>
import {Service} from "@/api/index.js";
import {checkLoginState} from "@/constant/Provider.js";
import {ResponseCode} from "@/constant/ResponseCode.js";
import Write from "@/icons/Write.vue";
import {gCol} from "@/utils/generate.js";
import {timestampToDateTimeString} from "@/utils/index.js";
import {Search} from "@vicons/ionicons5";
import {
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
   NInputNumber,
   NLayout,
   NLayoutFooter,
   NPagination,
   NPopover,
   NSelect,
   NSpin,
   NTag,
   useMessage
} from "naive-ui"
import {h, nextTick, onMounted, reactive, ref} from "vue"

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

const timestamp = reactive({
   creationTime: null,
   lastLoginTime: null,
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
   lastLoginTime: {
      start: null,
      end: null,
   }
});

const entity = reactive({
   id: '',
   displayName: '',
   userName: '',
   email: '',
   phoneNumber: '',
   role: ''
});

let formData = [];

const pageCount = ref(0);

const setPageCount = (count) => {
   pageCount.value = Math.ceil(count / pagination.pageSize);
}

const pre_find = () => {
   if (timestamp.creationTime) {
      filter.creationTime.start = timestampToDateTimeString(timestamp.creationTime?.[0]);
      filter.creationTime.end = timestampToDateTimeString(timestamp.creationTime?.[1]);
   }
   if (timestamp.lastLoginTime) {
      filter.lastLoginTime.start = timestampToDateTimeString(timestamp.lastLoginTime?.[0]);
      filter.lastLoginTime.end = timestampToDateTimeString(timestamp.lastLoginTime?.[1]);
   }
   if (timestamp.lastUpdatedTime) {
      filter.lastUpdatedTime.start = timestampToDateTimeString(timestamp.lastUpdatedTime?.[0]);
      filter.lastUpdatedTime.end = timestampToDateTimeString(timestamp.lastUpdatedTime?.[1]);
   }
}

const tranGender = (v) => {
   switch (v) {
      case 0:
         return "未知";
      case 1:
         return "男";
      case 2:
         return "女";
   }
}

const find = () => {
   loading.value = true;

   pre_find();

   Service.Users.list(entity, filter)
      .then(res => {
         const data = res.data;
         if (!data || data?.code !== ResponseCode.SUCCESS) {
            message.error(data?.msg, messageOptions);
            return;
         }
         // console.log(data)

         setPageCount(data?.data?.count);
         formData = data?.data?.data;
         // data?.data?.data.forEach((item) => {
         //    item.gender = tranGender(item.gender);
         //    formData.push(item);
         // })
      })
      .catch(err => {
         message.error(err.message, messageOptions);
      })
      .finally(() => {
         loading.value = false;
      });
}

const showDropdown = ref(false)

const cols = [
   gCol("id", "id"),
   gCol("用户昵称", "displayName"),
   gCol("用户名", "userName"),
   gCol("邮箱", "email"),
   gCol("电话", "phoneNumber"),
   gCol("角色", "role",
      // {
      //    render(row) {
      //       return row.role.map((tagKey) => {
      //          return h(
      //             NTag,
      //             {
      //                style: {
      //                   marginRight: '6px'
      //                },
      //                type: 'info',
      //                bordered: false
      //             },
      //             {
      //                default: () => tagKey
      //             }
      //          )
      //       })
      //    }
      // }
   ),
   gCol("年龄", "age"),
   gCol("性别", "gender"),
   gCol("备注", "remark"),
]


const paginationReactive = reactive({
   page: 1,
   pageSize: 10,
   showSizePicker: true,
   pageSizes: [{label: "10 每页", value: 10,}, {label: "15 每页", value: 15,}, {
      label: "20 每页",
      value: 20,
   }, {label: "30 每页", value: 30,}, {label: "40 每页", value: 40,}, {label: "50 每页", value: 50,},],
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

const roleOptions = reactive([{
   label: '',
   value: 1,
}]);

//#region 右键快捷菜单
/**
 * 快捷菜单内容
 */
const shortcutMenuOptions = [
   {
      label: () => h("span", {style: {color: "green"}}, "标为已归还"),
      key: "return"
   }, {
      label: () => h("span", {style: {color: "red"}}, "催还"),
      key: "urge"
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


//#region 验证函数
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const onlyAllowNumber = (s) => !s || /^\d+$/.test(s);

const noSideSpace = (s) => !s.startsWith(' ') && !s.endsWith(' ');
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
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
         :options="shortcutMenuOptions"
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
            <span class="font-size-1.2em font-800">精确查询</span>
            <n-form :model="entity">
               <n-divider class="m-1!"/>
               <n-grid :cols="2" x-gap="12">
                  <n-gi>
                     <n-form-item label="id" path="id">
                        <n-input v-model:value="entity.id" :allow-input="onlyAllowNumber" clearable
                                 placeholder="输入id"/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="用户昵称" path="displayName">
                        <n-input v-model:value="entity.displayName" :allow-input="noSideSpace"
                                 clearable placeholder="输入用户昵称"/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="用户名" path="userName">
                        <n-input v-model:value="entity.userName" :allow-input="noSideSpace" clearable
                                 placeholder="输入用户名"/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="邮箱" path="email">
                        <n-input v-model:value="entity.email" :allow-input="noSideSpace" clearable
                                 placeholder="输入邮箱"/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="电话" path="phone">
                        <n-input v-model:value="entity.phoneNumber" :allow-input="onlyAllowNumber" clearable
                                 maxlength="11" placeholder="输入电话"/>
                     </n-form-item>
                  </n-gi>
                  <n-gi>
                     <n-form-item label="角色" path="role">
                        <n-select v-model:value="entity.role" :options="roleOptions"/>
                     </n-form-item>
                  </n-gi>
               </n-grid>
            </n-form>
            <n-form :model="filter">
               <span class="font-size-1.2em font-800">模糊查询</span>
               <n-divider class="m-1!"/>
               <n-grid :cols="2" x-gap="12">
                  <n-gi :span="2">
                     <n-form-item label="年龄">
                        <n-input-group>
                           <n-input-number v-model:value="filter.age.start" :max="filter.age.end" :min="0"
                                           :style="{ width: '50%' }"
                                           clearable/>
                           <n-input-number v-model:value="filter.age.end" :max="255" :min="filter.age.start"
                                           :style="{ width: '50%' }"
                                           clearable/>
                        </n-input-group>
                     </n-form-item>
                  </n-gi>
                  <n-gi :span="2">
                     <n-form-item label="创建时间">
                        <n-date-picker v-model:value="timestamp.creationTime" clearable type="datetimerange"/>
                     </n-form-item>
                  </n-gi>
                  <n-gi :span="2">
                     <n-form-item label="最后一次登录时间">
                        <n-date-picker v-model:value="timestamp.lastLoginTime" clearable type="datetimerange"/>
                     </n-form-item>
                  </n-gi>
                  <n-gi :span="2">
                     <n-form-item label="最后一次更新时间">
                        <n-date-picker v-model:value="timestamp.lastUpdatedTime" clearable type="datetimerange"/>
                     </n-form-item>
                  </n-gi>
               </n-grid>
            </n-form>
         </n-popover>
         <n-button class="m-.3em h-2.4em w-2.4em b-rd-50%" @click="find">
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

.n-date-picker {
   flex: 1;
}
</style>
