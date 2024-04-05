<script setup>
import { Service } from "@/api/index.js";
import { B_BOOK_INFO_ADD } from "@/constant/breadcrumb.js";
import { LANG_TYPE_PRE_DEFINED } from "@/constant/map.js";
import { debounce } from "@/utils/debounce.js";
import { formValidator, inputValidator } from "@/utils/validator.js";
import {
	NButton,
	NCard,
	NDatePicker,
	NDynamicTags,
	NFlex,
	NForm,
	NFormItem,
	NInput,
	NInputGroup,
	NInputGroupLabel,
	NInputNumber,
	NLayout,
	NLayoutHeader,
	NModal,
	NSelect,
	NTag,
	NUpload,
	useMessage,
} from "naive-ui";
import { computed, h, reactive, ref } from "vue";

const props = defineProps(["updateMenuItem", "updateBreadcrumbArray"]);

{
	props.updateMenuItem("i-book-info");
	props.updateBreadcrumbArray(B_BOOK_INFO_ADD);
}

const message = useMessage();

const loadingSearchType = ref(false);

const loadingSearchPublisher = ref(false);

const priceReactive = reactive({
	int: null,
	dec: null,
});

const keywordsRef = ref([]);

const info = reactive({
	id: null,
	publisher: {
		id: null,
		name: null,
		place: null,
	},
	isbn: null,
	cip: null,
	bookName: "",
	bookType: null,
	cover: "",
	author: null,
	describe: null,
	publishDate: null,
	keyword: computed(() => keywordsRef.value.join("-")),
	lang: null,
	price: computed(
		() =>
			`${priceReactive.int}${priceReactive.dec ? "." + priceReactive.dec : ""}`,
	),
	stock: null,
	createdBy: null,
	creationTime: null,
	updatedBy: null,
	lastUpdatedTime: null,
	remark: null,
	revision: null,
});

const addFormRef = ref();

const rules = {
	bookName: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入",
		},
	],
	isbn: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入",
		},
	],
	cip: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入",
		},
	],
	bookType: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入",
		},
	],
	author: [
		{
			required: true,
			trigger: ["input", "blur"],
			message: "请输入",
		},
	],
	keyword: [
		{
			required: true,
		},
	],
	price: [
		{
			required: true,
			trigger: ["blur"],
			message: "请选择",
		},
	],
	publishDate: [
		{
			required: true,
			trigger: ["blur"],
			message: "请选择",
		},
	],
	publisher: [
		{
			required: true,
			trigger: ["blur"],
			message: "请选择",
		},
	],
};

const publisherOptions = ref([]);

const typeOptionsRef = ref([]);

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

function renderTag(v, i) {
	return h(
		NTag,
		{
			type: "info",
			bordered: false,
			closable: true,
			onClose: () => {
				keywordsRef.value.splice(i, 1);
			},
		},
		{
			default: () => v,
		},
	);
}

function handleSearchPublisher(query) {
	if (!query.length) {
		// 空清除候选
		publisherOptions.value = [];
		// todo
		// return;
	}
}

const handleSearchType = debounce((queryKeyword) => {
	if (!queryKeyword) {
		typeOptionsRef.value = [];
		return;
	}
	Service.BookInfos.getType(queryKeyword)
		.then((res) => {
			const { data } = res.data;
			typeOptionsRef.value = data?.map((item) => {
				return {
					label: `${item.key}:${item.value}`,
					value: `${item.id}:${item.value}`,
				};
			});
		})
		.catch()
		.finally();
}, 100);

const add = debounce(() => {
	console.log(info);
	formValidator(addFormRef, message, () => {});
});

const showPreviewModal = ref(false);
const previewCoverUrl = ref("");

function setCover({ file, event }) {
	const response = JSON.parse(event.target?.response);
	// todo data
	previewCoverUrl.value = response.data;
	info.cover = response.data;
	return file;
}

function removeCover() {
	// todo data
	previewCoverUrl.value = "";
	info.cover = "";
}

function handlePreview() {
	showPreviewModal.value = true;
}
</script>

<template>
	<n-layout-header class="top-0 h-3em" position="absolute">
		<n-flex class="items-center h-3em" justify="right" style="margin: 0 1em">
			<n-button type="success" @click.prevent="add">新增</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout
		:native-scrollbar="false"
		class="absolute top-3em bottom-0 left-0 right-0"
		content-style="padding: .3em 1em"
	>
		<n-flex justify="center">
			<n-card class="w-44em">
				<n-form
					ref="addFormRef"
					:model="info"
					:rules="rules"
					label-placement="left"
					label-width="auto"
				>
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
						<!--                  todo 完善 options 和查找逻辑-->
						<n-select
							v-model:value="info.bookType"
							:loading="loadingSearchType"
							:options="typeOptionsRef"
							clearable
							filterable
							placeholder="查找类型"
							remote
							@search="handleSearchType"
						/>
					</n-form-item>
					<n-form-item label="封面">
						<n-upload
							:headers="{ 'Access-Control-Allow-Origin': '*' }"
							:max="1"
							action="http://10.3.105.0:9090/upload/cover"
							list-type="image-card"
							@finish="setCover"
							@preview="handlePreview"
							@remove="removeCover"
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
					<n-form-item label="描述" path="describe">
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
					<n-form-item label="正文语种">
						<n-select
							v-model:value="info.lang"
							:options="LANG_TYPE_PRE_DEFINED"
							clearable
							filterable
							placeholder="选择语种"
						/>
					</n-form-item>
					<n-form-item label="售价" path="price">
						<n-input-group class="w-100%">
							<n-input-number
								v-model:value="priceReactive.int"
								:min="0"
								class=""
								clearable
								placeholder="整数部分"
							/>
							<n-input-group-label class="text-center"
								>.
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
					<n-form-item label="出版日期" path="publishDate">
						<n-date-picker
							v-model:formatted-value="info.publishDate"
							class="w-100%"
							clearable
							type="month"
							update-value-on-close
							value-format="yyyy-MM-dd"
						/>
					</n-form-item>
					<n-form-item label="出版社" path="publisher">
						<n-select
							v-model:value="info.publisher.id"
							:loading="loadingSearchPublisher"
							:options="publisherOptions"
							clearable
							filterable
							placeholder="查找出版社"
							remote
							@search="handleSearchPublisher"
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
				</n-form>
			</n-card>
		</n-flex>
	</n-layout>
	<n-modal
		v-model:show="showPreviewModal"
		preset="card"
		style="width: 600px"
		title="一张很酷的图片"
	>
		<img :src="previewCoverUrl" alt="" style="width: 100%" />
	</n-modal>
</template>

<style scoped>
@import url(@/styles/trc.css);
</style>
