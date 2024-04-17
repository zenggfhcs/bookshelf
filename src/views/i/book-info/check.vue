<script setup>
import { Service } from "@/api/index.js";
import NoData from "@/components/no-data.vue";
import { B_BOOK_INFO_CHECK } from "@/constant/breadcrumb.js";
import { LANG_TYPE_PRE_DEFINED } from "@/constant/map.js";
import IBack from "@/icons/i-back.vue";
import IDelete from "@/icons/i-delete.vue";
import IEdit from "@/icons/i-edit.vue";
import IReload from "@/icons/i-reload.vue";
import { BOOK_INFO } from "@/router/RouterValue.js";
import { checkLoginState } from "@/utils/check-login-state.js";
import { debounce } from "@/utils/debounce.js";
import { dateDisabled } from "@/utils/disabled.js";
import { formatTime } from "@/utils/format.js";
import { transMouth } from "@/utils/index.js";
import { queryInfo } from "@/utils/query.js";
import { removeItem } from "@/utils/remove.js";
import { inputValidator } from "@/utils/validator.js";
import {
	NButton,
	NDatePicker,
	NDynamicTags,
	NFlex,
	NForm,
	NFormItem,
	NIcon,
	NImage,
	NInput,
	NInputGroup,
	NInputGroupLabel,
	NInputNumber,
	NLayout,
	NLayoutHeader,
	NLayoutSider,
	NSelect,
	NTable,
	NTag,
	NText,
	NUpload,
	useMessage
} from "naive-ui";
import { computed, h, onBeforeMount, onMounted, reactive, ref } from "vue";

const props = defineProps([
	"id",
	"showModal",
	"updateMenuItem",
	"updateBreadcrumbArray"
]);

const loadingQuery = ref(false);

{
	props.updateMenuItem("i-book-info");
	props.updateBreadcrumbArray(B_BOOK_INFO_CHECK(props.id));
}

const message = useMessage();

const source = reactive({
	remark: null
});

const priceReactive = reactive({
	int: 0,
	dec: 0
});

const info = reactive({
	id: null,
	isbn: null,
	cip: null,
	bookName: "",
	bookType: null,
	cover: "",
	author: null,
	describe: null,
	publishedDate: null,
	publisher: "",
	edition: 1,
	printing: 1,
	keyword: null,
	lang: null,
	price: null,
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

const publisherOptions = ref([]);

const typeOptions = ref([]);

// todo 编写测试更新功能
const isUpdatingRef = ref(false);

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
			}
		},
		{
			default: () => v
		}
	);
}

const publishedMouth = computed(() => {
	return transMouth(info.publishedDate);
});

const update = debounce(() => {
});

async function query(id) {
	loadingQuery.value = true;
	await queryInfo(message, Service.BookInfos.get(id), info);
	loadingQuery.value = false;
}

const queryHandler = debounce(() => {
	if (props.id) {
		query(props.id);
	}
});

const showRemove = ref(false);

function remove() {
	removeItem(message, Service.BookInfos.remove(props.id), BOOK_INFO);
}

function showDeleteConfirmModal() {
	props.showModal("error", "删除二次确认", "您是否要删除？", remove);
}

onBeforeMount(() => {
	checkLoginState();
});

onMounted(() => {
	query(props.id);
});

//#region update
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const loadingQueryType = ref(false);

const typeOptionsRef = ref([]);

function handleQueryType() {

}

const keywordsRef = ref([]);

function addKeyword(l) {
	l = l?.toString().trim();
	let _i = keywordsRef.value.length;
	if (l === "" || (_i = keywordsRef.value.indexOf(l)) !== -1) {
		setTimeout(() => {
			keywordsRef.value.splice(_i, 1);
		});
	}

	return l;
}

const defaultFileListRef = ref([
	{
		id: "c",
		name: ".png",
		status: "finished",
		url: computed(() => info.cover)
	}
]);

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion
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
				:loading="loadingQuery"
				class="h-2.4em"
				type="info"
				@click.prevent="queryHandler"
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
			<n-button v-show="!isUpdatingRef" type="warning" @click.prevent="isUpdatingRef = true">
				<template #icon>
					<n-icon :component="IEdit" />
				</template>
				修改
			</n-button>
			<n-button v-show="isUpdatingRef" type="warning" @click.prevent="isUpdatingRef = false">
				<template #icon>
					<n-icon :component="IEdit" />
				</template>
				取消修改
			</n-button>
			<n-button v-show="isUpdatingRef" type="warning" @click.prevent="isUpdatingRef = false">
				<template #icon>
					<n-icon :component="IEdit" />
				</template>
				更新
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout
		:native-scrollbar="false"
		class="absolute top-3em bottom-0 left-0 right-0"
		content-style="padding: .3em 1em"
		has-sider
	>
		<n-flex class="w-100%" style="flex-flow: nowrap;">
			<n-layout-sider class="p-20px" collapse-mode="width" width="400">
				<n-upload v-if="isUpdatingRef"
				          :default-file-list="defaultFileListRef"
				          :max="1"
				          action="http://10.3.105.0:9090/bookInfos/cover:upload"
				          list-type="image-card"
				/>
				<n-image v-else :src="info.cover" alt="书籍图片链接" width="360" />
			</n-layout-sider>
			<n-form :show-feedback="false" :show-label="false" class="flex-auto">
				<n-table :single-line="false" class="w-100%">
					<tbody class="trc">
					<tr>
						<td class="w-12%">ISBN</td>
						<td class="w-38%">
							<n-form-item v-if="isUpdatingRef" path="isbn">
								<n-input
									v-model:value="info.isbn"
									:allow-input="inputValidator.noSideSpace"
									clearable
									maxlength="32"
									placeholder="输入"
								/>
							</n-form-item>
							<n-tag v-else :bordered="false" type="error">
								{{ info.isbn }}
							</n-tag>
						</td>
						<td class="w-12%">CIP&nbsp;核准号</td>
						<td class="w-38%">
							<n-form-item v-if="isUpdatingRef" path="cip">
								<n-input
									v-model:value="info.cip"
									:allow-input="inputValidator.noSideSpace"
									clearable
									maxlength="32"
									placeholder="输入"
								/>
							</n-form-item>
							<n-tag v-else :bordered="false" type="error">
								{{ info.cip }}
							</n-tag>
						</td>
					</tr>
					<tr>
						<td>名称</td>
						<td>
							<n-form-item v-if="isUpdatingRef" path="bookName">
								<n-input
									v-model:value="info.bookName"
									:allow-input="inputValidator.noSideSpace"
									clearable
									maxlength="32"
									placeholder="输入"
								/>
							</n-form-item>
							<span v-else>{{ info.bookName }}</span>
						</td>
						<td>作者</td>
						<td>
							<n-form-item v-if="isUpdatingRef" path="author">
								<n-input
									v-model:value="info.author"
									:allow-input="inputValidator.noSideSpace"
									clearable
									maxlength="32"
									placeholder="输入"
								/>
							</n-form-item>
							<span v-else-if="info.author">{{ info.author }}</span>
							<NoData v-else />
						</td>
					</tr>
					<tr>
						<td>中图法分类号</td>
						<td colspan="3">
							<n-form-item v-if="isUpdatingRef" path="bookType">
								<n-select
									v-model:value="info.bookType"
									:loading="loadingQueryType"
									:options="typeOptionsRef"
									clearable
									filterable
									placeholder="查找类型"
									remote
									@search="handleQueryType"
								/>
							</n-form-item>
							<n-tag v-else :bordered="false" type="default">
								{{ info.bookType }}
							</n-tag>
						</td>
					</tr>
					<tr>
						<td>主题词</td>
						<td colspan="3">
							<n-form-item v-if="isUpdatingRef" path="keyword">
								<n-dynamic-tags
									v-model:value="keywordsRef"
									:render-tag="renderTag"
									@create="addKeyword"
								/>
							</n-form-item>
							<n-tag
								v-for="(item, index) in info.keyword
								?.toString()
								?.split('－')"
								v-else
								:key="index"
								:bordered="false"
								class="m-r-3"
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
							<n-form-item v-if="isUpdatingRef" path="lang">
								<n-select
									v-model:value="info.lang"
									:options="LANG_TYPE_PRE_DEFINED"
									filterable
									placeholder="选择语种"
								/>
							</n-form-item>
							<n-tag v-else :bordered="false" type="default">
								{{ info.lang }}
							</n-tag>
						</td>
					</tr>
					<tr>
						<td>价格</td>
						<td colspan="3">
							<n-form-item v-if="isUpdatingRef" path="price">
								<n-input-group class="w-100%">
									<n-input-number
										v-model:value="priceReactive.int"
										:min="0"
										clearable
										placeholder="整数部分"
									/>
									<n-input-group-label class="text-center"
									>·
									</n-input-group-label>
									<n-input-number
										v-model:value="priceReactive.dec"
										:max="99"
										:min="1"
										clearable
										placeholder="小数部分"
									/>
								</n-input-group>
							</n-form-item>
							<n-tag v-else :bordered="false" type="default">
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
							<n-form-item v-if="isUpdatingRef" path="publisher">
								<n-input
									v-model:value="info.publisher"
									clearable
									maxlength="32"
									placeholder="输入出版社"
								/>
							</n-form-item>
							<n-tag v-else-if="info.publisher" :bordered="false" type="default">
								{{ info.publisher }}
							</n-tag>
							<NoData v-else />
						</td>
						<td class="w-30">出版日期</td>
						<td colspan="3">
							<n-form-item v-if="isUpdatingRef" path="publishedDate">
								<n-date-picker
									v-model:formatted-value="info.publishedDate"
									:is-date-disabled="dateDisabled"
									class="w-100%"
									clearable
									type="month"
									update-value-on-close
									value-format="yyyy-MM-dd"
								/>
							</n-form-item>
							<n-tag
								v-else-if="info.publishedDate"
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
							<n-form-item v-if="isUpdatingRef" path="edition">
								<n-input-number
									v-model:value="info.edition"
									:min="1"
									class="w-100%"
									clearable
									placeholder="版次"
								/>
							</n-form-item>
							<n-tag v-else-if="info.edition" :bordered="false" type="default">
								{{ info.edition }}
							</n-tag>
							<NoData v-else />
						</td>
						<td>印次</td>
						<td>
							<n-form-item v-if="isUpdatingRef" path="printing">
								<n-input-number
									v-model:value="info.printing"
									:min="1"
									class="w-100%"
									clearable
									placeholder="印次"
								/>
							</n-form-item>
							<n-tag v-else-if="info.printing" :bordered="false" type="default">
								{{ info.printing }}
							</n-tag>
							<NoData v-else />
						</td>
					</tr>
					<tr>
						<td>内容摘要</td>
						<td colspan="3">
							<n-form-item v-if="isUpdatingRef" path="describe">
								<n-input
									v-model:value="info.describe"
									:allow-input="inputValidator.noSideSpace"
									autosize
									clearable
									maxlength="255"
									placeholder="输入"
									type="textarea"
								/>
							</n-form-item>
							<n-text v-else-if="info.describe" class="w-70%">
								{{ info.describe }}
							</n-text>
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
						<td colspan="3">

							<n-form-item v-if="isUpdatingRef" path="remark">
								<n-input
									v-model:value="info.remark"
									:allow-input="inputValidator.noSideSpace"
									autosize
									clearable
									maxlength="255"
									placeholder="输入备注"
									type="textarea"
								/>
							</n-form-item>
							<n-text v-else-if="info.remark">
								{{ info.remark }}
							</n-text>
							<NoData v-else />
						</td>
					</tr>
					</tbody>
				</n-table>
			</n-form>

		</n-flex>
	</n-layout>

</template>

<style scoped>
.trc tr > td:nth-child(2n - 1) {
	text-align: right;
}

:deep(.n-upload .n-upload-file-list .n-upload-file.n-upload-file--image-card-type),
:deep(.n-upload .n-upload-file-list .n-upload-trigger.n-upload-trigger--image-card) {
	width: 360px;
	height: 720px;
}
</style>
