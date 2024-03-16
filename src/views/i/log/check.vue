<script setup>
import {Service} from "@/api/index.js";
import {SERVICE_NAME_MAP, TYPE_MAP} from "@/constant/pre-defined/map.js";
import {ResponseCode} from "@/constant/response-code.js";
import {getTagType} from "@/utils/convert.js";
import {copyMatchingProperties} from "@/utils/index.js";
import {sleep} from "@/utils/sleep.js";
import {NFlex, NLayout, NLayoutHeader, NTable, NTag, useMessage} from "naive-ui";
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

//#region query
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
	<n-layout-header class="h-3em" position="absolute">
		<n-flex class="items-center h-3em" style="margin: 0 1em;">
			<h1>日志信息</h1>
		</n-flex>
	</n-layout-header>
	<n-layout :native-scrollbar="false" class="absolute top-3em bottom-0 left-0 right-0"
	          content-style="padding: .3em 1em">

		<n-table :single-line="false" class="w-100%">
			<tbody class="trc">
			<tr>
				<td class="w-43%">id</td>
				<td>
					<n-tag :bordered="false" type="info">
						{{ info.id }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>操作类型</td>
				<td>
					<n-tag :bordered="false" :type="getTagType.byLogType(info.type)">
						{{ TYPE_MAP.getByValue(info.type) }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>操作对象</td>
				<td>
					<n-tag :bordered="false" type="warning">
						{{ SERVICE_NAME_MAP.getByValue(info.serviceName) }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>数据 id</td>
				<td>{{ info.dataId }}</td>
			</tr>
			<tr>
				<td>操作持续时间-毫秒</td>
				<td>
					<n-tag :bordered="false" :type="getTagType.byElapsedTime(info.elapsedTime)">
						{{ info.elapsedTime }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>输入</td>
				<td style="--n-td-color: v-bind(); --n-td-text-color: v-bind()">
					<JsonViewer :value="JSON.parse(info.input)" class="p-0"
					            style="color: var(--n-td-text-color); background-color: var(--n-td-color);"/>
				</td>
			</tr>
			<tr>
				<td>输出</td>
				<td style="--n-td-color: v-bind(); --n-td-text-color: v-bind()">
					<JsonViewer :value="JSON.parse(info.output)" class="p-0"
					            style="color: var(--n-td-text-color); background-color: var(--n-td-color);"/>
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
								<n-tag :bordered="false" type="info">
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
								<n-tag :bordered="false" type="primary">
									{{ creator.surname }}
								</n-tag>
								<n-tag :bordered="false" class="m-l-1" type="primary">
									{{ creator.name }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>邮箱</td>
							<td>
								<n-tag :bordered="false" type="error">
									{{ creator.email }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>电话</td>
							<td>
								<n-tag :bordered="false" type="error">
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
					<n-tag :bordered="false" type="primary">
						{{ info.creationTime?.toString().replace("T", " ") }}
					</n-tag>
				</td>
			</tr>
			</tbody>
		</n-table>
	</n-layout>
</template>

<style scoped>
:deep(div.p-0 div.jv-code) {
	padding: 0;
}

:deep(.jv-container.jv-light .jv-item.jv-object),
:deep(.jv-container.jv-light .jv-key) {
	color: inherit;
}

.trc tr > td:first-child {
	text-align: right;
}
</style>