<script setup>

import { updateItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { Header } from "@/constant/Header.js";
import { LANG_TYPE_PRE_DEFINED } from "@/constant/map.js";
import { messageOptions } from "@/constant/options.js";
import { local } from "@/storage/local.js";
import { convertToChineseNum, convertToNum, optional } from "@/utils/convert.js";
import { dateDisabled } from "@/utils/disabled.js";
import { copyMatchingNullProperties, subMatchingProperties } from "@/utils/index.js";
import { renderTag } from "@/utils/render.js";
import { inputValidator } from "@/utils/validator.js";
import {
	NDatePicker,
	NDynamicTags,
	NFlex,
	NForm,
	NFormItem,
	NInput,
	NInputGroup,
	NInputGroupLabel,
	NInputNumber,
	NSelect,
	NTable,
	NUpload,
	useMessage
} from "naive-ui";
import { computed, onMounted, reactive, ref } from "vue";

const props = defineProps({
	dataInfo: Object
});

defineExpose({
	handleUpdate
});

const message = useMessage();

const updateFormRef = ref();

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

const defaultFileListRef = [
	{
		id: "c",
		name: ".png",
		status: "finished",
		url: computed(() => info.cover)
	}
];


const coverHeaders = {
	"Access-Control-Allow-Origin": "*"
};
coverHeaders[Header.TOKEN] = local.get(Header.TOKEN);

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
	edition: computed(() => `第${convertToChineseNum(editionRef.value)}版`),
	printing: computed(() => `第${convertToChineseNum(printingRef.value)}次`),
	keyword: computed(() => keywordsRef.value.join("－")),
	lang: null,
	price: computed(() => +`${optional(priceReactive.int, 0)}${priceReactive.dec ? "." + priceReactive.dec : ""}`),
	remark: null,
	revision: null
});

const priceReactive = reactive({
	int: 0,
	dec: 0
});

const keywordsRef = ref([]);

function addKeyword(l) {
	l = l?.toString().trim();
	let _i = keywordsRef.value.length;
	if (l === "" || (keywordsRef.value.indexOf(l)) !== -1) {
		setTimeout(() => {
			keywordsRef.value.splice(_i, 1);
		});
	}

	return l;
}

function canUpdate(info) {
	console.log(info);
	for (let k in info) {
		const _v = info[k];
		if (_v !== null) {
			return true;
		}
	}
	return false;
}

async function handleUpdate() {
	await updateFormRef?.value?.validate((errors) => {
		if (errors) {
			message.error("表单没有通过验证，请检查表单项", messageOptions);
			return Promise.reject();
		}
	});

	const _subInfo = subMatchingProperties(props.dataInfo, info);
	if (!canUpdate(_subInfo)) {
		message.warning("没有需要更新的内容", messageOptions);
		return Promise.reject();
	}

	_subInfo.id = props.dataInfo.id;
	_subInfo.revision = props.dataInfo.revision;

	return updateItem(message, Service.BookInfos.update(_subInfo));

	// action(
	// 	message,
	// 	Service.BookInfos.update(info),
	// 	() => {
	// 		message.success("更新成功");
	// 	}
	// );
}

onMounted(() => {
	// 拆分价格
	const [int, dec] = props.dataInfo.price?.toString().split(".");
	// 赋值价格
	priceReactive.int = int ? +int : null;
	priceReactive.dec = dec ? +dec : null;

	// 转换版次和印次
	editionRef.value = convertToNum(/^第(.*)版$/.exec(props.dataInfo.edition)?.[1]);
	printingRef.value = convertToNum(/^第(.*)次$/.exec(props.dataInfo.printing)?.[1]);

	// 拆分主题词
	keywordsRef.value = props.dataInfo.keyword.toString().split("－");

	// 克隆属性
	copyMatchingNullProperties(props.dataInfo, info);
});
</script>

<template>
	<n-flex class="w-100%" style="flex-flow: nowrap;">
		<n-form ref="updateFormRef" :model="info" :rules="rules" :show-feedback="false" :show-label="false"
		        class="flex-auto">
			<n-table :single-line="false" class="w-100%">
				<tbody class="trc">
				<tr>
					<td class="w-384px" rowspan="12" style="border-bottom: 0;">
						<n-form-item path="cover">
							<n-upload
								:default-file-list="defaultFileListRef"
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
					</td>
					<td class="w-12%">ISBN</td>
					<td class="w-20%">
						<n-form-item path="isbn">
							<n-input
								v-model:value="info.isbn"
								:allow-input="inputValidator.noSideSpace"
								clearable
								maxlength="32"
								placeholder="输入"
							/>
						</n-form-item>
					</td>
					<td class="w-12%">CIP&nbsp;核准号</td>
					<td>
						<n-form-item path="cip">
							<n-input
								v-model:value="info.cip"
								:allow-input="inputValidator.noSideSpace"
								clearable
								maxlength="32"
								placeholder="输入"
							/>
						</n-form-item>
					</td>
				</tr>
				<tr>
					<td>名称</td>
					<td>
						<n-form-item path="bookName">
							<n-input
								v-model:value="info.bookName"
								:allow-input="inputValidator.noSideSpace"
								clearable
								maxlength="32"
								placeholder="输入"
							/>
						</n-form-item>
					</td>
					<td>作者</td>
					<td>
						<n-form-item path="author">
							<n-input
								v-model:value="info.author"
								:allow-input="inputValidator.noSideSpace"
								clearable
								maxlength="32"
								placeholder="输入"
							/>
						</n-form-item>
					</td>
				</tr>
				<tr>
					<td>中图法分类号</td>
					<td colspan="3">
						<n-form-item path="bookType">
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
					</td>
				</tr>
				<tr>
					<td>主题词</td>
					<td colspan="3">
						<n-form-item path="keyword">
							<n-dynamic-tags
								v-model:value="keywordsRef"
								:render-tag="renderTag(keywordsRef)"
								@create="addKeyword"
							/>
						</n-form-item>
					</td>
				</tr>
				<tr>
					<td>正文语种</td>
					<td colspan="3">
						<n-form-item path="lang">
							<n-select
								v-model:value="info.lang"
								:options="LANG_TYPE_PRE_DEFINED"
								filterable
								placeholder="选择语种"
							/>
						</n-form-item>
					</td>
				</tr>
				<tr>
					<td>价格</td>
					<td colspan="3">
						<n-form-item path="price">
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
					</td>
				</tr>
				<tr>
					<td colspan="4">&nbsp;</td>
				</tr>
				<tr>
					<td>出版社</td>
					<td>
						<n-form-item path="publisher">
							<n-input
								v-model:value="info.publisher"
								clearable
								maxlength="32"
								placeholder="输入出版社"
							/>
						</n-form-item>
					</td>
					<td class="w-30">出版日期</td>
					<td colspan="3">
						<n-form-item path="publishedDate">
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
					</td>
				</tr>
				<tr>
					<td>版次</td>
					<td>
						<n-form-item path="edition">
							<n-input-number
								v-model:value="editionRef"
								:min="1"
								class="w-100%"
								clearable
								placeholder="版次"
							/>
						</n-form-item>
					</td>
					<td>印次</td>
					<td>
						<n-form-item path="printing">
							<n-input-number
								v-model:value="printingRef"
								:min="1"
								class="w-100%"
								clearable
								placeholder="印次"
							/>
						</n-form-item>
					</td>
				</tr>
				<tr>
					<td>内容摘要</td>
					<td colspan="3">
						<n-form-item path="describe">
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
					</td>
				</tr>
				<tr>
					<td colspan="4">&nbsp;</td>
				</tr>
				<tr>
					<td>备注</td>
					<td colspan="3">

						<n-form-item path="remark">
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
					</td>
				</tr>
				</tbody>
			</n-table>
		</n-form>
	</n-flex>
</template>

<style scoped>

</style>