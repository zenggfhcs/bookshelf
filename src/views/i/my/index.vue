<script setup>
import { B_MY } from "@/constant/breadcrumb.js";
import { checkLoginState } from "@/utils/check-login-state.js";
import UserInfo from "@/views/p/user-info.vue";
import { onBeforeMount, onMounted } from "vue";

const props = defineProps(["updateMenuItem", "updateBreadcrumbArray"]);

onBeforeMount(() => {
	checkLoginState();
});

onMounted(() => {
	props.updateMenuItem("i-my");
	props.updateBreadcrumbArray(B_MY);
});
</script>

<template>
	<UserInfo />
</template>

<style scoped></style>
