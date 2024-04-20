<script setup>
import { Service } from "@/api/index.js";
import { GENDER_PRE_DEFINED } from "@/constant/map.js";
import { convertGender } from "@/utils/convert.js";
import { copyMatchingProperties } from "@/utils/index.js";
import { queryItem } from "@/utils/query.js";
import {
	NButton,
	NCard,
	NDatePicker,
	NFlex,
	NInput,
	NInputGroup,
	NInputGroupLabel,
	NSelect,
	NSpace,
	NTable,
	NText,
	useMessage
} from "naive-ui";
import { onMounted, reactive, ref } from "vue";

const message = useMessage();

const info = reactive({
	id: 1008611,
	displayName: "孤独的ou割",
	surname: "abc",
	name: "def abc efg",
	age: 19,
	gender: null,
	birthday: "1111-11-11",
	remark: "这是个人描述",
	email: "1008611@abc.efg",
	phoneNumber: "12345678910"
});

const newInfo = reactive({
	id: 0,
	displayName: "",
	surname: "",
	name: "",
	age: 0,
	gender: 0,
	birthday: "1111-11-11",
	email: "",
	phoneNumber: ""
});

const timestampRef = ref(0);


const alterUserInfoRef = ref(false);

onMounted(async () => {
	await queryItem(
		message,
		Service.Users.tokenUser(),
		info
	);

	timestampRef.value = new Date(info.birthday).getTime();
	copyMatchingProperties(info, newInfo);
});
</script>

<template>
	<n-flex class="items-center" vertical>
		<n-card class="w-60em" title="个人资料信息">
			<template #header-extra>
				<n-button
					v-if="!alterUserInfoRef"
					:bordered="false"
					class="m-l-a color-[var(--n-text-color-focus)]"
					style="--n-padding: 0; --n-font-size: 16px"
					@click="alterUserInfoRef = true;">
					编辑个人资料信息
				</n-button>
				<n-space>
					<n-button
						v-if="alterUserInfoRef"
						:bordered="false"
						secondary
						type="warning"
						@click="alterUserInfoRef = false;">
						取消
					</n-button>
					<n-button
						v-if="alterUserInfoRef"
						:bordered="false"
						type="warning"
						@click="">
						更新
					</n-button>
				</n-space>
			</template>
			<n-table :bordered="false">
				<tbody>
				<tr>
					<td>用户名</td>
					<td>
						<n-input v-if="alterUserInfoRef" v-model:value="newInfo.displayName" />
						<n-text v-else>{{ info.displayName }}</n-text>
					</td>
					<td>用户名以用于帐户安全设置</td>
				</tr>
				<tr>
					<td>出生日期</td>
					<td>
						<n-date-picker v-if="alterUserInfoRef" v-model:value="timestampRef" type="date" />
						<n-text v-else>{{ info.birthday }}</n-text>
					</td>
					<td>出生日期以用于帐户安全设置</td>
				</tr>
				<tr>
					<td>性别</td>
					<td>
						<n-select v-if="alterUserInfoRef" v-model:value="newInfo.gender" :options="GENDER_PRE_DEFINED" />
						<n-text v-else>{{ convertGender(info.gender) }}</n-text>
					</td>
					<td>性别以用于帐户推荐设置</td>
				</tr>
				<tr>
					<td>用户名</td>
					<td>
						<n-input-group v-if="alterUserInfoRef">
							<n-input-group-label>姓</n-input-group-label>
							<n-input v-if="alterUserInfoRef" v-model:value="newInfo.surname" />
							<n-input-group-label>名</n-input-group-label>
							<n-input v-if="alterUserInfoRef" v-model:value="newInfo.name" />
						</n-input-group>
						<n-text v-else>{{ `${info.surname} ${info.name}` }}</n-text>
					</td>
					<td>用户名以用于帐户安全设置</td>
				</tr>
				</tbody>
			</n-table>
		</n-card>

		<n-card class="w-60em" title="账户信息">
			<template #header-extra>
				<n-button
					:bordered="false"
					class="m-l-a color-[var(--n-text-color-focus)]"
					style="--n-padding: 0; --n-font-size: 16px"
					@click="message.success('编辑账户信息')"
				>
					编辑账户信息
				</n-button>
			</template>
			<n-table :bordered="false">
				<tbody>
				<tr>
					<td>电子邮箱</td>
					<td>
						<n-input v-if="alterUserInfoRef" v-model:value="info.email" />
						<n-text v-else>{{ info.email }}</n-text>
					</td>
					<td>用于登录 BookShelf 帐户的电子邮件地址</td>
				</tr>
				<tr>
					<td>电话号码</td>
					<td>
						<n-input v-if="alterUserInfoRef" v-model:value="info.phoneNumber" />
						<n-text v-else>{{ info.phoneNumber }}</n-text>
					</td>
					<td>电话号码以用于帐户安全设置</td>
				</tr>
				</tbody>
			</n-table>
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
:deep(.n-tabs-tab span),
span {
	font-size: 16px;
}

:deep(.n-card-header .n-card-header__main) {
	font-weight: bolder;
}

.n-table tr td:last-child {
	text-align: right;
}
</style>
