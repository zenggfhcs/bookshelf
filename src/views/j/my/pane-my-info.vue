<script setup>
import { action, queryItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { GENDER_PRE_DEFINED } from "@/constant/map.js";
import { messageOptions } from "@/constant/options.js";
import { REG_EMAIL, REG_PHONE_NUMBER } from "@/constant/regular-expression.js";
import { convertGender } from "@/utils/convert.js";
import { debounce } from "@/utils/debounce.js";
import { dateDisabled } from "@/utils/disabled.js";
import { formatDate } from "@/utils/format.js";
import { copyMatchingProperties, subMatchingProperties } from "@/utils/index.js";
import { formValidator, inputValidator } from "@/utils/validator.js";
import {
	NButton,
	NCard,
	NDatePicker,
	NFlex,
	NForm,
	NFormItem,
	NInput,
	NInputGroup,
	NInputGroupLabel,
	NSelect,
	NSpace,
	NTable,
	NText,
	useMessage
} from "naive-ui";
import { onBeforeMount, onMounted, reactive, ref } from "vue";

const message = useMessage();

const payload = reactive({
	entity: {
		email: "",
		newEmail: "",
		token: "",
		newToken: ""
	}
});

const info = reactive({
	id: 0,
	displayName: "",
	surname: "",
	name: "",
	age: 0,
	gender: 0,
	birthday: "",
	remark: "",
	email: "",
	phoneNumber: "",
	revision: 0
});

const updateFormRef = ref();

const rules = {
	email: [
		{
			required: true, // 字段必填
			trigger: ["input", "blur"],
			validator(_, value) {
				// 自定义检查
				if (value === undefined || value === null || value.length === 0) {
					return new Error("请输入邮箱");
				} else if (!REG_EMAIL.test(value.trim())) {
					return new Error("邮箱格式错误");
				}
			}
		}
	],
	phoneNumber: [
		{
			required: true, // 字段必填
			trigger: ["input", "blur"],
			validator(_, value) {
				// 自定义检查
				if (value === undefined || value === null || value.length === 0) {
					return new Error("请输入电话号码");
				} else if (!REG_PHONE_NUMBER.test(value.trim())) {
					return new Error("电话号码格式错误");
				}
			}
		}
	],
	displayName: [
		{
			required: true,
			message: "请输入",
			trigger: ["input", "blur"]
		}
	],
	surname: [
		{
			required: true,
			message: "请输入",
			trigger: ["input", "blur"]
		}
	],
	name: [
		{
			required: true,
			message: "请输入",
			trigger: ["input", "blur"]
		}
	],
	gender: [
		{
			required: true,
			message: "请选择",
			trigger: ["blur"],
			validator: (_, value) => {
				return true;
			}
		}
	],
	birthday: [
		{
			required: true,
			message: "请选择",
			trigger: ["blur"]
		}
	]
};

const newInfo = reactive({
	id: 0,
	displayName: "",
	surname: "",
	name: "",
	// age: 0,
	gender: 0,
	birthday: null,
	email: "",
	phoneNumber: ""
});

const timestampRef = ref(0);


const isAlterUserInfoRef = ref(false);

const isAlterUserAccountInfoRef = ref(false);

function canUpdate(info) {
	for (const infoKey in info) {
		const _v = info[infoKey];
		if (_v !== null && _v !== undefined && _v !== "") {
			return true;
		}
	}
	return false;
}

function showUpdate() {
	copyMatchingProperties(info, newInfo);
	timestampRef.value = new Date(info.birthday).getTime();
	isAlterUserInfoRef.value = true;
}

function showUpdateAccount() {
	copyMatchingProperties(info, newInfo);
	isAlterUserAccountInfoRef.value = true;
}

const updateHandler = debounce(() => {
	if (updateFormRef.value) {
		// console.log(info, newInfo);
		formValidator(updateFormRef, message, update);
	}

});

function update() {
	if (timestampRef.value) {
		newInfo.birthday = formatDate(timestampRef.value);
	}
	const _subInfo = subMatchingProperties(info, newInfo);
	if (!canUpdate(_subInfo)) {
		message.warning("没有需要更新的内容", messageOptions);
		// console.log(info, newInfo);
		return;
	}
	_subInfo.id = info.id;
	_subInfo.revision = info.revision;

	action(message, Service.Users.update(_subInfo), () => {
		message.success("修改成功", messageOptions);
		query();
		isAlterUserInfoRef.value = false;
		isAlterUserAccountInfoRef.value = false;
	});
}

async function query() {
	await queryItem(
		message,
		Service.Users.tokenUser(),
		info
	);
}

onBeforeMount(() => {
	query();
});

onMounted(async () => {
});
</script>

<template>
	<n-flex class="items-center" vertical>
		<n-card class="w-60em" title="个人资料信息">
			<template #header-extra>
				<n-button
					v-if="!isAlterUserInfoRef"
					:bordered="false"
					class="m-l-a color-[var(--n-text-color-focus)]"
					style="--n-padding: 0; --n-font-size: 16px"
					@click.prevent="showUpdate">
					编辑个人资料信息
				</n-button>
				<n-space>
					<n-button
						v-if="isAlterUserInfoRef"
						:bordered="false"
						secondary
						type="warning"
						@click="isAlterUserInfoRef = false;">
						取消
					</n-button>
					<n-button
						v-if="isAlterUserInfoRef"
						:bordered="false"
						type="warning"
						@click.prevent="updateHandler">
						提交
					</n-button>
				</n-space>
			</template>
			<n-form ref="updateFormRef" :model="newInfo" :rules="rules" :show-label="false" :show-feedback="false">
				<n-table :bordered="false">
					<tbody>
					<tr>
						<td>用户名</td>
						<td>
							<n-form-item path="displayName">
								<n-input :allow-input="inputValidator.noSideSpace" v-if="isAlterUserInfoRef"
								         v-model:value="newInfo.displayName" />
								<n-text v-else>{{ info.displayName }}</n-text>
							</n-form-item>
						</td>
						<td>用户名以用于帐户安全设置</td>
					</tr>
					<tr>
						<td>出生日期</td>
						<td>
							<n-form-item path="birthday" class="flex-auto">
								<n-date-picker :is-date-disabled="dateDisabled" class="w-100%" v-if="isAlterUserInfoRef"
								               v-model:value="timestampRef" type="date" />
								<n-text v-else>{{ info.birthday }}</n-text>
							</n-form-item>
						</td>
						<td>出生日期以用于帐户安全设置</td>
					</tr>
					<tr>
						<td>性别</td>
						<td>
							<n-form-item path="gender">
								<n-select v-if="isAlterUserInfoRef" v-model:value="newInfo.gender"
								          :options="GENDER_PRE_DEFINED" />
								<n-text v-else>{{ convertGender(info.gender) }}</n-text>
							</n-form-item>
						</td>
						<td>性别以用于帐户推荐设置</td>
					</tr>
					<tr>
						<td>用户名</td>
						<td>
							<n-input-group v-if="isAlterUserInfoRef" class="w-100%">
								<n-input-group-label>姓</n-input-group-label>
								<n-form-item path="surname">
									<n-input :allow-input="inputValidator.noSideSpace" v-model:value="newInfo.surname" />
								</n-form-item>
								<n-input-group-label>名</n-input-group-label>
								<n-form-item path="name" class="flex-auto">
									<n-input :allow-input="inputValidator.noSideSpace" v-model:value="newInfo.name" />
								</n-form-item>
							</n-input-group>
							<n-text v-else>{{ `${info.surname} ${info.name}` }}</n-text>
						</td>
						<td>用户名以用于帐户安全设置</td>
					</tr>
					</tbody>
				</n-table>
			</n-form>
		</n-card>

		<n-card class="w-60em" title="账户信息">
			<template #header-extra>
				<n-button
					v-if="!isAlterUserAccountInfoRef"
					:bordered="false"
					class="m-l-a color-[var(--n-text-color-focus)]"
					style="--n-padding: 0; --n-font-size: 16px"
					@click.prevent="showUpdateAccount"
				>
					编辑账户信息
				</n-button>
				<n-space v-else>
					<n-button
						v-if="isAlterUserAccountInfoRef"
						:bordered="false"
						secondary
						type="warning"
						@click="isAlterUserAccountInfoRef = false;">
						取消
					</n-button>
					<n-button
						v-if="isAlterUserAccountInfoRef"
						:bordered="false"
						type="warning"
						@click.prevent="updateHandler">
						提交
					</n-button>
				</n-space>
			</template>
			<n-form ref="updateFormRef" :model="newInfo" :rules="rules" :show-label="false" :show-feedback="false">
				<n-table :bordered="false">
					<tbody>
					<tr>
						<td>电子邮箱</td>
						<td>
							<n-form-item path="email">
								<n-input v-if="isAlterUserAccountInfoRef" v-model:value="newInfo.email" />
								<n-text v-else>{{ info.email }}</n-text>
							</n-form-item>
						</td>
						<td>用于登录 BookShelf 帐户的电子邮件地址</td>
					</tr>
					<tr>
						<td>电话号码</td>
						<td>
							<n-form-item path="phoneNumber">
								<n-input v-if="isAlterUserAccountInfoRef" v-model:value="newInfo.phoneNumber" />
								<n-text v-else>{{ info.phoneNumber }}</n-text>
							</n-form-item>
						</td>
						<td>电话号码以用于帐户安全设置</td>
					</tr>
					</tbody>
				</n-table>
			</n-form>
		</n-card>
	</n-flex>
</template>

<!--							<n-card class="w-60em">-->
<!--								<n-flex>-->
<!--									<n-avatar-->
<!--										:size="144"-->
<!--										bordered-->
<!--										round-->
<!--										src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"-->
<!--									/>-->
<!--									<n-flex class="w-20em" justify="center" vertical>-->
<!--										<span-->
<!--											>添加照片，个性化你的账户。-->
<!--											你的个人资料照片会显示在使用你的帐户的应用和设备上。</span-->
<!--										>-->
<!--										<n-button class="w-8em"> 更改图片</n-button>-->
<!--									</n-flex>-->
<!--									<n-divider style="margin: 0.5em 0" />-->
<!--								</n-flex>-->
<!--								<n-flex class="h-2em items-center">-->
<!--									<n-text class="w-10em">全名</n-text>-->
<!--									<n-text>{{ `汪汪  睡滨滨` }}</n-text>-->
<!--									<n-button-->
<!--										:bordered="false"-->
<!--										class="m-l-a color-[var(&#45;&#45;n-text-color-focus)]"-->
<!--										style="&#45;&#45;n-padding: 0; &#45;&#45;n-font-size: 16px"-->
<!--										@click="message.success('编辑全名')"-->
<!--									>-->
<!--										编辑名称-->
<!--									</n-button>-->
<!--								</n-flex>-->
<!--							</n-card>-->

<style scoped>
:deep(.n-card-header .n-card-header__main) {
	font-weight: bolder;
}

.n-table tr td:last-child {
	text-align: right;
}
</style>
