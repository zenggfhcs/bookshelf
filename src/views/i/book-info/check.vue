<script setup>
import { Service } from "@/api/index.js";
import NoData from "@/components/no-data.vue";
import { B_BOOK_INFO_CHECK } from "@/constant/breadcrumb.js";
import IAdd from "@/icons/i-add.vue";
import IBack from "@/icons/i-back.vue";
import IDelete from "@/icons/i-delete.vue";
import IEdit from "@/icons/i-edit.vue";
import IReload from "@/icons/i-reload.vue";
import { BOOK_INFO } from "@/router/RouterValue.js";
import { checkLoginState } from "@/utils/check-login-state.js";
import { debounce } from "@/utils/debounce.js";
import { formatTime } from "@/utils/format.js";
import { transMouth } from "@/utils/index.js";
import { queryInfo } from "@/utils/query.js";
import { removeItem } from "@/utils/remove.js";
import {
	NButton,
	NFlex,
	NIcon,
	NImage,
	NLayout,
	NLayoutHeader,
	NLayoutSider,
	NModal,
	NSpace,
	NTable,
	NTag,
	NText,
	useMessage,
} from "naive-ui";
import { computed, h, onBeforeMount, onMounted, reactive, ref } from "vue";

const props = defineProps([
	"id",
	"showModal",
	"updateMenuItem",
	"updateBreadcrumbArray",
]);

const loadingQuery = ref(false);

{
	props.updateMenuItem("i-book-info");
	props.updateBreadcrumbArray(B_BOOK_INFO_CHECK(props.id));
}

const message = useMessage();

const source = reactive({
	remark: null,
});

const priceReactive = reactive({
	int: 0,
	dec: 0,
});

const info = reactive({
	id: null,
	isbn: null,
	cip: null,
	bookName: "",
	bookType: null,
	cover: null,
	author: null,
	describe: null,
	publishedDate: null,
	publisher: "",
	edition: "",
	printing: "",
	keyword: null,
	lang: null,
	price: null,
	stock: null,
	createdBy: null,
	creationTime: null,
	updatedBy: null,
	lastUpdatedTime: null,
	remark: null,
	revision: null,
});

const publisherOptions = ref([]);

const typeOptions = ref([]);

const creator = reactive({
	id: null,
	displayName: null,
	name: null,
	surname: null,
	email: null,
	phoneNumber: null,
});

const updater = reactive({
	id: null,
	displayName: null,
	name: null,
	surname: null,
	email: null,
	phoneNumber: null,
});

// todo 编写测试更新功能
const showUpdate = ref(false);

const keywords = ref([]);

function isModified() {
	// 重新界定规则
	return info.remark === source.remark || info.bookName === "";
}

function renderTag(v, i) {
	return h(
		NTag,
		{
			type: "info",
			bordered: false,
			closable: true,
			onClose: () => {
				keywords.value.splice(i, 1);
			},
		},
		{
			default: () => v,
		},
	);
}

const publishedMouth = computed(() => {
	return transMouth(info.publishedDate);
});

const update = debounce(() => {});

async function query(id) {
	loadingQuery.value = true;
	await queryInfo(message, Service.BookInfos.get(id), info, creator, updater);
	loadingQuery.value = false;
}

const queryHandler = debounce(() => {
	if (info.id) {
		query(info.id);
	}
});

const showRemove = ref(false);

function remove() {
	removeItem(message, Service.BookInfos.remove(props.id), BOOK_INFO);
}

function showDeleteConfirmModal() {
	props.showModal("error", "删除二次确认", "您是否要删除？", () => {});
}

onBeforeMount(() => {
	checkLoginState();
});

onMounted(() => {
	query(props.id);
});
</script>

<template>
	<n-layout-header class="top-0 h-3em" position="absolute">
		<n-flex class="h-3em items-center" justify="center">
			<router-link :to="BOOK_INFO">
				<n-button type="tertiary">
					<template #icon>
						<n-icon :component="IBack" />
					</template>
					后退
				</n-button>
			</router-link>
			<n-button
				type="info"
				class="h-2.4em"
				@click.prevent="queryHandler"
				:loading="loadingQuery"
			>
				<template #icon>
					<n-icon :component="IReload" />
				</template>
				刷新
			</n-button>
			<n-button type="error" @click.prevent="showDeleteConfirmModal">
				<template #icon>
					<n-icon :component="IDelete" />
				</template>
				删除
			</n-button>
			<n-button type="warning" @click.prevent="showUpdate = true">
				<template #icon>
					<n-icon :component="IEdit" />
				</template>
				修改
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout
		:native-scrollbar="false"
		class="absolute top-3em bottom-0 left-0 right-0"
		content-style="padding: .3em 1em"
		has-sider
	>
		<n-layout-sider class="p-20px" collapse-mode="width" width="400">
			<n-image :src="info.cover" alt="书籍图片链接" width="360" />
		</n-layout-sider>
		<n-table :single-line="false" class="w-100%">
			<tbody class="trc">
				<tr>
					<td>ISBN</td>
					<td>
						<n-tag :bordered="false" type="error">
							{{ info.isbn }}
						</n-tag>
					</td>
					<td>CIP</td>
					<td>
						<n-tag :bordered="false" type="error">
							{{ info.cip }}
						</n-tag>
					</td>
				</tr>
				<tr>
					<td>名称</td>
					<td>
						{{ info.bookName }}
					</td>
					<td>作者</td>
					<td>
						<span v-if="info.author">{{ info.author }}</span>
						<NoData v-else />
					</td>
				</tr>
				<tr>
					<td>中图法分类号</td>
					<td colspan="3">
						<n-tag :bordered="false" type="default">
							{{ info.bookType }}
						</n-tag>
					</td>
				</tr>
				<tr>
					<td>主题词</td>
					<td colspan="3">
						<n-tag
							v-for="(item, index) in info.keyword
								?.toString()
								?.split('－')"
							:key="index"
							:bordered="false"
							class="m-l-1"
							type="info"
						>
							{{ item }}
						</n-tag>
						<!--					<n-dynamic-tags v-model:value="keywords" :render-tag="renderTag"/>-->
					</td>
				</tr>
				<tr>
					<td>正文语种</td>
					<td colspan="3">
						<n-tag :bordered="false" type="default">
							{{ info.lang }}
						</n-tag>
					</td>
				</tr>
				<tr>
					<td>价格</td>
					<td colspan="3">
						<n-tag :bordered="false" type="default">
							{{ info.price }}
						</n-tag>
					</td>
				</tr>
				<tr>
					<td colspan="4">&nbsp;</td>
				</tr>
				<tr>
					<td>出版社</td>
					<td>
						<n-tag v-if="info.publisher" :bordered="false" type="default">
							{{ info.publisher }}
						</n-tag>
						<NoData v-else />
					</td>
					<td class="w-30">出版日期</td>
					<td colspan="3">
						<n-tag
							v-if="info.publishedDate"
							:bordered="false"
							type="default"
						>
							<!--								 todo yyyy-MM	-->
							{{ publishedMouth }}
						</n-tag>
						<NoData v-else />
					</td>
				</tr>
				<tr>
					<td>版次</td>
					<td>
						<n-tag v-if="info.edition" :bordered="false" type="default">
							{{ info.edition }}
						</n-tag>
						<NoData v-else />
					</td>
					<td>印次</td>
					<td>
						<n-tag v-if="info.printing" :bordered="false" type="default">
							{{ info.printing }}
						</n-tag>
						<NoData v-else />
					</td>
				</tr>
				<tr>
					<td>内容摘要</td>
					<td colspan="3">
						<n-text class="w-70%">
							{{ info.describe }}
						</n-text>
					</td>
				</tr>
				<tr>
					<td>库存量</td>
					<td colspan="3">
						<n-tag
							v-if="typeof info.stock != 'number' && info.stock >= 0"
							:bordered="false"
							type="info"
						>
							{{ info.stock }}
						</n-tag>
						<NoData v-else />
					</td>
				</tr>
				<tr>
					<td colspan="4">&nbsp;</td>
				</tr>
				<tr>
					<td>创建者</td>
					<td style="padding: 0">
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
											{{ creator.surname }}
										</n-tag>
										<n-tag
											:bordered="false"
											class="m-l-1"
											type="primary"
										>
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
						<NoData v-else />
					</td>
					<td>更新者</td>
					<td style="padding: 0">
						<n-table
							v-if="info.updatedBy"
							:bordered="false"
							:single-line="false"
						>
							<tbody class="trc">
								<tr>
									<td>用户名</td>
									<td>
										<n-tag :bordered="false" type="primary">
											{{ updater.surname }}
										</n-tag>
										<n-tag
											:bordered="false"
											class="m-l-1"
											type="primary"
										>
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
					<td colspan="3">
						<n-text v-if="info.remark">
							{{ info.remark }}
						</n-text>
						<NoData v-else />
					</td>
				</tr>
			</tbody>
		</n-table>
	</n-layout>

	<!--   更新面板   -->
	<n-modal
		id="update-modal"
		v-model:show="showUpdate"
		preset="dialog"
		title="修改二次确认"
		type="warning"
	>
		<n-space vertical>
			<span> 您是否要行以下修改？ </span>
			<n-table :single-line="false">
				<tbody>
					<tr>
						<td class="w-6em">修改内容</td>
						<td>原有值</td>
						<td>新值</td>
					</tr>
					<tr v-if="info.name !== source.name">
						<td class="text-center">
							<n-tag type="info"> 名称</n-tag>
						</td>
						<td>
							<n-tag type="success">
								{{ source.name }}
							</n-tag>
						</td>
						<td>
							<n-tag type="warning">
								{{ info.name }}
							</n-tag>
						</td>
					</tr>
					<tr v-if="info.remark !== source.remark">
						<td class="text-center">
							<n-tag type="info"> 备注</n-tag>
						</td>
						<td>
							<n-tag type="success">
								{{ source.name }}
							</n-tag>
						</td>
						<td>
							<n-tag type="warning">
								{{ info.name }}
							</n-tag>
						</td>
					</tr>
				</tbody>
			</n-table>
			<n-flex justify="right">
				<n-button type="warning" @click.prevent="update"> 修改</n-button>
			</n-flex>
		</n-space>
	</n-modal>
</template>

<style scoped>
.trc tr > td:nth-child(2n - 1) {
	text-align: right;
}
</style>
