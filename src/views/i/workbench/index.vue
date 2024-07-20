<script setup>
import { action } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { B_I } from "@/constant/breadcrumb.js";
import { messageOptions } from "@/constant/options.js";
import IIn from "@/icons/i-in.vue";
import IOut from "@/icons/i-out.vue";
import { debounce } from "@/utils/debounce.js";
import {
	NButton,
	NCard,
	NFlex,
	NForm,
	NFormItem,
	NGi,
	NGrid,
	NIcon,
	NLayout,
	NModal,
	NNumberAnimation,
	NSelect,
	NTable,
	NTag,
	NText,
	useMessage
} from "naive-ui";
import { computed, h, onMounted, reactive, ref } from "vue";

const props = defineProps({
	updateMenuItem: Function,
	updateBreadcrumbArray: Function
});

const message = useMessage();

const restoreBookRef = ref(null);

const restoreBook = computed(() => restoreBookRef.value ? JSON.parse(restoreBookRef.value) : null);


const debitBookRef = ref(null);

const debitBook = computed(() => debitBookRef.value ? JSON.parse(debitBookRef.value) : null);

const debitUserRef = ref(null);

const debitUserInfo = computed(() => debitUserRef.value ? JSON.parse(debitUserRef.value) : null);

const info = reactive({
	createdBy: null,
	book: null
});

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
		render: (row) =>
			h(
				NTag,
				{
					type: "info",
					bordered: false
				},
				{
					default: () => row?.id
				}
			)
	}
];

const isShowDebitModalRef = ref(false);

const isShowRestoreModalRef = ref(false);

function showDebitModal() {
	bookOptionsRef.value = [];
	userOptionsRef.value = [];
	debitBookRef.value = null;
	debitUserRef.value = null;
	isShowDebitModalRef.value = true;
}

function showReturnModal() {
	bookOptionsRef.value = [];
	restoreBookRef.value = null;
	isShowRestoreModalRef.value = true;
}

const loadingQueryBookRef = ref(false);

const bookOptionsRef = ref([]);

const handleQueryDebitBook = debounce((keyword) => {
	queryBook(`debit_${keyword}`);
}, 100);

const handleQueryRestoreBook = debounce((keyword) => {
	queryBook(`restore_${keyword}`);

}, 100);

function queryBook(keyword) {
	if (!keyword) {
		bookOptionsRef.value = [];
		return;
	}

	action(message, Service.Books.getByKeyword(keyword), (res) => {
		bookOptionsRef.value = res?.map((item) => {
			return {
				label: `${item.id} | ${item.bookInfo.bookName} | ${item.bookInfo.author} | ${item.bookInfo.isbn}`,
				value: JSON.stringify(item)
			};
		});
	}, () => {
		bookOptionsRef.value = [];
	});
}

const loadingQueryUserRef = ref(false);

const userOptionsRef = ref([]);

const handleQueryUser = debounce((keyword) => {
	if (!keyword) {
		userOptionsRef.value = [];
		return;
	}

	action(message, Service.Users.getByKeyword(keyword), (res) => {
		userOptionsRef.value = res?.map((item) => {
			return {
				label: `${item.id} | ${item.surname} ${item.name} | ${item.phoneNumber} | ${item.email}`,
				value: JSON.stringify(item)
			};
		});
	}, () => {
		userOptionsRef.value = [];
	});
}, 100);

const restoreHandler = debounce(() => {
	if (!(restoreBookRef.value)) {
		message.warning("归还信息不完整", messageOptions);
		return;
	}

	info.book = restoreBook;
	action(message, Service.Books.restore(info.book), () => {
		message.success("归还成功", messageOptions);
		isShowRestoreModalRef.value = false;
	});
});

const debitHandler = debounce(() => {
	if (!(debitBookRef.value && debitUserRef.value)) {
		message.warning("借阅信息不完整", messageOptions);
		return;
	}
	info.createdBy = debitUserInfo;
	info.book = debitBook;

	action(message, Service.Books.borrow(info), () => {
		message.success("借阅成功", messageOptions);
		isShowDebitModalRef.value = false;
	});
});

const todayDebitCount = reactive({
	from: 0,
	to: 0
});

const todayRestoreCount = reactive({
	from: 0,
	to: 0
});

const todayActiveUserCount = reactive({
	from: 0,
	to: 0
});

const todayNewUserCount = reactive({
	from: 0,
	to: 0
});

onMounted(async () => {
	props.updateMenuItem("workbench");
	props.updateBreadcrumbArray(B_I);

	Service.Debits.getTodayDebitCount().then(res => {
		todayDebitCount.to = +res;
	});

	Service.Debits.getTodayRestoreCount().then(res => {
		todayRestoreCount.to = +res;
	});


	Service.Users.todayActiveUserCount().then(res => {
		todayActiveUserCount.to = +res;
	});

	Service.Users.todayNewUserCount().then(res => {
		todayNewUserCount.to = +res;
	});
});
</script>

<template>
	<n-layout
		:native-scrollbar="false"
		content-class="p-1em"
		position="absolute">
		<n-grid :cols="2" :x-gap="14" :y-gap="14">
			<n-gi>
				<n-card title="今日借阅">
					<n-number-animation
						ref="numberAnimationInstRef"
						:from="todayDebitCount.from"
						:to="todayDebitCount.to"
					/>
				</n-card>
			</n-gi>
			<n-gi>
				<n-card title="今日归还">
					<n-number-animation
						ref="numberAnimationInstRef"
						:from="todayRestoreCount.from"
						:to="todayRestoreCount.to"
					/>
				</n-card>
			</n-gi>
			<n-gi>
				<n-card title="今日活跃用户">
					<n-number-animation
						ref="numberAnimationInstRef"
						:from="todayActiveUserCount.from"
						:to="todayActiveUserCount.to"
					/>
				</n-card>
			</n-gi>
			<n-gi>
				<n-card title="今日新增用户">
					<n-number-animation
						ref="numberAnimationInstRef"
						:from="todayNewUserCount.from"
						:to="todayNewUserCount.to"
					/>
				</n-card>
			</n-gi>
			<n-gi :span="2">
				<n-card @click.prevent="showDebitModal" class="cursor-pointer">
					<n-flex justify="center" class="h-10em items-center">
						<n-icon size="40" :component="IOut" />
						<n-text class="font-size-3em">借阅</n-text>
					</n-flex>
				</n-card>
			</n-gi>
			<n-gi :span="2">
				<n-card @click.prevent="showReturnModal" class="cursor-pointer">
					<n-flex justify="center" class="h-10em items-center">
						<n-icon size="40" :component="IIn" />
						<n-text class="font-size-3em">归还</n-text>
					</n-flex>
				</n-card>
			</n-gi>
		</n-grid>
		<n-modal
			id="debit-modal"
			v-model:show="isShowDebitModalRef"
			:mask-closable="false"
			title="借阅"
			transform-origin="center"
		>
			<n-card class="w-50em" title="借阅">
				<n-form>
					<n-form-item label="借阅图书">
						<n-select
							v-model:value="debitBookRef"
							:loading="loadingQueryBookRef"
							:options="bookOptionsRef"
							clearable
							filterable
							placeholder="查找书籍"
							remote
							@search="handleQueryDebitBook"
						/>
					</n-form-item>
					<n-table v-show="debitBookRef" class="m-b-1.5em">
						<tbody>
						<tr>
							<td class="w-43%">书籍序列号</td>
							<td>
								<n-tag :bordered="false" type="info">
									{{ debitBook?.id }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td class="w-43%">题名</td>
							<td>
								<n-tag :bordered="false" type="info">
									{{ debitBook?.bookInfo?.bookName }}&nbsp;|&nbsp;{{ debitBook?.bookInfo?.author }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>ISBN</td>
							<td>
								<n-tag :bordered="false" type="default">
									{{ debitBook?.bookInfo?.isbn }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>CIP</td>
							<td>
								<n-tag :bordered="false" type="default">
									{{ debitBook?.bookInfo?.cip }}
								</n-tag>
							</td>
						</tr>
						</tbody>
					</n-table>
					<n-form-item label="借阅者">
						<n-select
							v-model:value="debitUserRef"
							:loading="loadingQueryUserRef"
							:options="userOptionsRef"
							clearable
							filterable
							placeholder="查找借阅者"
							remote
							@search="handleQueryUser"
						/>
					</n-form-item>
					<n-table v-show="debitUserRef" class="m-b-1.5em">
						<tbody>
						<tr>
							<td class="w-43%">用户编号</td>
							<td>
								<n-tag :bordered="false" type="info">
									{{ debitUserInfo?.id }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>用户昵称</td>
							<td>{{ debitUserInfo?.displayName }}</td>
						</tr>
						<tr>
							<td>用户名</td>
							<td>
								<n-tag :bordered="false" type="primary">
									{{ debitUserInfo?.surname }}
								</n-tag>
								<n-tag
									:bordered="false"
									class="m-l-1"
									type="primary"
								>
									{{ debitUserInfo?.name }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>邮箱</td>
							<td>
								<n-tag :bordered="false" type="error">
									{{ debitUserInfo?.email }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>电话</td>
							<td>
								<n-tag :bordered="false" type="error">
									{{ debitUserInfo?.phoneNumber }}
								</n-tag>
							</td>
						</tr>
						</tbody>
					</n-table>
				</n-form>
				<n-flex justify="space-between">
					<n-button type="tertiary" @click.prevent="isShowDebitModalRef = false">
						关闭
					</n-button>
					<n-button type="success" @click.prevent="debitHandler">
						提交
					</n-button>
				</n-flex>
			</n-card>
		</n-modal>
		<n-modal
			id="return-modal"
			v-model:show="isShowRestoreModalRef"
			:mask-closable="false"
			title="归还"
			transform-origin="center"
		>
			<n-card class="w-50em" title="归还">
				<n-form>
					<n-form-item label="归还图书">
						<n-select
							v-model:value="restoreBookRef"
							:loading="loadingQueryBookRef"
							:options="bookOptionsRef"
							clearable
							filterable
							placeholder="查找书籍"
							remote
							@search="handleQueryRestoreBook"
						/>
					</n-form-item>
					<n-table v-show="restoreBookRef" class="m-b-1.5em">
						<tbody>
						<tr>
							<td class="w-43%">书籍序列号</td>
							<td>
								<n-tag :bordered="false" type="info">
									{{ restoreBook?.id }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td class="w-43%">题名</td>
							<td>
								<n-tag :bordered="false" type="info">
									{{ restoreBook?.bookInfo?.bookName }}&nbsp;|&nbsp;{{ restoreBook?.bookInfo?.author }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>ISBN</td>
							<td>
								<n-tag :bordered="false" type="default">
									{{ restoreBook?.bookInfo?.isbn }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>CIP</td>
							<td>
								<n-tag :bordered="false" type="default">
									{{ restoreBook?.bookInfo?.cip }}
								</n-tag>
							</td>
						</tr>
						</tbody>
					</n-table>
				</n-form>
				<n-flex justify="space-between">
					<n-button type="tertiary" @click.prevent="isShowRestoreModalRef = false">
						关闭
					</n-button>
					<n-button type="warning" @click.prevent="restoreHandler">
						提交
					</n-button>
				</n-flex>
			</n-card>
		</n-modal>
	</n-layout>
</template>

<style scoped>
.n-table tr td:first-child {
	text-align: right;
}

</style>
