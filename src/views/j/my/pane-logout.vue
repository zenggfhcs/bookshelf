<script setup>
import logout from "@/utils/logout.js";
import { NButton, NCard, NFlex, NSpace, useMessage } from "naive-ui";

const message = useMessage();
</script>

<template>
	<n-flex justify="center">
		<n-card class="w-30em">
			<n-space vertical>
				<span class="font-bold font-size-1.2em"> 您是否要退出登录？ </span>
				<n-flex justify="right">
					<n-button type="warning" @click="logout(message)"> 是</n-button>
				</n-flex>
			</n-space>
		</n-card>
	</n-flex>
</template>

<style scoped>

</style>