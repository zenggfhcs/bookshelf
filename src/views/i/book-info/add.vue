<script setup>
import { action, addItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { B_BOOK_INFO_ADD } from "@/constant/breadcrumb.js";
import { Header } from "@/constant/Header.js";
import { LANG_TYPE_PRE_DEFINED } from "@/constant/map.js";
import { messageOptions } from "@/constant/options.js";
import IAdd from "@/icons/i-add.vue";
import IBack from "@/icons/i-back.vue";
import { goto } from "@/router/goto.js";
import { BOOK_INFO } from "@/router/route-value.js";
import { local } from "@/storage/local.js";
import { convertToChineseNum, optional } from "@/utils/convert.js";
import { debounce } from "@/utils/debounce.js";
import { dateDisabled } from "@/utils/disabled.js";
import { formValidator, inputValidator } from "@/utils/validator.js";
import {
	NButton,
	NCard,
	NDatePicker,
	NDynamicTags,
	NFlex,
	NForm,
	NFormItem,
	NGi,
	NGrid,
	NIcon,
	NInput,
	NInputGroup,
	NInputGroupLabel,
	NInputNumber,
	NLayout,
	NLayoutHeader,
	NSelect,
	NTag,
	NUpload,
	useMessage
} from "naive-ui";
import { computed, h, onMounted, reactive, ref } from "vue";

const props = defineProps({
	showModal: Function,
	updateMenuItem: Function,
	updateBreadcrumbArray: Function
});

const message = useMessage();

const loadingAdd = ref(false);

const priceReactive = reactive({
	int: null,
	dec: null
});

const coverHeaders = {
	"Access-Control-Allow-Origin": "*"
};
coverHeaders[Header.TOKEN] = local.get(Header.TOKEN);

const keywordsRef = ref([]);

const editionRef = ref(1);

const printingRef = ref(1);

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
	publishedPlace: "",
	edition: computed(() => `第${convertToChineseNum(editionRef.value)}版`),
	printing: computed(() => `第${convertToChineseNum(printingRef.value)}次`),
	keyword: computed(() => keywordsRef.value.join("－")),
	lang: null,
	price: computed(
		() =>
			+`${optional(priceReactive.int, 0)}${priceReactive.dec ? "." + priceReactive.dec : ""}`
	),
	stock: 0,
	remark: null
});

const addFormRef = ref();

const rules = {
	bookName: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入"
		}
	],
	isbn: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入"
		}
	],
	cip: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入"
		}
	],

	bookType: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入"
		}
	],
	author: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入"
		}
	],
	describe: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入"
		}
	],
	keyword: [
		{
			required: true,
			trigger: ["blur"],
			validator(_, value) {
				if (value === undefined || value === null || value.length === 0) {
					return new Error("需要主题词");
				}
			}
		}
	],
	lang: [
		{
			required: true,
			trigger: ["blur"],
			message: "请选择"
		}
	],
	price: [
		{
			required: true,
			trigger: ["blur"],
			validator(_, value) {
				if (
					value === undefined ||
					value === null ||
					value.length === 0 ||
					value === "null" ||
					value === "0"
				) {
					return new Error("需要售价");
				}
			}
		}
	],
	publishedDate: [
		{
			required: true,
			trigger: ["blur"],
			message: "请选择"
		}
	],
	publisher: [
		{
			required: true,
			trigger: ["blur"],
			message: "请输入"
		}
	],
	edition: [
		{
			required: true,
			trigger: ["blur", "input"],
			validator(_, value) {
				if (
					value === undefined ||
					value === null ||
					value.length === 0 ||
					value.toString().includes("null")
				) {
					return new Error("请输入");
				}
			}
		}
	],
	printing: [
		{
			required: true,
			trigger: ["blur", "input"],
			validator(_, value) {
				if (
					value === undefined ||
					value === null ||
					value.length === 0 ||
					value.toString().includes("null")
				) {
					return new Error("请输入");
				}
			}
		}
	],
	stock: [
		{
			required: true,
			trigger: ["blur", "input"],
			validator(_, value) {
				console.log(value);
				if (
					value === undefined ||
					value === null ||
					value.length === 0 ||
					value.toString().includes("null")
				) {
					return new Error("请输入");
				}
			}
		}
	]
};

const typeOptionsRef = ref([]);

function addKeyword(l) {
	l = l?.toString().trim();

	let _i = keywordsRef.value.length;
	if (l === "" || keywordsRef.value.indexOf(l) !== -1) {
		setTimeout(() => {
			keywordsRef.value.splice(_i, 1);
		}, 100);
	}

	return l;
}

function renderTag(v, i) {
	return h(
		NTag,
		{
			type: "info",
			bordered: false,
			closable: true,
			onClose: () => {
				keywordsRef.value.splice(i, 1);
			}
		},
		{
			default: () => v
		}
	);
}

// const handleQueryType = debounce((queryKeyword) => {
// 	if (!queryKeyword) {
// 		typeOptionsRef.value = [];
// 		return;
// 	}
//
// 	action(message, Service.ClcIndexes.getByKeyword(queryKeyword), (res) => {
// 		typeOptionsRef.value = res?.map((item) => {
// 			return {
// 				label: `${item.key}:${item.value}`,
// 				value: `${item.value}`
// 			};
// 		});
// 	}, () => {
// 		typeOptionsRef.value = [];
// 	});
// }, 100);

const add = debounce(() => {
	console.log(info);
	formValidator(addFormRef, message, async () => {
		loadingAdd.value = true;
		await addItem(message, Service.BookInfos.add(info), (_) => {
			message.success("添加成功", messageOptions);
			goto(BOOK_INFO);
		});
		loadingAdd.value = false;
	});
});

function beforeUpload(data) {
	if (data.file.file?.type === "image/png") {
		return true;
	}
	message.error("只能上传png格式的图片文件，请重新上传", messageOptions);
	return false;
}

function handleUploadCoverFinish({ file, event }) {
	const response = JSON.parse(event.target?.response);
	info.cover = response.data;
	return file;
}

function handleUploadCoverError({ file, event }) {
	const response = JSON.parse(event.target?.response);
	message.error(response.message, messageOptions);
	return file;
}

function removeCover() {
	// todo data
	info.cover = "";
}

onMounted(() => {
	props.updateMenuItem("bookInfo");
	props.updateBreadcrumbArray(B_BOOK_INFO_ADD);
});
</script>

<template>
	<n-layout-header class="top-0 h-3em" position="absolute">
		<n-flex class="items-center h-3em" justify="center">
			<router-link :to="BOOK_INFO">
				<n-button type="tertiary">
					<template #icon>
						<n-icon :component="IBack" />
					</template>
					后退
				</n-button>
			</router-link>
			<n-button :loading="loadingAdd" type="success" @click.prevent="add">
				<template #icon>
					<n-icon :component="IAdd" />
				</template>
				提交
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout
		:native-scrollbar="false"
		class="absolute top-3em bottom-0 left-0 right-0"
		content-style="padding: .3em 1em"
	>
		<n-card>
			<n-form
				ref="addFormRef"
				:model="info"
				:rules="rules"
				label-placement="left"
				label-width="auto"
			>
				<n-grid cols="7">
					<n-gi span="2">
						<n-form-item label="封面" label-placement="top">
							<n-upload
								:headers="coverHeaders"
								:max="1"
								action="http://10.3.105.0:9090/bookInfos/cover:upload"
								list-type="image-card"
								@error="handleUploadCoverError"
								@finish="handleUploadCoverFinish"
								@remove="removeCover"
								@before-upload="beforeUpload"
							/>
						</n-form-item>
					</n-gi>
					<n-gi span="3">
						<n-form-item label="名称" path="bookName">
							<n-input
								v-model:value="info.bookName"
								:allow-input="inputValidator.noSideSpace"
								clearable
								maxlength="32"
								placeholder="输入"
							/>
						</n-form-item>
						<n-form-item label="ISBN" path="isbn">
							<n-input
								v-model:value="info.isbn"
								:allow-input="inputValidator.noSideSpace"
								clearable
								maxlength="32"
								placeholder="输入"
							/>
						</n-form-item>
						<n-form-item label="CIP" path="cip">
							<n-input
								v-model:value="info.cip"
								:allow-input="inputValidator.noSideSpace"
								clearable
								maxlength="32"
								placeholder="输入"
							/>
						</n-form-item>
						<n-form-item label="中图法分类号" path="bookType">
							<!--							<n-select-->
							<!--								v-model:value="info.bookType"-->
							<!--								:loading="loadingQueryType"-->
							<!--								:options="typeOptionsRef"-->
							<!--								clearable-->
							<!--								filterable-->
							<!--								placeholder="查找类型"-->
							<!--								remote-->
							<!--								@search="handleQueryType"-->
							<!--							/>-->
							<n-input
								v-model:value="info.bookType"
								:allow-input="inputValidator.noSideSpace"
								clearable
								maxlength="32"
								placeholder="输入"
							/>
						</n-form-item>
						<n-form-item label="作者" path="author">
							<n-input
								v-model:value="info.author"
								:allow-input="inputValidator.noSideSpace"
								clearable
								maxlength="32"
								placeholder="输入"
							/>
						</n-form-item>
						<n-form-item label="内容摘要" path="describe">
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
						<n-form-item label="主题词" path="keyword">
							<n-dynamic-tags
								v-model:value="keywordsRef"
								:render-tag="renderTag"
								@create="addKeyword"
							/>
						</n-form-item>
						<n-form-item label="正文语种" path="lang">
							<n-select
								v-model:value="info.lang"
								:options="LANG_TYPE_PRE_DEFINED"
								filterable
								placeholder="选择语种"
							/>
						</n-form-item>
						<n-form-item label="售价" path="price">
							<n-input-group class="w-100%">
								<n-input-number
									v-model:value="priceReactive.int"
									:min="0"
									clearable
									placeholder="整数部分"
								/>
								<n-input-group-label class="text-center"
								>.
								</n-input-group-label>
								<n-input-number v-model:value="priceReactive.dec"
								                :max="99"
								                :min="1"
								                class="flex-1"
								                clearable
								                placeholder="小数部分"
								/>
							</n-input-group>
						</n-form-item>
						<n-form-item label="出版日期" path="publishedDate">
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
						<n-form-item label="出版社" path="publisher">
							<n-input
								v-model:value="info.publisher"
								clearable
								maxlength="32"
								placeholder="输入出版社"
							/>
						</n-form-item>
						<n-form-item label="版次" path="edition">
							<n-input-number
								v-model:value="editionRef"
								:min="1"
								class="w-100%"
								clearable
								placeholder="版次"
							/>
						</n-form-item>
						<n-form-item label="印次" path="printing">
							<n-input-number
								v-model:value="printingRef"
								:min="1"
								class="w-100%"
								clearable
								placeholder="印次"
							/>
						</n-form-item>
						<n-form-item label="备注">
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
					</n-gi>
				</n-grid>
			</n-form>
		</n-card>
	</n-layout>
</template>

<style scoped>
@import url(@/styles/trc.css);

:deep(.n-upload .n-upload-file-list .n-upload-file.n-upload-file--image-card-type),
:deep(.n-upload .n-upload-file-list .n-upload-trigger.n-upload-trigger--image-card) {
	width: 360px;
	height: 720px;
}
</style>
