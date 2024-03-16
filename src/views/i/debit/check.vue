<script setup>
import {Service} from "@/api/index.js";
import {ResponseCode} from "@/constant/response-code.js";
import {timeFormat} from "@/utils/convert.js";
import {copyMatchingProperties} from "@/utils/index.js";
import {sleep} from "@/utils/sleep.js";
import {NFlex, NLayout, NLayoutHeader, NTable, NTag, useMessage} from "naive-ui";
import {onMounted, reactive} from "vue";

const props = defineProps(['id']);

const message = useMessage();

const info = reactive({
	id: null,
	book: {
		id: null,
	},
	returnDeadline: null,
	returnDate: null,
	createdBy: null,
	creationTime: null,
	updatedBy: null,
	lastUpdatedTime: null,
	revision: null,
	remark: null
});

const creator = reactive({
	id: null,
	displayName: null,
	name: null,
	surname: null,
	email: null,
	phoneNumber: null
});

const updater = reactive({
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
const queryUser = (id, target) => {
	Service.Users.get(id)
		.then(res => {
			const _returnData = res.data;
			if (_returnData?.code !== ResponseCode.SUCCESS) {
				return;
			}

			copyMatchingProperties(_returnData.data, target);

		})
		.catch(err => {
			message.error(err.message);
		})
		.finally(() => {

		})
}


const query = () => {
	Service.Logs.get(props.id)
		.then(res => {
			const _returnData = res.data;
			if (_returnData?.code !== ResponseCode.SUCCESS) {
				return;
			}

			copyMatchingProperties(_returnData?.data, info);

			sleep();
			queryUser(info.createdBy, creator);
			queryUser(info.updatedBy, updater);
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
	query();
})
</script>

<template>
	<n-layout-header class="absolute top-0 h-3em left-0 right-0">
		<n-flex class="items-center" style="margin: 0 1em;">
			<h1>借阅信息</h1>
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
				<td>书籍信息</td>
				<td>
					{{ JSON.stringify(info.book) }}
				</td>
			</tr>
			<tr>
				<td>归还期限</td>
				<td>
					<!--					todo date -->
					{{ info.returnDeadline }}
				</td>
			</tr>
			<tr>
				<td>归还日期</td>
				<td>
					{{ info.returnDate }}
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
				<td>借阅时间</td>
				<td>
					<n-tag :bordered="false" type="primary">
						{{ info.creationTime?.toString().replace("T", " ") }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>更新者</td>
				<td style="--n-td-padding: 0;">
					<n-table :bordered="false">
						<tbody>
						<tr>
							<td class="w-30">id</td>
							<td>
								<n-tag :bordered="false" type="info">
									{{ updater.id }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>用户昵称</td>
							<td>{{ updater.displayName }}</td>
						</tr>
						<tr>
							<td>用户名</td>
							<td>
								<n-tag :bordered="false" type="primary">
									{{ updater.surname }}
								</n-tag>
								<n-tag :bordered="false" class="m-l-1" type="primary">
									{{ updater.name }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>邮箱</td>
							<td>
								<n-tag :bordered="false" type="error">
									{{ updater.email }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>电话</td>
							<td>
								<n-tag :bordered="false" type="error">
									{{ updater.phoneNumber }}
								</n-tag>
							</td>
						</tr>
						</tbody>
					</n-table>
				</td>
			</tr>
			<tr>
				<td>最后时间</td>
				<td>
					<n-tag :bordered="false" type="primary">
						{{ timeFormat(info.lastUpdatedTime) }}
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