<script setup>
import {Service} from "@/api/index.js";
import NoData from "@/components/no-data.vue";
import {B_PUBLISHER_CHECK} from "@/constant/breadcrumb.js";
import {messageOptions} from "@/constant/options.js";
import {ResponseCode} from "@/constant/response-code.js";
import {goto} from "@/router/goto.js";
import {PUBLISHER} from "@/router/RouterValue.js";
import {debounce} from "@/utils/debounce.js";
import {formatTime} from "@/utils/format.js";
import {copyMatchingProperties} from "@/utils/index.js";
import {NButton, NFlex, NLayout, NLayoutHeader, NModal, NSpace, NTable, NTag, NTd, NTr, useMessage} from "naive-ui";
import {onBeforeMount, reactive, ref} from "vue";

const props = defineProps(['id', 'updateMenuItem', 'updateBreadcrumbArray']);


const message = useMessage();

const msgReactive = message.create("查找信息", {type: "loading"});

let id = props.id;

const source = reactive({
	name: null,
	remark: null,
	place: null,
});

const info = reactive({
	id: null,
	name: '',
	place: null,
	createdBy: null,
	creationTime: null,
	updatedBy: null,
	lastUpdatedTime: null,
	remark: null,
	revision: null,
});

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

//#region transform
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region query
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const findUser = (id, target) => {
	if (!id) {
		return;
	}

	msgReactive.type = "loading";
	msgReactive.content = "查找日志操作者";
	Service.Users.get(id)
		.then(res => {
			const _returnData = res.data;
			if (_returnData?.code !== ResponseCode.SUCCESS) {
				msgReactive.type = "error";
				msgReactive.content = _returnData?.msg;
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

const query = (id) => {
	Service.Publishers.get(id)
		.then(res => {
			const _returnData = res.data;
			if (_returnData?.code !== ResponseCode.SUCCESS) {
				msgReactive.type = "error";
				msgReactive.content = _returnData?.msg;
				return;
			}

			copyMatchingProperties(_returnData?.data, info);

			const _reg = /^(.*?)出?版?社?$/;
			if (_reg.test(info.name)) {
				info.name = _reg.exec(info.name)?.[1];
			}

			copyMatchingProperties(info, source);

			findUser(info.createdBy, creator);
			findUser(info.updatedBy, updater);
		})
		.catch(err => {
			message.error(err.message);
		})
		.finally(() => {

		})
}

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region remove
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

const showRemove = ref(false);

const remove = () => {
	Service.Publishers.remove(id)
		.then(res => {
			const _returnData = res.data;
			if (_returnData?.code !== ResponseCode.SUCCESS) {
				message.error(_returnData?.msg, messageOptions);
			}

			message.success("删除成功", messageOptions);

			goto(PUBLISHER);
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


//#region update
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const showUpdate = ref(false);

const updateFormRef = ref(null);

const updateRule = {
	name: {
		trigger: ['input', 'blur'],
		required: true,
		message: "不能为空",
	},
	place: {
		trigger: ['input', 'blur'],
		required: true,
		message: "不能为空",
	}
}

const isModified = () => {
	return !((info.name === source.name && info.remark === source.remark && info.place === source.place));
}

const update = debounce((e) => {
	e.preventDefault();

	// todo 修改 entity
	const _entity = {
		id: info.id,
		name: info.name,
		remark: info.remark,
		revision: info.revision,
	}

	Service.Publishers.update(_entity)
		.then(res => {
			const _returnData = res.data;
			if (_returnData?.code !== ResponseCode.SUCCESS) {
				message.error(_returnData?.msg, messageOptions);
				return;
			}
			message.success("修改成功", messageOptions);
			query(id); // 修改之后，刷新一下
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
//#region 生命周期钩子
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
onBeforeMount(() => {
	query(id);
})

{
	props.updateMenuItem("i-publisher");
	props.updateBreadcrumbArray(B_PUBLISHER_CHECK(props.id));
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion
</script>


<template>
	<n-layout-header class="top-0 h-3em" position="absolute">
		<n-flex class="items-center" style="margin: 0 1em;">
			<h1 class="m-r-a">出版社信息</h1>
			<n-button type="error" @click="showRemove = true">
				删除
			</n-button>
			<n-button type="warning"
			          @click="showUpdate = true">
				修改
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout :native-scrollbar="false" class="absolute top-3em bottom-0 left-0 right-0"
	          content-style="padding: .3em 1em">

		<n-table :single-line="false" class="w-100%">
			<tbody class="trc">
			<n-tr>
				<n-td class="w-43%">id</n-td>
				<n-td>
					<n-tag :bordered="false" type="info">
						{{ info.id }}
					</n-tag>
				</n-td>
			</n-tr>
			<n-tr>
				<n-td>名称</n-td>
				<n-td>
					<n-text>
						{{ info.name }}
					</n-text>
				</n-td>
			</n-tr>
			<n-tr>
				<n-td>出版地</n-td>
				<n-td>
					<n-tag :bordered="false" type="info">
						{{ info.place }}
					</n-tag>
				</n-td>
			</n-tr>
			<n-tr>
				<n-td>备注</n-td>
				<n-td>
					<n-text v-if="info.remark" style="overflow-wrap: anywhere">
						{{ info.remark }}
					</n-text>
					<NoData v-else/>
				</n-td>
			</n-tr>
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
			transform-origin="center"
			type="warning"
		>
			<n-space vertical>
            <span>
               您是否要进行以下修改？
            </span>
				<n-table :single-line="false">
					<tbody>
					<n-tr>
						<n-td class="w-6em">修改内容</n-td>
						<n-td>原有值</n-td>
						<n-td>新值</n-td>
					</n-tr>
					<n-tr v-if="info.name !== source.name">
						<n-td class="text-center">
							<n-tag :bordered="false" type="info">
								名称
							</n-tag>
						</n-td>
						<n-td>
							<n-tag :bordered="false" type="success">
								{{ source.name }}
							</n-tag>
						</n-td>
						<n-td>
							<n-tag :bordered="false" type="warning">
								{{ info.name }}
							</n-tag>
						</n-td>
					</n-tr>
					<n-tr v-if="info.place !== source.place">
						<n-td class="text-center">
							<n-tag :bordered="false" type="info">
								出版地
							</n-tag>
						</n-td>
						<n-td>
							<n-tag :bordered="false" type="success">
								{{ source.place }}
							</n-tag>
						</n-td>
						<n-td>
							<n-tag :bordered="false" type="warning">
								{{ info.place }}
							</n-tag>
						</n-td>
					</n-tr>
					<n-tr v-if="info.remark !== source.remark">
						<n-td class="text-center">
							<n-tag :bordered="false" type="info">
								备注
							</n-tag>
						</n-td>
						<n-td>
							<n-tag :bordered="false" type="success">
								{{ source.remark }}
							</n-tag>
						</n-td>
						<n-td>
							<n-tag :bordered="false" type="warning">
								{{ info.remark }}
							</n-tag>
						</n-td>
					</n-tr>
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
@import url(@/styles/trc.css);
</style>