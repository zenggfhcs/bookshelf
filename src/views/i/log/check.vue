<script setup>
import { Service } from "@/api/index.js";
import { B_LOG_CHECK } from "@/constant/breadcrumb.js";
import { LOG_SELECT, LOG_TYPE_MAP, SERVICE_NAME_MAP } from "@/constant/map.js";
import IBack from "@/icons/i-back.vue";
import { LOG } from "@/router/RouterValue.js";
import { checkLoginState } from "@/utils/check-login-state.js";
import { getTagType } from "@/utils/convert.js";
import { queryInfo } from "@/utils/query.js";
import { NButton, NFlex, NIcon, NLayout, NLayoutHeader, NTable, NTag, useMessage } from "naive-ui";
import { onBeforeMount, onMounted, reactive } from "vue";
import JsonViewer from "vue-json-viewer";

const props = defineProps([
	"id",
	"showModal",
	"updateMenuItem",
	"updateBreadcrumbArray"
]);

props.updateMenuItem("i-log");

const message = useMessage();

const info = reactive({
	id: null,
	type: null,
	serviceName: null,
	input: null,
	output: null,
	createdBy: {
		id: null,
		displayName: null,
		name: null,
		surname: null,
		email: null,
		phoneNumber: null
	},
	creationTime: null,
	elapsedTime: null
});


async function query(id) {
	await queryInfo(message, Service.Logs.get(id), info);
}

onBeforeMount(() => {
	checkLoginState();
});

onMounted(() => {
	props.updateMenuItem("i-log");
	props.updateBreadcrumbArray(B_LOG_CHECK(props.id));
	query(props.id);
});
</script>

<template>
	<n-layout-header class="h-3em" position="absolute">
		<n-flex class="items-center h-3em" justify="center">
			<router-link :to="LOG">
				<n-button type="tertiary">
					<template #icon>
						<n-icon :component="IBack" />
					</template>
					后退
				</n-button>
			</router-link>
			<n-button
				v-if="info.type !== LOG_SELECT.value"
				title="操作回退会根据日志的内容，将影响到的数据回退到该日志生成前一刻；这个操作会生成新的日志"
				type="error"
			>
				操作回退
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout
		:native-scrollbar="false"
		class="absolute top-3em bottom-0 left-0 right-0"
		content-style="padding: .3em 1em"
	>
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
					<n-tag
						:bordered="false"
						:type="getTagType.byLogType(info.type)"
					>
						{{ LOG_TYPE_MAP.getByValue(info.type) }}
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
				<td>操作持续时间-毫秒</td>
				<td>
					<n-tag
						:bordered="false"
						:type="getTagType.byElapsedTime(info.elapsedTime)"
					>
						{{ info.elapsedTime }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>输入</td>
				<td style="--td-color: v-bind(); --td-text-color: v-bind()">
					<JsonViewer
						:value="JSON.parse(info.input ? info.input : '{}')"
						class="p-0"
						style="
								color: var(--td-text-color);
								background-color: var(--td-color);
							"
					/>
				</td>
			</tr>
			<tr>
				<td>输出</td>
				<td style="--td-color: v-bind(); --td-text-color: v-bind()">
					<JsonViewer
						:value="JSON.parse(info.output ? info.output : '{}')"
						class="p-0"
						style="
								color: var(--td-text-color);
								background-color: var(--td-color);
							"
					/>
				</td>
			</tr>
			<tr>
				<td>操作者</td>
				<td style="--td-padding: 0">
					<n-table :bordered="false">
						<tbody>
						<tr>
							<td class="w-30">id</td>
							<td>
								<n-tag :bordered="false" type="info">
									{{ info.createdBy.id }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>用户昵称</td>
							<td>{{ info.createdBy.displayName }}</td>
						</tr>
						<tr>
							<td>用户名</td>
							<td>
								<n-tag :bordered="false" type="primary">
									{{ info.createdBy.surname }}
								</n-tag>
								<n-tag
									:bordered="false"
									class="m-l-1"
									type="primary"
								>
									{{ info.createdBy.name }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>邮箱</td>
							<td>
								<n-tag :bordered="false" type="error">
									{{ info.createdBy.email }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>电话</td>
							<td>
								<n-tag :bordered="false" type="error">
									{{ info.createdBy.phoneNumber }}
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
