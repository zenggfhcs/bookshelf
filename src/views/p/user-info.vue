<script setup>
import ShowOrEdit from "@/components/show-or-edit.vue";
import {
	NButton,
	NCard,
	NDivider,
	NFlex,
	NSpace,
	NTabPane,
	NTabs,
	NText,
	useMessage,
} from "naive-ui";
import { ref } from "vue";

const message = useMessage();

const info = {
	id: 1008611,
	displayName: "孤独的ou割",
	surname: "abc",
	name: "def abc efg",
	age: 19,
	gender: 1,
	birthday: "1111-11-11",
	remark: "这是个人描述",
	email: "1008611@abc.efg",
	phoneNumber: "12345678910",
};

const inputRef = ref("1");
</script>

<template>
	<n-tabs animated placement="left" type="card">
		<n-tab-pane name="my-info" tab="我的信息">
			<n-space :size="16">
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

				<n-card title="个人资料信息">
					<template #header-extra>
						<n-button
							:bordered="false"
							class="m-l-a color-[var(--n-text-color-focus)]"
							style="--n-padding: 0; --n-font-size: 16px"
							@click="message.success('编辑个人资料信息')"
						>
							编辑个人资料信息
						</n-button>
					</template>
					<n-divider style="margin: 0.5em 0" />
					<n-flex class="h-2em items-center">
						<n-text class="w-10em">用户名</n-text>
						<n-text>汪汪睡滨滨</n-text>
						<n-text class="m-l-a">用户名以用于帐户安全设置 </n-text>
					</n-flex>
					<n-divider style="margin: 0.5em 0" />
					<n-flex class="h-2em items-center">
						<n-text class="w-10em">出生日期</n-text>
						<n-text>1111-11-11</n-text>
						<n-text class="m-l-a">出生日期以用于帐户安全设置 </n-text>
					</n-flex>
					<n-divider style="margin: 0.5em 0" />
					<n-flex class="h-2em items-center">
						<n-text class="w-10em">性别</n-text>
						<n-text>蓝</n-text>
						<n-text class="m-l-a">性别以用于帐户推荐设置</n-text>
					</n-flex>
					<n-divider style="margin: 0.5em 0" />
					<n-flex class="h-2em items-center">
						<n-text class="w-10em">用户名</n-text>
						<n-text>汪汪睡滨滨</n-text>
						<n-text class="m-l-a">用户名以用于帐户安全设置 </n-text>
					</n-flex>
				</n-card>

				<n-card title="账户信息">
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
					<n-divider style="margin: 0.5em 0" />
					<n-flex class="h-2em items-center">
						<n-text class="w-10em">电子邮箱</n-text>
						<n-text>汪汪睡滨滨</n-text>
						<n-text class="m-l-a"
							>用于登录 BookShelf 帐户的电子邮件地址
						</n-text>
					</n-flex>
					<n-divider style="margin: 0.5em 0" />
					<n-flex class="h-2em items-center">
						<n-text class="w-10em">电话号码</n-text>
						<n-text>汪汪睡滨滨</n-text>
						<n-text class="m-l-a">电话号码以用于帐户安全设置 </n-text>
					</n-flex>
				</n-card>
			</n-space>
		</n-tab-pane>
		<n-tab-pane name="reset-password" tab="修改密码"> 修改密码 </n-tab-pane>
		<n-tab-pane name="feedback" tab="意见反馈">
			<ShowOrEdit
				:value="inputRef"
				:on-update-value="
					(v) => {
						inputRef = v;
					}
				"
			/>
		</n-tab-pane>
	</n-tabs>
</template>

<style scoped>
:deep(.n-tabs-tab span),
span {
	font-size: 16px;
}

:deep(.n-card-header .n-card-header__main) {
	font-weight: bolder;
}
</style>
