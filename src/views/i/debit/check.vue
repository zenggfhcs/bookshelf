<script setup>
import { action, queryItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import NoData from "@/components/no-data.vue";
import { B_DEBIT_CHECK } from "@/constant/breadcrumb.js";
import { messageOptions } from "@/constant/options.js";
import IBack from "@/icons/i-back.vue";
import IReload from "@/icons/i-reload.vue";
import IReturn from "@/icons/i-return.vue";
import Send from "@/icons/send.vue";
import { BOOK_INFO_CHECK, DEBIT } from "@/router/route-value.js";
import { debounce } from "@/utils/debounce.js";
import { formatTime } from "@/utils/format.js";
import { transMouth } from "@/utils/index.js";
import { NButton, NFlex, NGi, NGrid, NIcon, NLayout, NLayoutHeader, NSpace, NTable, NTag, useMessage } from "naive-ui";
import { computed, onMounted, reactive, ref } from "vue";

const props = defineProps([
	"id",
	"showModal",
	"updateMenuItem",
	"updateBreadcrumbArray"
]);

{
	props.updateMenuItem("debitManager");
	props.updateBreadcrumbArray(B_DEBIT_CHECK(props.id));
}

const message = useMessage();

const info = reactive({
	id: null,
	book: {
		id: null,
		bookInfo: {}
	},
	returnDeadline: null,
	returnTime: null,
	createdBy: {
		id: null,
		displayName: null,
		name: null,
		surname: null,
		email: null,
		phoneNumber: null
	},
	creationTime: null,
	revision: null,
	remark: null
});

const keywordsRef = computed(() => {
	return info.book.bookInfo.keyword?.toString()?.split("－");
});


async function query(id) {
	await queryItem(message, Service.Debits.get(id), info);
}

function showRepayConfirmModal() {
	props.showModal("error", "催还二次确认", "是否要进行催还？", async () => {
		await action(message, Service.Debits.remind(info), () => {
			message.success("催还成功", messageOptions);
		});
	});
}

const loadingQuery = ref(false);

const queryHandler = debounce(async () => {
	loadingQuery.value = true;
	await query(props.id);
	loadingQuery.value = false;
});

onMounted(() => {
	query(props.id);
});
</script>

<template>
	<n-layout-header class="absolute top-0 h-3em left-0 right-0">
		<n-flex class="h-3em items-center" justify="center">
			<router-link :to="DEBIT">
				<n-button type="tertiary">
					<template #icon>
						<n-icon :component="IBack" />
					</template>
					后退
				</n-button>
			</router-link>
			<n-button
				:loading="loadingQuery"
				class="h-2.4em"
				type="info"
				@click.prevent="queryHandler">
				<template #icon>
					<n-icon :component="IReload" />
				</template>
				刷新
			</n-button>
			<n-button v-if="!info.returnTime" type="error" @click.prevent="showRepayConfirmModal">
				<template #icon>
					<n-icon>
						<send />
					</n-icon>
				</template>
				催还
				<!-- todo 催还 -->
			</n-button>
			<n-button type="warning">
				<template #icon>
					<n-icon :component="IReturn" />
				</template>
				标为已还
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout
		:native-scrollbar="false"
		class="absolute top-3em bottom-0 left-0 right-0"
		content-style="padding: .3em 1em"
	>
		<n-grid cols="6" x-gap="12">
			<n-gi />
			<n-gi span="2">
				<n-table :single-line="false" class="w-100%">
					<tbody class="trc">
					<tr>
						<td class="w-12%">ISBN</td>
						<td class="w-38%">
							<n-tag :bordered="false" type="error">
								{{ info.book.bookInfo.isbn }}
							</n-tag>
						</td>
					</tr>
					<tr>
						<td class="w-12%">CIP&nbsp;核准号</td>
						<td class="w-38%">
							<n-tag :bordered="false" type="error">
								{{ info.book.bookInfo.cip }}
							</n-tag>
						</td>
					</tr>
					<tr>
						<td>书名</td>
						<td>
							<n-tag :bordered="false" type="success">
								<router-link :to="{name: BOOK_INFO_CHECK.name, params: {id: info.book.bookInfo.id}}">
									{{ info.book.bookInfo.bookName }}
								</router-link>
							</n-tag>
						</td>
					</tr>
					<tr>
						<td>作者</td>
						<td>
							<n-tag v-if="info.book.bookInfo.author" :bordered="false">{{ info.book.bookInfo.author }}</n-tag>
							<NoData v-else />
						</td>
					</tr>
					<tr>
						<td>中图法分类号</td>
						<td>
							<n-tag :bordered="false" type="default">
								{{ info.book.bookInfo.bookType }}
							</n-tag>
						</td>
					</tr>
					<tr>
						<td>主题词</td>
						<td colspan="3">
							<n-space>
								<n-tag
									v-for="(item, index) in keywordsRef"
									:key="index"
									:bordered="false"
									type="info"
								>
									{{ item }}
								</n-tag>
							</n-space>
							<!--					<n-dynamic-tags v-model:value="keywords" :render-tag="renderTag"/>-->
						</td>
					</tr>
					<tr>
						<td>正文语种</td>
						<td colspan="3">
							<n-tag :bordered="false" type="default">
								{{ info.book.bookInfo.lang }}
							</n-tag>
						</td>
					</tr>
					<tr>
						<td>价格</td>
						<td colspan="3">
							<n-tag :bordered="false" type="default">
								{{ info.book.bookInfo.price }}
							</n-tag>
						</td>
					</tr>
					<tr>
						<td colspan="2">&nbsp;</td>
					</tr>
					<tr>
						<td>出版社</td>
						<td>
							<n-tag v-if="info.book.bookInfo.publisher" :bordered="false" type="default">
								{{ info.book.bookInfo.publisher }}
							</n-tag>
							<NoData v-else />
						</td>
					</tr>
					<tr>
						<td class="w-30">出版日期</td>
						<td colspan="3">
							<n-tag
								v-if="info.book.bookInfo.publishedDate"
								:bordered="false"
								type="default"
							>
								<!--								 todo yyyy-MM	-->
								{{ transMouth(info.book.bookInfo.publishedDate) }}
							</n-tag>
							<NoData v-else />
						</td>
					</tr>
					<tr>
						<td>版次</td>
						<td>
							<n-tag v-if="info.book.bookInfo.edition" :bordered="false" type="default">
								{{ info.book.bookInfo.edition }}
							</n-tag>
							<NoData v-else />
						</td>
					</tr>
					<tr>
						<td>印次</td>
						<td>
							<n-tag v-if="info.book.bookInfo.printing" :bordered="false" type="default">
								{{ info.book.bookInfo.printing }}
							</n-tag>
							<NoData v-else />
						</td>
					</tr>
					</tbody>
				</n-table>
			</n-gi>
			<n-gi span="2">
				<n-table :single-line="false" class="w-100%">
					<tbody class="trc">
					<tr>
						<td>借期</td>
						<td>
							<n-tag :bordered="false" type="primary">
								{{ info.creationTime }}
							</n-tag>
						</td>
					</tr>
					<tr>
						<td>借阅者</td>
						<td :style="info.createdBy ? 'padding: 0;' : ''">
							<n-table
								v-if="info.createdBy"
								:bordered="false"
								:single-line="false"
							>
								<tbody>
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
					</tr>
					<tr>
						<td>应还日期</td>
						<td>
							<n-tag v-if="info.returnDeadline" :bordered="false" type="primary">
								{{ info.returnDeadline }}
							</n-tag>
							<NoData v-else />
						</td>
					</tr>
					<tr>
						<td>归还日期</td>
						<td>
							<n-tag v-if="info.returnTime" :bordered="false" type="primary">
								{{ info.returnTime }}
							</n-tag>
							<NoData v-else />
						</td>
					</tr>
					<tr>
						<td>归还状态</td>
						<td>
							<n-tag v-if="info.returnTime" :bordered="false" type="success">已归还</n-tag>
							<n-tag v-else-if="info.returnDeadline >= formatTime(new Date())" :bordered="false"
							       type="warning">
								未归还
							</n-tag>
							<n-tag v-else :bordered="false" type="error">已超期</n-tag>
						</td>
					</tr>

					<tr>
						<td>备注</td>
						<td></td>
					</tr>
					</tbody>
				</n-table>
			</n-gi>
		</n-grid>
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

.trc tr > td:nth-child(2n - 1) {
	text-align: right;
}
</style>
