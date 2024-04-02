<script setup>
import {B_BOOK_INFO_ADD} from "@/constant/breadcrumb.js";
import {debounce} from "@/utils/debounce.js";
import {formValidator, inputValidator} from "@/utils/validator.js";
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
	useMessage
} from "naive-ui";
import {h, reactive, ref} from "vue";

const props = defineProps(['updateMenuItem', "updateBreadcrumbArray"]);

{
	props.updateMenuItem("i-book-info");
	props.updateBreadcrumbArray(B_BOOK_INFO_ADD);
}

const message = useMessage();

const keywords = ref([]);

const loadingSearchType = ref(false);

const loadingSearchPublisher = ref(false);

const priceReactive = reactive({
	int: null,
	dec: null,
})

const info = reactive({
	id: null,
	publisher: {
		id: null,
		name: null,
		place: null,
	},
	isbn: null,
	cip: null,
	bookName: '',
	bookType: null,
	cover: '',
	author: null,
	describe: null,
	publishDate: null,
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

const addFormRef = ref();

const rules = {
	bookName: [
		{
			required: true,
			trigger: ['input', 'blur'],
			message: "请输入"
		}
	],
	isbn: [
		{
			required: true,
			trigger: ['input', 'blur'],
			message: "请输入"
		}
	],
	cip: [
		{
			required: true,
			trigger: ['input', 'blur'],
			message: "请输入"
		}
	],
	bookType: [
		{
			required: true,
			trigger: ['input', 'blur'],
			message: "请输入"
		}
	],
	author: [
		{
			required: true,
			trigger: ['input', 'blur'],
			message: "请输入"
		}
	],
};

const publisherOptions = ref([]);

const typeOptions = ref([]);


const addKeyword = (l) => {
	l = l?.toString().trim();
	if (l === "" || keywords.value.indexOf(l) !== -1) {
		return "";
	}
	return l;
}

const renderTag = (v, i) => h(
	NTag,
	{
		type: "info",
		bordered: false,
		closable: true,
		onClose: () => {
			keywords.value.splice(i, 1)
		}
	},
	{
		default: () => v
	}
)

const handleSearchPublisher = (query) => {
	if (!query.length) { // 空清除候选
		publisherOptions.value = [];
		// todo
		// return;
	}
}

const handleSearchType = (query) => {
	// todo
}


const add = debounce(() => {
	formValidator(addFormRef, message, () => {

	});
})

const showPreviewModal = ref(false);
const previewCoverUrl = ref('');

const setCover = ({file, event}) => {
	const response = JSON.parse(event.target?.response);
	// todo data
	previewCoverUrl.value = response.data;
	info.cover = response.data;
	return file;
}

const removeCover = () => {
	// todo data
	previewCoverUrl.value = '';
	info.cover = '';
}

const handlePreview = () => {
	showPreviewModal.value = true;
}

</script>


<template>
	<n-layout-header class="top-0 h-3em" position="absolute">
		<n-flex class="items-center h-3em" justify="right" style="margin: 0 1em;">
			<n-button type="success"
			          @click.prevent="add">
				新增
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout :native-scrollbar="false" class="absolute top-3em bottom-0 left-0 right-0"
	          content-style="padding: .3em 1em">
		<n-flex justify="center">
			<n-card class="w-44em">
				<n-form ref="addFormRef" :model="info" :rules="rules" label-placement="left"
				        label-width="auto">
					<n-form-item label="名称" path="bookName">
						<n-input v-model:value="info.bookName" :allow-input="inputValidator.noSideSpace"
						         clearable maxlength="32" placeholder="输入"/>
					</n-form-item>
					<n-form-item label="ISBN" path="isbn">
						<n-input v-model:value="info.isbn" :allow-input="inputValidator.noSideSpace"
						         clearable maxlength="32" placeholder="输入"/>
					</n-form-item>
					<n-form-item label="CIP" path="cip">
						<n-input v-model:value="info.cip" :allow-input="inputValidator.noSideSpace"
						         clearable maxlength="32" placeholder="输入"/>
					</n-form-item>
					<n-form-item label="中图法分类号" path="bookType">
						<!--                  todo 完善 options 和查找逻辑-->
						<n-select v-model:value="info.bookType" :loading="loadingSearchType" :options="typeOptions"
						          clearable
						          filterable placeholder="查找类型"
						          remote @search="handleSearchType"/>
					</n-form-item>
					<n-form-item label="封面">
						<n-upload
							:headers="{'Access-Control-Allow-Origin': '*'}"
							:max="1"
							action="http://10.3.105.0:9090/upload/cover"
							list-type="image-card"
							@finish="setCover"
							@preview="handlePreview"
							@remove="removeCover"/>
					</n-form-item>
					<n-form-item label="作者" path="author">
						<n-input v-model:value="info.author" :allow-input="inputValidator.noSideSpace"
						         clearable maxlength="32" placeholder="输入"/>
					</n-form-item>
					<n-form-item label="描述" path="describe">
						<n-input v-model:value="info.describe" :allow-input="inputValidator.noSideSpace"
						         autosize clearable maxlength="255" placeholder="输入" type="textarea"/>
					</n-form-item>
					<n-form-item label="主题词">
						<n-dynamic-tags v-model:value="keywords" :render-tag="renderTag" @create="addKeyword"/>
					</n-form-item>
					<n-form-item label="正文语种">
						<n-input v-model:value="info.lang" :allow-input="inputValidator.noSideSpace"
						         clearable maxlength="32" placeholder="输入"/>
					</n-form-item>
					<n-form-item label="售价">
						<n-input-group class="w-100%">
							<n-input-number v-model:value="priceReactive.int" :min="0" class="" clearable
							                placeholder="整数部分"/>
							<n-input-group-label class="text-center">.</n-input-group-label>
							<n-input-number v-model:value="priceReactive.dec" :max="99" :min="1" clearable
							                placeholder="小数部分"/>
						</n-input-group>
					</n-form-item>
					<n-form-item label="出版日期">
						<n-date-picker v-model:formatted-value="info.publishDate" class="w-100%" clearable type="month"
						               update-value-on-close
						               value-format="yyyy-MM-dd"/>
					</n-form-item>
					<n-form-item label="出版社">
						<n-select v-model:value="info.publisher.id" :loading="loadingSearchPublisher"
						          :options="publisherOptions" clearable
						          filterable placeholder="查找出版社"
						          remote @search="handleSearchPublisher"/>
					</n-form-item>

					<n-form-item label="备注">
						<n-input v-model:value="info.remark" :allow-input="inputValidator.noSideSpace" autosize clearable
						         maxlength="255"
						         placeholder="输入备注" type="textarea"/>
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
		<img :src="previewCoverUrl" alt="" style="width: 100%">
	</n-modal>
</template>

<style scoped>
@import url(@/styles/trc.css);
</style>