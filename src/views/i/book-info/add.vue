<script setup>
import {B_BOOK_INFO_ADD} from "@/constant/breadcrumb.js";
import Archive from "@/icons/archive.vue";
import {debounce} from "@/utils/debounce.js";
import {inputValidator} from "@/utils/validator.js";
import {
	NButton,
	NDatePicker,
	NDynamicTags,
	NFlex,
	NIcon,
	NInput,
	NInputGroup,
	NInputGroupLabel,
	NInputNumber,
	NLayout,
	NLayoutHeader,
	NP,
	NSelect,
	NSpace,
	NTable,
	NTag,
	NText,
	NUpload,
	NUploadDragger,
	useMessage
} from "naive-ui";
import {h, onBeforeMount, reactive, ref} from "vue";

const props = defineProps(['updateMenuItem', "updateBreadcrumbArray"]);

{
	props.updateMenuItem("i-book-info");
	props.updateBreadcrumbArray(B_BOOK_INFO_ADD);
}

const message = useMessage();

const keywords = ref([]);

const source = reactive({
	remark: null,
});

const loadingSearchType = ref(false);

const loadingSearchPublisher = ref(false);

const priceReactive = reactive({
	int: 0,
	dec: 0,
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
	cover: null,
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
		// return;
	}
}

const handleSearchType = (query) => {
	console.log(query);
}


const add = debounce((e) => {
	e.preventDefault();

})

onBeforeMount(() => {
})

</script>


<template>
	<n-layout-header class="top-0 h-3em" position="absolute">
		<n-flex class="items-center" style="margin: 0 1em;">
			<h1 class="m-r-a">出版社信息</h1>
			<n-button type="success"
			          @click="add">
				新增
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout :native-scrollbar="false" class="absolute top-3em bottom-0 left-0 right-0"
	          content-style="padding: .3em 1em">
		<!--	todo add form -->
		<n-table :single-line="false" class="w-100%">
			<!--			todo 优化布局，-->
			<tbody class="trc">
			<tr>
				<td class="w-33%">ISBN</td>
				<td>
					<n-input v-model:value="info.isbn" :allow-input="inputValidator.noSideSpace"
					         clearable maxlength="32" placeholder="输入"/>
				</td>
			</tr>
			<tr>
				<td>CIP</td>
				<td>
					<n-input v-model:value="info.cip" :allow-input="inputValidator.noSideSpace"
					         clearable maxlength="32" placeholder="输入"/>
				</td>
			</tr>
			<tr>
				<td>名称</td>
				<td>
					<n-input v-model:value="info.bookName" :allow-input="inputValidator.noSideSpace"
					         clearable maxlength="32" placeholder="输入"/>
				</td>
			</tr>
			<tr>
				<td>中图法分类号</td>
				<td>
					<!--                  todo 完善 options 和查找逻辑-->
					<n-select v-model:value="info.bookType" :loading="loadingSearchType" :options="typeOptions"
					          clearable
					          filterable placeholder="查找类型"
					          remote @search="handleSearchType"/>
				</td>
			</tr>
			<tr>
				<!--            todo 不知道该怎么展示图片, 要给图片加个上传功能，要写上传接口；使用 n-upload -->
				<td>封面链接</td>
				<td>
					<!--               <img :src="info.cover" alt="书籍图片链接">-->
					<n-upload
						:max="5"
						action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
						directory-dnd
						multiple
					>
						<n-upload-dragger>
							<div style="margin-bottom: 12px">
								<n-icon depth="3" size="64">
									<Archive/>
								</n-icon>
							</div>
							<n-text style="font-size: 16px">
								点击或者拖动文件到该区域来上传
							</n-text>
							<n-p depth="3" style="margin: 8px 0 0 0">
								请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
							</n-p>
						</n-upload-dragger>
					</n-upload>
					<n-input v-model:value="info.cover" :allow-input="inputValidator.noSideSpace"
					         clearable placeholder="输入"/>
				</td>
			</tr>
			<tr>
				<td>作者</td>
				<td>
					<n-input v-model:value="info.author" :allow-input="inputValidator.noSideSpace"
					         clearable maxlength="32" placeholder="输入"/>
				</td>
			</tr>
			<tr>
				<td>描述</td>
				<td>
					<n-input v-model:value="info.describe" :allow-input="inputValidator.noSideSpace"
					         autosize clearable maxlength="255" placeholder="输入" type="textarea"/>
				</td>
			</tr>
			<tr>
				<td>主题词</td>
				<td>
					<n-dynamic-tags v-model:value="keywords" :render-tag="renderTag" @create="addKeyword"/>
				</td>
			</tr>
			<tr>
				<td>正文语种</td>
				<td>
					<n-input v-model:value="info.lang" :allow-input="inputValidator.noSideSpace"
					         clearable maxlength="32" placeholder="输入"/>
				</td>
			</tr>
			<tr>
				<td>价格</td>
				<td>
					<n-space vertical>
						<n-input-group>
							<n-input-group-label class="text-center">整数</n-input-group-label>
							<n-input-number v-model:value="priceReactive.int" :min="0" class="" clearable/>
						</n-input-group>
						<n-input-group>
							<n-input-group-label class="text-center">小数</n-input-group-label>
							<n-input-number v-model:value="priceReactive.dec" :max="99" :min="1" class="" clearable/>
						</n-input-group>
					</n-space>
				</td>
			</tr>

			<tr>
				<td>出版信息</td>
				<td style="--n-td-padding: 0;">

					<n-table :bordered="false" :single-line="false">
						<tbody class="trc">
						<tr>
							<td class="w-30">出版日期</td>
							<td>
								<n-date-picker v-model:formatted-value="info.publishDate" clearable type="month"
								               update-value-on-close
								               value-format="yyyy-MM-dd"/>
							</td>
						</tr>
						<tr>
							<td>出版社</td>
							<td>
								<!-- todo 完善 options ，异步查询 -->
								<n-select v-model:value="info.publisher.id" :loading="loadingSearchPublisher"
								          :options="publisherOptions" clearable
								          filterable placeholder="查找出版社"
								          remote @search="handleSearchPublisher"/>
							</td>
						</tr>
						<tr>
							<td>出版地</td>
							<td>
								{{ info.publisher.place }}
							</td>
						</tr>
						</tbody>
					</n-table>
				</td>
			</tr>
			<tr>
				<td>备注</td>
				<td>
					<n-input v-model:value="info.remark" :allow-input="inputValidator.noSideSpace" autosize clearable
					         maxlength="255"
					         placeholder="输入备注" type="textarea"/>
				</td>
			</tr>
			</tbody>
		</n-table>
	</n-layout>
</template>

<style scoped>
@import url(@/styles/trc.css);
</style>