<script setup>
import { Service } from "@/api/index.js";
import NoData from "@/components/no-data.vue";

// todo start
import { B_BOOK_CHECK } from "@/constant/breadcrumb.js";
import IBack from "@/icons/i-back.vue";
import { BOOK } from "@/router/RouterValue.js";
import { checkLoginState } from "@/utils/check-login-state.js";
import { formatTime } from "@/utils/format.js";
import { queryInfo } from "@/utils/query.js";
import { NButton, NFlex, NIcon, NLayout, NLayoutHeader, NTable, NTag, useMessage } from "naive-ui";
import { onBeforeMount, onMounted, reactive } from "vue";

const props = defineProps(["id", "showModal", "updateMenuItem", "updateBreadcrumbArray"]);

const message = useMessage();

onBeforeMount(() => {
	checkLoginState();
});

const info = reactive({
	id: null,
	lastLoginTime: "",
	createdBy: {
		id: null,
		displayName: null,
		name: null,
		surname: null,
		email: null,
		phoneNumber: null
	},
	creationTime: null,
	updatedBy: {
		id: null,
		displayName: null,
		name: null,
		surname: null,
		email: null,
		phoneNumber: null
	},
	lastUpdatedTime: null,
	remark: null,
	revision: null
});

function query(id) {
	queryInfo(
		message,
		Service.Books.get(id),
		info
	);
}

function showDeleteConfirmedModal() {

	props.showModal("error", "删除二次确认", "您是否要删除该书籍？", () => {
	});
}

onMounted(() => {
	props.updateMenuItem("i-book");
	props.updateBreadcrumbArray(B_BOOK_CHECK(props.id));
	query(props.id);
});
</script>

<template>
	<n-layout-header bordered class="top-0 h-3em" position="absolute">
		<n-flex class="h-3em items-center" justify="center">
			<router-link :to="BOOK">
				<n-button type="tertiary">
					<template #icon>
						<n-icon :component="IBack" />
					</template>
					后退
				</n-button>
			</router-link>
			<n-button
				type="error"
				@click.prevent="showDeleteConfirmedModal"
			>
				删除
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
				<td>创建者</td>
				<td :style="info.createdBy?.id ? '--n-td-padding: 0;' : ''">
					<n-table
						v-if="info.createdBy"
						:bordered="false"
						:single-line="false"
					>
						<tbody>
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
					<NoData v-else />
				</td>
				<td>更新者</td>
				<td :style="info.updatedBy?.id ? '--n-td-padding: 0;' : ''">
					<n-table
						v-if="info.updatedBy"
						:bordered="false"
						:single-line="false"
					>
						<tbody class="trc">
						<tr>
							<td>用户昵称</td>
							<td>{{ info.updatedBy.displayName }}</td>
						</tr>
						<tr>
							<td>用户名</td>
							<td>
								<n-tag :bordered="false" type="primary">
									{{ info.updatedBy.surname }}
								</n-tag>
								<n-tag
									:bordered="false"
									class="m-l-1"
									type="primary"
								>
									{{ info.updatedBy.name }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>邮箱</td>
							<td>
								<n-tag :bordered="false" type="error">
									{{ info.updatedBy.email }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>电话</td>
							<td>
								<n-tag :bordered="false" type="error">
									{{ info.updatedBy.phoneNumber }}
								</n-tag>
							</td>
						</tr>
						</tbody>
					</n-table>
					<NoData v-else />
				</td>
			</tr>
			<tr>
				<td>创建时间</td>
				<td>
					<n-tag :bordered="false" type="primary">
						{{ formatTime(info.creationTime) }}
					</n-tag>
				</td>
				<td>最后更新时间</td>
				<td>
					<n-tag :bordered="false" type="warning">
						{{ formatTime(info.lastUpdatedTime) }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>备注</td>
				<td>
					<n-tag v-if="info.remark">
						{{ info.remark }}
					</n-tag>
					<NoData v-else />
				</td>
			</tr>

			</tbody>
		</n-table>
	</n-layout>
</template>

<style scoped>
@import url(@/styles/trc.css);
</style>
