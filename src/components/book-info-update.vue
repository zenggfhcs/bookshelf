<script setup>

import { LANG_TYPE_PRE_DEFINED } from "@/constant/map.js";
import { messageOptions } from "@/constant/options.js";
import { dateDisabled } from "@/utils/disabled.js";
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
	NTag,
	NUpload,
	useMessage
} from "naive-ui";
import { computed, h, onBeforeMount, reactive, ref } from "vue";

const props = defineProps(["info"]);

const message = useMessage();

const defaultFileListRef = [
	{
		id: "c",
		name: ".png",
		status: "finished",
		url: computed(() => props.info.cover)
	}
];


function beforeUpload(data) {
	if (data.file.file?.type === "image/png") {
		return true;
	}
	message.error("只能上传png格式的图片文件，请重新上传", messageOptions);
	return false;
}


const updateInfo = reactive({
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
	remark: null,
	revision: null
});

const priceReactive = reactive({
	int: 0,
	dec: 0
});

const loadingQueryType = ref(false);

const typeOptionsRef = ref([]);

function handleQueryType() {

}

const keywords = ref([]);

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

onBeforeMount(() => {
	Object.assign(updateInfo, props.info);
});
</script>

<template>
	<n-flex class="w-100%" style="flex-flow: nowrap;">
		<n-form :show-feedback="false" :show-label="false" class="flex-auto">
			<n-table :single-line="false" class="w-100%">
				<tbody class="trc">
				<tr>
					<td class="w-384px" rowspan="12" style="border-bottom: 0;">
						<n-upload
							:default-file-list="defaultFileListRef"
							:max="1"
							action="http://10.3.105.0:9090/bookInfos/cover:upload"
							list-type="image-card"
							@before-upload="beforeUpload"
						/>
					</td>
					<td class="w-12%">ISBN</td>
					<td class="w-20%">
						<n-form-item path="isbn">
							<n-input
								v-model:value="updateInfo.isbn"
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
								v-model:value="updateInfo.cip"
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
								v-model:value="updateInfo.bookName"
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
								v-model:value="updateInfo.author"
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
							<n-select
								v-model:value="updateInfo.bookType"
								:loading="loadingQueryType"
								:options="typeOptionsRef"
								clearable
								filterable
								placeholder="查找类型"
								remote
								@search="handleQueryType"
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
								:render-tag="renderTag"
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
								v-model:value="updateInfo.lang"
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
								v-model:value="updateInfo.publisher"
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
								v-model:formatted-value="updateInfo.publishedDate"
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
								v-model:value="updateInfo.edition"
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
								v-model:value="updateInfo.printing"
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
								v-model:value="updateInfo.describe"
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
								v-model:value="updateInfo.remark"
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