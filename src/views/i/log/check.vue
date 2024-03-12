<script setup>
import {Service} from "@/api/index.js";
import {mapOperations} from "@/constant/pre-defined/map.js";
import {ResponseCode} from "@/constant/response-code.js";
import {getTagTypeByElapsedTime, transType} from "@/utils/convert.js";
import {copyMatchingProperties} from "@/utils/index.js";
import {sleep} from "@/utils/sleep.js";
import {NLayout, NTable, NTag, useMessage} from "naive-ui";
import {onMounted, reactive} from "vue";
import JsonViewer from "vue-json-viewer";

const props = defineProps(['id']);

const message = useMessage();

const msgReactive = message.create("查找日志信息", {type: "loading"});

const info = reactive({
   id: null,
   type: null,
   serviceName: null,
   input: null,
   output: null,
   createdBy: null,
   creationTime: null,
   dataId: null,
   elapsedTime: null,
});

const creator = reactive({
   id: null,
   displayName: null,
   name: null,
   surname: null,
   email: null,
   phoneNumber: null
});

//#region transform
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region find
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const findLogCreator = () => {
   msgReactive.type = "loading";
   msgReactive.content = "查找日志操作者";
   Service.Users.get(info.createdBy)
      .then(res => {
         const _returnData = res.data;
         if (_returnData?.code !== ResponseCode.SUCCESS) {
            msgReactive.type = "error";
            msgReactive.content = _returnData?.msg;
            return;
         }

         copyMatchingProperties(_returnData.data, creator);

         msgReactive.type = "success";
         msgReactive.content = "查找完成";
      })
      .catch(err => {
         message.error(err.message);
      })
      .finally(() => {

      })
}


const findLog = () => {
   Service.Logs.get(props.id)
      .then(res => {
         const _returnData = res.data;
         if (_returnData?.code !== ResponseCode.SUCCESS) {
            msgReactive.type = "error";
            msgReactive.content = _returnData?.msg;
            return;
         }

         copyMatchingProperties(_returnData?.data, info);

         msgReactive.type = "success";
         msgReactive.content = "查找完成";
         sleep();
         findLogCreator();
      })
      .catch(err => {
         message.error(err.message);
      })
      .finally(() => {

      })
}

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

onMounted(() => {
   findLog();
})
</script>

<template>
   <n-layout :native-scrollbar="false" class="absolute top-0 bottom-0 left-0 right-0" content-style="padding: 1em">

      <h1>日志信息</h1>
      <n-table :single-line="false" class="w-100%">
         <tbody class="trc">
         <tr>
            <td class="w-43%">id</td>
            <td>
               <n-tag type="info">
                  {{ info.id }}
               </n-tag>
            </td>
         </tr>
         <tr>
            <td>操作类型</td>
            <td>
               <n-tag :type="transType(info.type)">
                  {{ mapOperations.getByValue(info.type) }}
               </n-tag>
            </td>
         </tr>
         <tr>
            <td>操作对象</td>
            <td>
               <n-tag type="warning">
                  {{ mapOperations.getByValue(info.serviceName) }}
               </n-tag>
            </td>
         </tr>
         <tr>
            <td>数据-ID</td>
            <td>{{ info.dataId }}</td>
         </tr>
         <tr>
            <td>操作持续时间-毫秒</td>
            <td>
               <n-tag :type="getTagTypeByElapsedTime(info.elapsedTime)">
                  {{ info.elapsedTime }}
               </n-tag>
            </td>
         </tr>
         <tr>
            <td>输入</td>
            <td>
               <JsonViewer :value="JSON.parse( info.input)" class="p-0"/>
            </td>
         </tr>
         <tr>
            <td>输出</td>
            <td>
               <JsonViewer :value="JSON.parse( info.output)" class="p-0"/>
            </td>
         </tr>
         <tr>
            <td>操作者</td>
            <td style="--n-td-padding: 0;">
               <n-table :bordered="false">
                  <tbody>
                  <tr>
                     <td class="w-30">id</td>
                     <td>
                        <n-tag type="info">
                           {{ creator.id }}
                        </n-tag>
                     </td>
                  </tr>
                  <tr>
                     <td>用户昵称</td>
                     <td>{{ creator.displayName }}</td>
                  </tr>
                  <tr>
                     <td>用户名</td>
                     <td>
                        <n-tag type="primary">
                           {{ creator.surname }}
                        </n-tag>
                        <n-tag class="m-l-1" type="primary">
                           {{ creator.name }}
                        </n-tag>
                     </td>
                  </tr>
                  <tr>
                     <td>邮箱</td>
                     <td>
                        <n-tag type="error">
                           {{ creator.email }}
                        </n-tag>
                     </td>
                  </tr>
                  <tr>
                     <td>电话</td>
                     <td>
                        <n-tag type="error">
                           {{ creator.phoneNumber }}
                        </n-tag>
                     </td>
                  </tr>
                  </tbody>
               </n-table>
            </td>
         </tr>
         <tr>
            <td>记录时间</td>
            <td>
               <n-tag type="primary">
                  {{ info.creationTime?.toString().replace("T", " ") }}
               </n-tag>
            </td>
         </tr>
         </tbody>
      </n-table>
   </n-layout>
</template>

<style scoped>
>>> div.p-0 div.jv-code {
   padding: 0;
}

.trc tr > td:first-child {
   text-align: right;
}
</style>