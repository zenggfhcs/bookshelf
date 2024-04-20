<script setup>
import { Service } from "@/api/index.js";
import NoData from "@/components/no-data.vue";
import { B_USER_CHECK } from "@/constant/breadcrumb.js";
import { ROLE_MAP, ROLE_PRE_DEFINED } from "@/constant/map.js";
import { messageOptions } from "@/constant/options.js";
import IBack from "@/icons/i-back.vue";
import { goto } from "@/router/goto.js";
import { USER } from "@/router/router-value.js";
import { convertGender, getTagType } from "@/utils/convert.js";
import { debounce } from "@/utils/debounce.js";
import { formatTime } from "@/utils/format.js";
import { copyMatchingProperties } from "@/utils/index.js";
import { queryItem } from "@/utils/query.js";
import {
	NButton,
	NFlex,
	NForm,
	NIcon,
	NLayout,
	NLayoutHeader,
	NModal,
	NSelect,
	NSpace,
	NTable,
	NTag,
	NTbody,
	useMessage
} from "naive-ui";
import { onBeforeMount, onMounted, reactive, ref } from "vue";

const props = defineProps([
	"id",
	"showModal",
	"updateMenuItem",
	"updateBreadcrumbArray"
]);

const message = useMessage();

// todo 添加具体属性
const source = reactive({});

// todo 添加具体属性
const target = reactive({});

const newRoleRef = ref("");

const info = reactive({
	id: 0,
	// todo authenticationString,
	displayName: "",
	phoneNumber: "",
	email: "",
	emailNormal: "",
	role: {
		id: null,
		name: ""
	},
	surname: "",
	name: "",
	age: 0,
	gender: "",
	birthday: "",
	lastLoginTime: "",
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

const showUpdateModal = debounce(() => {
	copyMatchingProperties(info, source);
	copyMatchingProperties(info, target);
	showUpdate.value = true;
});

async function query(id) {
	if (!id) {
		return;
	}
	await queryItem(message, Service.Users.get(id), info);
	newRoleRef.value = info.role.name;
}

const showResetPwdConfirmation = ref(false);

const showRemoveConfirmation = ref(false);

const remove = debounce(() => {
	Service.Users.remove(props.id)
		.then((_) => {
			message.success("删除成功", messageOptions);
			goto(USER);
		})
		.catch((err) => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
			showRemoveConfirmation.value = false;
		});
});

const resetPassword = debounce(() => {
	// todo 重置密码
	// 登录过期？
});

const showUpdate = ref(false);

const showUpdateConfirmation = ref(false);

const updateFormRef = ref(null);

const updateRule = {
	name: {
		trigger: ["input", "blur"],
		required: true,
		message: "不能为空"
	},
	place: {
		trigger: ["input", "blur"],
		required: true,
		message: "不能为空"
	}
};

function showUpdateAfterModified() {
	if (isModified()) {
		showUpdateConfirmation.value = true;
		return;
	}
	message.warning("没有内容存在更改", messageOptions);
}

const verificationAfterInspection = debounce(() => {
	// todo verification
	showUpdateConfirmation.value = true;
});

function isModified() {
	return !(info.name === source.name && info.remark === source.remark);
}

const update = debounce(() => {
});

const updateRoleHandler = debounce(() => {
	if (info.role.name === newRoleRef.value) {
		message.warning("目标角色与原有角色相同，无需更新", messageOptions);

	}
	// todo 更新
});

onBeforeMount(() => {
	// 加载数据

});

onMounted(() => {
	props.updateMenuItem("i-user");
	props.updateBreadcrumbArray(B_USER_CHECK(props.id));
	query(props.id);
});
</script>

<template>
	<n-layout-header bordered class="top-0 h-3em" position="absolute">
		<n-flex class="h-3em items-center" justify="center">
			<router-link :to="USER">
				<n-button type="tertiary">
					<template #icon>
						<n-icon :component="IBack" />
					</template>
					后退
				</n-button>
			</router-link>
			<n-button
				type="error"
				@click.prevent="
					props.showModal(
						'error',
						'删除二次确认',
						'您是否要删除该用户？',
						() => {},
					)
				"
			>
				删除
			</n-button>
			<n-button
				type="warning"
				@click.prevent="
					props.showModal(
						'warning',
						'重置密码二次确认',
						'您是否要重置密码？',
						() => {},
					)
				"
			>
				重置密码
			</n-button>
			<n-button type="warning" @click.prevent="showUpdateModal">
				修改角色
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout
		:native-scrollbar="false"
		class="absolute top-3em bottom-0 left-0 right-0"
		content-style="padding: .3em 1em"
	>
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
					<n-tag
						v-if="info.displayName"
						:bordered="false"
						type="default"
					>
						{{ info.displayName }}
					</n-tag>
					<NoData v-else />
				</td>
			</tr>
			<tr>
				<td>姓名</td>
				<td>
					<n-tag
						v-if="info.surname || info.name"
						:bordered="false"
						type="default"
					>
						{{ info.surname }}
						{{ info.name }}
					</n-tag>
					<NoData v-else />
				</td>
			</tr>
			<tr>
				<td>角色</td>
				<td>
					<n-tag
						:bordered="false"
						:type="getTagType.byUserRole(info.role.name)"
					>
						{{ ROLE_MAP.getByValue(info.role.name) }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>电话号码</td>
				<td>
					<n-tag v-if="info.phoneNumber" :bordered="false" type="error">
						{{ info.phoneNumber }}
					</n-tag>
					<NoData v-else />
				</td>
			</tr>
			<tr>
				<td>邮箱</td>
				<td>
					<n-tag v-if="info.email" :bordered="false" type="error">
						{{ info.email }}
					</n-tag>
					<NoData v-else />
				</td>
			</tr>

			<tr>
				<td>年龄</td>
				<td>
					<n-tag
						v-if="info.age"
						:bordered="false"
						:type="getTagType.byAge(info.age)"
					>
						{{ info.age }}
					</n-tag>
					<NoData v-else />
				</td>
			</tr>
			<tr>
				<td>性别</td>
				<td>
					<n-tag
						v-if="info.gender !== null && info.gender !== undefined"
						:bordered="false"
						:type="getTagType.byGender(info.gender)"
					>
						{{ convertGender(info.gender) }}
					</n-tag>
					<NoData v-else />
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
				<td :style="info.createdBy?.id ? '--n-td-padding: 0;' : ''">
					<n-table
						v-if="info.createdBy"
						:bordered="false"
						:single-line="false"
					>
						<tbody>
						<tr>
							<td class="w-30">id</td>
							<td>
								<n-tag :bordered="false" type="info">
									{{ info.createdBy.id }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>用户昵称</td>
							<td>{{ info.createdBy.displayName }}</td>
						</tr>
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
				<td :style="info.updatedBy?.id ? '--n-td-padding: 0;' : ''">
					<n-table
						v-if="info.updatedBy"
						:bordered="false"
						:single-line="false"
					>
						<tbody class="trc">
						<tr>
							<td class="w-30">id</td>
							<td>
								<n-tag :bordered="false" type="info">
									{{ info.updatedBy.id }}
								</n-tag>
							</td>
						</tr>
						<tr>
							<td>用户昵称</td>
							<td>{{ info.updatedBy.displayName }}</td>
						</tr>
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
				<td>最后更新时间</td>
				<td>
					<n-tag :bordered="false" type="warning">
						{{ formatTime(info.lastUpdatedTime) }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>备注</td>
				<td>
					<n-tag v-if="info.remark">
						{{ info.remark }}
					</n-tag>
					<NoData v-else />
				</td>
			</tr>
			</tbody>
		</n-table>
	</n-layout>

	<!--   重置密码确认面板   -->
	<n-modal
		id="reset-password-confirmed-modal"
		v-model:show="showResetPwdConfirmation"
		preset="dialog"
		style="--n-font-size: 16px"
		title="重置密码二次确认"
		transform-origin="center"
		type="warning"
	>
		<n-space vertical>
			<span> 您是否要重置该用户的密码？ </span>
			<n-flex justify="right">
				<n-button type="warning" @click.prevent="resetPassword">
					确定
				</n-button>
			</n-flex>
		</n-space>
	</n-modal>

	<!--   删除确认面板   -->
	<n-modal
		id="remove-confirmed-modal"
		v-model:show="showRemoveConfirmation"
		preset="dialog"
		style="--n-font-size: 16px"
		title="删除二次确认"
		transform-origin="center"
		type="error"
	>
		<n-space vertical>
			<span> 您是否要删除？ </span>
			<n-flex justify="right">
				<n-button type="error" @click.prevent="remove"> 确定</n-button>
			</n-flex>
		</n-space>
	</n-modal>

	<n-modal
		id="update-role-modal"
		ref="updateFormRef"
		v-model:show="showUpdate"
		:mask-closable="false"
		:model="target"
		preset="dialog"
		title="修改角色"
		transform-origin="center"
		type="warning"
	>
		<n-form>
			<n-space vertical>
				<n-table :single-line="false">
					<n-tbody>
						<tr>
							<td>原有角色</td>
							<td>修改后角色</td>
						</tr>
						<tr>
							<td>
								<n-tag
									:bordered="false"
									:type="getTagType.byUserRole(info.role.name)"
								>
									{{ ROLE_MAP.getByValue(info.role.name) }}
								</n-tag>
							</td>
							<td>
								<n-select
									v-model:value="newRoleRef"
									:options="ROLE_PRE_DEFINED"
								/>
							</td>
						</tr>
					</n-tbody>
				</n-table>
				<n-flex justify="right">
					<n-button type="warning" @click.prevent="updateRoleHandler"
					>确定
					</n-button>
				</n-flex>
			</n-space>
		</n-form>
	</n-modal>
</template>

<style scoped>
@import url(@/styles/trc.css);
</style>
