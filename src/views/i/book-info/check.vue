<script setup>
import {Service} from "@/api/index.js";
import NoData from "@/components/no-data.vue";
import {B_BOOK_INFO_CHECK} from "@/constant/breadcrumb.js";
import {messageOptions} from "@/constant/options.js";
import {ResponseCode} from "@/constant/response-code.js";
import {goto} from "@/router/goto.js";
import {BOOK_INFO} from "@/router/RouterValue.js";
import {debounce} from "@/utils/debounce.js";
import {formatTime} from "@/utils/format.js";
import {copyMatchingProperties} from "@/utils/index.js";
import {
	NButton,
	NFlex,
	NLayout,
	NLayoutHeader,
	NModal,
	NSpace,
	NTable,
	NTag,
	NTd,
	NText,
	NTr,
	useMessage
} from "naive-ui";
import {h, onBeforeMount, reactive, ref} from "vue";


const props = defineProps(['id', 'updateMenuItem', "updateBreadcrumbArray"]);

{
	props.updateMenuItem("i-book-info");
	props.updateBreadcrumbArray(B_BOOK_INFO_CHECK(props.id));
}

const message = useMessage();

const msgReactive = message.create("查找信息", {type: "loading"});

const source = reactive({
	remark: null,
});

const priceReactive = reactive({
	int: 0,
	dec: 0,
})

const info = reactive({
	id: null,
	publisher: null,
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

const creator = reactive({
	id: null,
	displayName: null,
	name: null,
	surname: null,
	email: null,
	phoneNumber: null
});

const updater = reactive({
	id: null,
	displayName: null,
	name: null,
	surname: null,
	email: null,
	phoneNumber: null
})


//#region update
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
// todo 编写测试更新功能
const showUpdate = ref(false);

const updateFormRef = ref(null);

const keywords = ref([]);

const keywordSet = new Set();

const loadingSearchPublisher = ref(false);

const isModified = () => {
	// 重新界定规则
	return (info.remark === source.remark) || info.bookName === '';
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

const update = debounce((e) => {
	e.preventDefault();

	const _entity = {
		id: info.id,
		bookName: info.bookName,
		remark: info.remark,
		revision: info.revision,
	}
	Service.Publishers.update(_entity)
		.then(res => {
			const _returnData = res.data;

			if (_returnData?.code !== ResponseCode.SUCCESS) {
				message.error(_returnData.message, messageOptions);
				return;
			}

			message.success("修改成功", messageOptions);

			query(props.id); // 修改之后，刷新一下
		})
		.catch(err => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
			showUpdate.value = false;
		});
});
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


//#region query
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const findUser = (id, target) => {
	if (!id) {
		return;
	}

	msgReactive.type = "loading";
	msgReactive.content = "查找操作者";
	Service.Users.get(id)
		.then(res => {
			const _returnData = res.data;
			if (_returnData?.code !== ResponseCode.SUCCESS) {
				msgReactive.type = "error";
				msgReactive.content = _returnData.message;
				return;
			}

			copyMatchingProperties(_returnData.data, target);

			msgReactive.type = "success";
			msgReactive.content = "查找完成";
		})
		.catch(err => {
			message.error(err.message);
		})
		.finally(() => {

		})
}

const handleSearchPublisher = (query) => {
	if (!query.length) { // 空清除候选
		publisherOptions.value = [];
		return;
	}

	console.log(1);
}

const handleSearchType = (query) => {
	console.log(query);
}

const findPublisher = (id) => {

	Service.Publishers.get(id)
		.then(res => {
			const _returnData = res.data;
			if (_returnData?.code !== ResponseCode.SUCCESS) {
				msgReactive.type = "error";
				msgReactive.content = _returnData.message;
				return;
			}

			const _publisher = _returnData?.data;

			publisherOptions.value.push({
				label: _publisher?.name,
				value: id
			})
		})
		.catch(err => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {

		})
}

const query = (id) => {
	Service.BookInfos.get(id)
		.then(res => {
			const _returnData = res.data;
			if (_returnData?.code !== ResponseCode.SUCCESS) {
				msgReactive.type = "error";
				msgReactive.content = _returnData.message;
				return;
			}

			copyMatchingProperties(_returnData?.data, info);

			copyMatchingProperties(info, source);

			{  // price
				const priceArray = info.price?.toString().split(".");
				priceReactive.int = priceArray?.[0];
				priceReactive.dec = priceArray?.[1];
			}
			{  // tags
				info.keyword?.toString().split("－").forEach(item => {
					keywords.value.push(item);
					keywordSet.add(item);
				})
			}

			findPublisher(info.publisher.id);
			findUser(info.createdBy, creator);
			findUser(info.updatedBy, updater);

		})
		.catch(err => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {

		})
}

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region remove
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
// todo 编写测试删除功能
const showRemove = ref(false);

const remove = () => {
	Service.Publishers.remove(props.id)
		.then(res => {
			const _returnData = res.data;
			if (_returnData?.code !== ResponseCode.SUCCESS) {
				message.error(_returnData.message, messageOptions);
			}

			message.success("删除成功", messageOptions);

			goto(BOOK_INFO);

		})
		.catch(err => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
			showRemove.value = false;
		})
}

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

onBeforeMount(() => {
	query(props.id);
})

</script>

<template>
	<n-layout-header class="top-0 h-3em" position="absolute">
		<n-flex class="items-center" style="margin: 0 1em;">
			<h1 class="m-r-a">书籍信息</h1>
			<n-button type="error" @click="showRemove = true">
				删除
			</n-button>
			<n-button :disabled="isModified()"
			          type="warning"
			          @click="showUpdate = true">
				修改
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout :native-scrollbar="false" class="absolute top-3em bottom-0 left-0 right-0"
	          content-style="padding: .3em 1em">
		<!--		todo add form-->
		<n-table :single-line="false" class="w-100%">
			<!--			todo 优化布局，-->
			<tbody class="trc">
			<tr>
				<td class="w-43%">id</td>
				<td>
					<n-tag :bordered="false" type="info">
						{{ info.id }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>ISBN</td>
				<td>
					<n-tag :bordered="false" type="default">
						{{ info.isbn }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>CIP</td>
				<td>
					<n-tag :bordered="false" type="default">
						{{ info.cip }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>名称</td>
				<td>
					{{ info.bookName }}
				</td>
			</tr>
			<tr>
				<td>中图法分类号</td>
				<td>
					<n-tag :bordered="false" type="default">
						{{ info.bookType }}
					</n-tag>
					<!--                  todo 完善 options 和查找逻辑-->
					<!--					<n-select v-model:value="info.bookType" :loading="loadingSearchPublisher" :options="typeOptions"-->
					<!--					          clearable-->
					<!--					          filterable placeholder="查找类型"-->
					<!--					          remote @search="handleSearchType"/>-->
				</td>
			</tr>
			<tr>
				<!--            todo 不知道该怎么展示图片, 要给图片加个上传功能，要写上传接口；使用 n-upload -->
				<td>封面链接</td>
				<td>
					<img :src="info.cover" alt="书籍图片链接" class="h-20em">
				</td>
			</tr>
			<tr>
				<td>作者</td>
				<td>
					<n-tag :bordered="false" type="default">
						{{ info.author }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>描述</td>
				<td>
					<n-text class="w-70%">
						{{ info.describe }}
					</n-text>
				</td>
			</tr>
			<tr>
				<td>主题词</td>
				<td>
					<n-tag v-for="(item, index) in keywords" :key="index" :bordered="false" class="m-l-1" type="info">
						{{ item }}
					</n-tag>
					<!--					<n-dynamic-tags v-model:value="keywords" :render-tag="renderTag"/>-->
				</td>
			</tr>
			<tr>
				<td>正文语种</td>
				<td>
					<n-tag :bordered="false" type="default">
						{{ info.lang }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>价格</td>
				<td>
					<n-tag :bordered="false" type="default">
						{{ info.price }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>库存量</td>
				<td>
					<n-tag :bordered="false" type="info">
						{{ info.stock }}
					</n-tag>
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
								<n-tag v-if="info.publishDate" :bordered="false" type="default">
									<!--								 todo yyyy-MM	-->
									{{ info.publishDate }}
								</n-tag>
								<NoData v-else/>
								<!--								<n-date-picker v-model:formatted-value="info.publishDate" clearable type="month"-->
								<!--								               update-value-on-close-->
								<!--								               value-format="yyyy-MM-dd"/>-->
							</td>
						</tr>
						<tr>
							<td>出版社</td>
							<td>
								<n-tag v-if="info.publisher?.name" :bordered="false" type="default">
									{{ `${info.publisher?.name}出版社` }}
								</n-tag>
								<NoData v-else/>
								<!--								&lt;!&ndash; todo 完善 options ，异步查询 &ndash;&gt;-->
								<!--								<n-select v-model:value="info.publisher.id" :loading="loadingSearchPublisher"-->
								<!--								          :options="publisherOptions" clearable-->
								<!--								          filterable placeholder="查找出版社"-->
								<!--								          remote @search="handleSearchPublisher"/>-->
							</td>
						</tr>
						<tr>
							<td>出版地</td>
							<td>
								<n-tag v-if="info.publisher?.place" :bordered="false" type="default">
									{{ info.publisher.place }}
								</n-tag>
								<NoData v-else/>
							</td>
						</tr>
						</tbody>
					</n-table>
				</td>
			</tr>
			<tr>
				<td>备注</td>
				<td>
					<n-text v-if="info.remark">
						{{ info.remark }}
					</n-text>
					<NoData v-else/>
				</td>
			</tr>
			<n-tr>
				<n-td>创建者</n-td>
				<n-td :style="info.createdBy ? '--n-td-padding: 0;' : ''">
					<n-table v-if="info.createdBy" :bordered="false" :single-line="false">
						<tbody>
						<n-tr>
							<n-td class="w-30">id</n-td>
							<n-td>
								<n-tag :bordered="false" type="info">
									{{ creator.id }}
								</n-tag>
							</n-td>
						</n-tr>
						<n-tr>
							<n-td>用户昵称</n-td>
							<n-td>{{ creator.displayName }}</n-td>
						</n-tr>
						<n-tr>
							<n-td>用户名</n-td>
							<n-td>
								<n-tag :bordered="false" type="primary">
									{{ creator.surname }}
								</n-tag>
								<n-tag :bordered="false" class="m-l-1" type="primary">
									{{ creator.name }}
								</n-tag>
							</n-td>
						</n-tr>
						<n-tr>
							<n-td>邮箱</n-td>
							<n-td>
								<n-tag :bordered="false" type="error">
									{{ creator.email }}
								</n-tag>
							</n-td>
						</n-tr>
						<n-tr>
							<n-td>电话</n-td>
							<n-td>
								<n-tag :bordered="false" type="error">
									{{ creator.phoneNumber }}
								</n-tag>
							</n-td>
						</n-tr>
						</tbody>
					</n-table>
					<NoData v-else/>
				</n-td>
			</n-tr>
			<n-tr>
				<n-td>创建时间</n-td>
				<n-td>
					<n-tag :bordered="false" type="primary">
						{{ formatTime(info.creationTime) }}
					</n-tag>
				</n-td>
			</n-tr>
			<n-tr>
				<n-td>更新者</n-td>
				<n-td :style="info.updatedBy ? '--n-td-padding: 0;' : ''">
					<n-table v-if="info.updatedBy" :bordered="false" :single-line="false">
						<tbody class="trc">
						<n-tr>
							<n-td class="w-30">id</n-td>
							<n-td>
								<n-tag :bordered="false" type="info">
									{{ updater.id }}
								</n-tag>
							</n-td>
						</n-tr>
						<n-tr>
							<n-td>用户昵称</n-td>
							<n-td>{{ updater.displayName }}</n-td>
						</n-tr>
						<n-tr>
							<n-td>用户名</n-td>
							<n-td>
								<n-tag :bordered="false" type="primary">
									{{ updater.surname }}
								</n-tag>
								<n-tag :bordered="false" class="m-l-1" type="primary">
									{{ updater.name }}
								</n-tag>
							</n-td>
						</n-tr>
						<n-tr>
							<n-td>邮箱</n-td>
							<n-td>
								<n-tag :bordered="false" type="error">
									{{ updater.email }}
								</n-tag>
							</n-td>
						</n-tr>
						<n-tr>
							<n-td>电话</n-td>
							<n-td>
								<n-tag :bordered="false" type="error">
									{{ updater.phoneNumber }}
								</n-tag>
							</n-td>
						</n-tr>
						</tbody>
					</n-table>
					<NoData v-else/>
				</n-td>
			</n-tr>
			<n-tr>
				<n-td>最后更新时间</n-td>
				<n-td>
					<n-tag :bordered="false" type="warning">
						{{ formatTime(info.lastUpdatedTime) }}
					</n-tag>
				</n-td>
			</n-tr>
			</tbody>
		</n-table>

		<!--   删除面板   -->
		<n-modal
			id="remove-modal"
			v-model:show="showRemove"
			preset="dialog"
			style="--n-font-size: 16px;"
			title="删除二次确认"
			transform-origin="center"
			type="error"
		>
			<n-space vertical>
         <span>
            您是否要删除？
         </span>
				<n-flex justify="right">
					<n-button type="error" @click="remove">
						确定
					</n-button>
				</n-flex>
			</n-space>
		</n-modal>

		<!--   更新面板   -->
		<n-modal
			id="update-modal"
			v-model:show="showUpdate"
			preset="dialog"
			title="修改二次确认"
			type="warning"
		>
			<n-space vertical>
				<span>
					您是否要行以下修改？
				</span>
				<n-table :single-line="false">
					<tbody>
					<tr>
						<td class="w-6em">修改内容</td>
						<td>原有值</td>
						<td>新值</td>
					</tr>
					<tr v-if="info.name !== source.name">
						<td class="text-center">
							<n-tag type="info">
								名称
							</n-tag>
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
							<n-tag type="info">
								备注
							</n-tag>
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
					<n-button type="warning" @click="update">
						确认
					</n-button>
				</n-flex>
			</n-space>
		</n-modal>
	</n-layout>
</template>

<style scoped>
.trc tr > td:first-child {
	text-align: right;
}
</style>