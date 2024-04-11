<script setup>
import PaneCurrentDebit from "@/views/j/my/pane-current-debit.vue";
import PaneLogout from "@/views/j/my/pane-logout.vue";
import PaneMyInfo from "@/views/j/my/pane-my-info.vue";
import PaneRepayInfo from "@/views/j/my/pane-repay-info.vue";
import PaneReserveInfo from "@/views/j/my/pane-reserve-info.vue";
import PaneResetPassword from "@/views/j/my/pane-reset-password.vue";
import { NTabPane, NTabs, useMessage } from "naive-ui";
import { onMounted } from "vue";

const props = defineProps(["updateMenuItem"]);

const message = useMessage();

function handleBeforeLeave(tabName) {
	switch (tabName) {
		case "":
			return false;
		default:
			return true;
	}
}

function handleUpdateValue(value) {
	message.info(value);
}

onMounted(() => {
	props.updateMenuItem("j-my-info");
});
</script>

<template>
	<n-tabs
		animated
		placement="left"
		type="line"
		@before-leave="handleBeforeLeave"
	>
		<n-tab-pane name="personal-info" tab="个人信息">
			<PaneMyInfo />
		</n-tab-pane>
		<n-tab-pane name="alter-password" tab="修改密码">
			<PaneResetPassword />
		</n-tab-pane>
		<n-tab-pane name="" tab="" />
		<n-tab-pane name="current-debit" tab="当前借阅情况">
			<PaneCurrentDebit />
		</n-tab-pane>
		<n-tab-pane name="repay-info" tab="催还图书信息">
			<PaneRepayInfo />
		</n-tab-pane>
		<n-tab-pane name="reserve-info" tab="预约图书信息">
			<PaneReserveInfo />
		</n-tab-pane>
		<n-tab-pane name="" tab="" />
		<n-tab-pane name="feedback" tab="意见反馈">
		</n-tab-pane>
		<n-tab-pane name="logout" tab="退出登录">
			<PaneLogout />
		</n-tab-pane>
	</n-tabs>
</template>

<style scoped>

</style>