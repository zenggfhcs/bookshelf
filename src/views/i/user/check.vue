<script setup>
import {Service} from "@/api/index.js";
import NoData from "@/components/no-data.vue";
import {B_USER_CHECK} from "@/constant/breadcrumb.js";
import {messageOptions} from "@/constant/options.js";
import {ResponseCode} from "@/constant/response-code.js";
import {goto} from "@/router/goto.js";
import {USER} from "@/router/RouterValue.js";
import {convertGender, getTagType} from "@/utils/convert.js";
import {debounce} from "@/utils/debounce.js";
import {formatTime} from "@/utils/format.js";
import {copyMatchingProperties} from "@/utils/index.js";
import {
	NButton,
	NFlex,
	NForm,
	NFormItem,
	NInput,
	NLayout,
	NLayoutHeader,
	NModal,
	NSpace,
	NTable,
	NTag,
	useMessage
} from "naive-ui";
import {onBeforeMount, reactive, ref} from "vue";

const props = defineProps(['id', 'updateMenuItem', 'updateBreadcrumbArray']);
{
	props.updateMenuItem("i-user");
	props.updateBreadcrumbArray(B_USER_CHECK(props.id));
}

const message = useMessage();

const source = reactive({});

const target = reactive({});

const info = reactive({
	id: 0,
	// todo authenticationString,
	displayName: '',
	phoneNumber: '',
	email: '',
	emailNormal: '',
	surname: '',
	name: '',
	age: 0,
	gender: '',
	birthday: '',
	lastLoginTime: '',
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

const showUpdateModal = debounce(() => {
	copyMatchingProperties(info, source);
	copyMatchingProperties(info, target);
	showUpdate.value = true;
});


const queryUser = (id, target) => {
	if (!id) {
		return;
	}

	if (+props.id === +id) {
		copyMatchingProperties(info, target);
		return;
	}

	Service.Users.get(id)
		.then(res => {
			const _returnData = res.data;
			if (_returnData?.code !== ResponseCode.SUCCESS) {
				message.error(_returnData.message, messageOptions);
				return;
			}
			copyMatchingProperties(_returnData.data, target);

		})
		.catch(err => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {

		})
}

const query = (id) => {
	if (!id) {
		return;
	}
	Service.Users.get(id)
		.then(res => {
			const _returnData = res.data;
			if (_returnData?.code !== ResponseCode.SUCCESS) {
				message.error(_returnData.message, messageOptions);
				return;
			}

			copyMatchingProperties(_returnData?.data, info);

			copyMatchingProperties(info, source);

			queryUser(info.createdBy, creator);
			queryUser(info.updatedBy, updater);
		})
		.catch(err => {
			message.error(err.message);
		})
		.finally(() => {
		})
}

const showRemoveConfirmation = ref(false);

const remove = debounce(() => {
	Service.Users.remove(props.id)
		.then(res => {
			const _returnData = res.data;
			if (_returnData?.code !== ResponseCode.SUCCESS) {
				message.error(_returnData.message, messageOptions);
				return;
			}
			message.success("删除成功", messageOptions);
			goto(USER);
		})
		.catch(err => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
			showRemoveConfirmation.value = false;
		})
});

const showUpdate = ref(false);

const showUpdateConfirmation = ref(false);

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

const showUpdateAfterModified = () => {
	if (isModified()) {
		showUpdateConfirmation.value = true;
		return;
	}
	message.warning("没有内容存在更改", messageOptions);
}

const verificationAfterInspection = debounce(() => {
	// todo verification
	showUpdateConfirmation.value = true;
})

const isModified = () => {
	return !((info.name === source.name && info.remark === source.remark));
}

const update = debounce((e) => {
	e.preventDefault();

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


onBeforeMount(() => {
	query(props.id);
})
</script>


<template>
	<n-layout-header bordered class="top-0 h-3em" position="absolute">
		<n-flex class="items-center" style="margin: 0 1em;">
			<h1 class="m-r-a">用户信息</h1>
			<n-button type="error" @click="showRemoveConfirmation = true">
				删除
			</n-button>
			<n-button type="warning" @click.prevent="showUpdateModal">
				修改
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout :native-scrollbar="false" class="absolute top-3em bottom-0 left-0 right-0"
	          content-style="padding: .3em 1em">
		<n-form ref="updateFormRef" :model="info" :rules="updateRule"
		        label-placement="left">
			<n-table :single-line="false" class="w-100%">
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
					<td>昵称</td>
					<td>
						<n-tag v-if="info.displayName" :bordered="false" type="default">
							{{ info.displayName }}
						</n-tag>
						<NoData v-else/>
					</td>
				</tr>
				<tr>
					<td>姓名</td>
					<td>
						<n-tag v-if="info.surname || info.name" :bordered="false" type="default">
							{{ info.surname }}
							{{ info.name }}
						</n-tag>
						<NoData v-else/>
					</td>
				</tr>
				<tr>
					<td>电话号码</td>
					<td>
						<n-tag v-if="info.phoneNumber" :bordered="false" type="error">
							{{ info.phoneNumber }}
						</n-tag>
						<NoData v-else/>
					</td>
				</tr>
				<tr>
					<td>邮箱</td>
					<td>
						<n-tag v-if="info.email" :bordered="false" type="error">
							{{ info.email }}
						</n-tag>
						<NoData v-else/>
					</td>
				</tr>

				<tr>
					<td>年龄</td>
					<td>
						<n-tag v-if="info.age" :bordered="false" :type="getTagType.byAge(info.age)">
							{{ info.age }}
						</n-tag>
						<NoData v-else/>
					</td>
				</tr>
				<tr>
					<td>性别</td>
					<td>
						<n-tag v-if="info.gender !== null && info.gender !== undefined" :bordered="false"
						       :type="getTagType.byGender(info.gender)">
							{{ convertGender(info.gender) }}
						</n-tag>
						<NoData v-else/>
					</td>
				</tr>

				<tr>
					<td>备注</td>
					<td>
						<n-tag v-if="info.remark">
							{{ info.remark }}
						</n-tag>
						<NoData v-else/>
					</td>
				</tr>
				<tr>
					<td>最后登录时间</td>
					<td>
						<n-tag :bordered="false" type="primary">
							{{ formatTime(info.lastUpdatedTime) }}
						</n-tag>
					</td>
				</tr>


				<tr>
					<td>创建者</td>
					<td :style="info.createdBy ? '--n-td-padding: 0;' : ''">
						<n-table v-if="info.createdBy" :bordered="false" :single-line="false">
							<tbody>
							<tr>
								<td class="w-30">id</td>
								<td>
									<n-tag :bordered="false" type="info">
										{{ creator.id }}
									</n-tag>
								</td>
							</tr>
							<tr>
								<td>用户昵称</td>
								<td>{{ creator.displayName }}</td>
							</tr>
							<tr>
								<td>用户名</td>
								<td>
									<n-tag :bordered="false" type="primary">
										{{ creator.surname }}
									</n-tag>
									<n-tag :bordered="false" class="m-l-1" type="primary">
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
						<NoData v-else/>
					</td>
				</tr>
				<tr>
					<td>创建时间</td>
					<td>
						<n-tag :bordered="false" type="primary">
							{{ formatTime(info.creationTime) }}
						</n-tag>
					</td>
				</tr>
				<tr>
					<td>更新者</td>
					<td :style="info.updatedBy ? '--n-td-padding: 0;' : ''">
						<n-table v-if="info.updatedBy" :bordered="false" :single-line="false">
							<tbody class="trc">
							<tr>
								<td class="w-30">id</td>
								<td>
									<n-tag :bordered="false" type="info">
										{{ updater.id }}
									</n-tag>
								</td>
							</tr>
							<tr>
								<td>用户昵称</td>
								<td>{{ updater.displayName }}</td>
							</tr>
							<tr>
								<td>用户名</td>
								<td>
									<n-tag :bordered="false" type="primary">
										{{ updater.surname }}
									</n-tag>
									<n-tag :bordered="false" class="m-l-1" type="primary">
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
						<NoData v-else/>
					</td>
				</tr>
				<tr>
					<td>最后更新时间</td>
					<td>
						<n-tag :bordered="false" type="warning">
							{{ formatTime(info.lastUpdatedTime) }}
						</n-tag>
					</td>
				</tr>
				</tbody>
			</n-table>
		</n-form>

		<!--   删除确认面板   -->
		<n-modal
			id="remove-confirmed-modal"
			v-model:show="showRemoveConfirmation"
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
					<n-button type="error" @click.prevent="remove">
						确定
					</n-button>
				</n-flex>
			</n-space>
		</n-modal>

		<n-modal id="update-form-modal"
		         ref="updateFormRef"
		         v-model:show="showUpdate"
		         :mask-closable="false"
		         :model="target"
		         preset="dialog"
		         title="修改"
		         transform-origin="center" type="warning">
			<n-form>
				<n-form-item>
					<n-input/>
				</n-form-item>
				<n-form-item>
					<n-input/>
				</n-form-item>
				<n-form-item>
					<n-input/>
				</n-form-item>
				<n-flex justify="right">
					<n-button type="warning" @click.prevent="verificationAfterInspection">确定</n-button>
				</n-flex>
			</n-form>
		</n-modal>

		<!--   更新确认面板   -->
		<n-modal
			id="update-confirmed-modal"
			v-model:show="showUpdateConfirmation"
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
					<tr>
						<td class="w-6em">修改内容</td>
						<td>原有值</td>
						<td>新值</td>
					</tr>
					<tr v-if="info.name !== source.name">
						<td class="text-center">
							<n-tag :bordered="false" type="info">
								名称
							</n-tag>
						</td>
						<td>
							<n-tag :bordered="false" type="success">
								{{ source.name }}
							</n-tag>
						</td>
						<td>
							<n-tag :bordered="false" type="warning">
								{{ info.name }}
							</n-tag>
						</td>
					</tr>
					<tr v-if="info.place !== source.place">
						<td class="text-center">
							<n-tag :bordered="false" type="info">
								出版地
							</n-tag>
						</td>
						<td>
							<n-tag :bordered="false" type="success">
								{{ source.place }}
							</n-tag>
						</td>
						<td>
							<n-tag :bordered="false" type="warning">
								{{ info.place }}
							</n-tag>
						</td>
					</tr>
					<tr v-if="info.remark !== source.remark">
						<td class="text-center">
							<n-tag :bordered="false" type="info">
								备注
							</n-tag>
						</td>
						<td>
							<n-tag :bordered="false" type="success">
								{{ source.remark }}
							</n-tag>
						</td>
						<td>
							<n-tag :bordered="false" type="warning">
								{{ info.remark }}
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
@import url(@/styles/trc.css);
</style>