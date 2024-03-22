<script setup>

import {NAvatar, NCard, NGi, NGrid, NLayout, NText} from "naive-ui";

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
}

</script>

<template>
	<n-card class="w-60em">
		<n-layout>
			<n-grid cols="3">
				<n-gi span="2">
					<n-text class="font-size-1.5em">
						<n-text depth="3">
							昵称:
						</n-text>
						{{ info.displayName }}
					</n-text>
					<br>
					<n-text>
						<n-text depth="3">
							用户名:
						</n-text>
						{{ `${info.surname} ${info.name}` }}
					</n-text>
					<br>
					<n-text>
						<n-text depth="3">
							邮箱:
						</n-text>
						{{ info.email }}
					</n-text>
					<br>
					<n-text>
						<n-text depth="3">
							电话号码:
						</n-text>
						{{ info.phoneNumber }}
					</n-text>
					<br>
					<n-text>
						<n-text depth="3">
							年龄:
						</n-text>
						{{ info.age }}
					</n-text>
					<br>
					<n-text>
						<n-text depth="3">
							性别:
						</n-text>
						{{ info.gender }}
					</n-text>
					<br>
					<n-text>
						<n-text depth="3">
							个人描述:
						</n-text>
						{{ info.remark }}
					</n-text>
				</n-gi>
				<n-gi class="text-center">
					<n-avatar :size="192" round src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"/>
				</n-gi>
			</n-grid>
		</n-layout>
	</n-card>
</template>

<style scoped>

</style>