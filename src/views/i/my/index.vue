<script setup>
import { B_MY } from "@/constant/breadcrumb.js";
import UserInfo from "@/views/p/user-info.vue";
import { onMounted } from "vue";

const props = defineProps(["updateMenuItem", "updateBreadcrumbArray"]);


onMounted(() => {
	props.updateMenuItem("i-my");
	props.updateBreadcrumbArray(B_MY);
});
</script>

<template>
	<UserInfo />
</template>

<style scoped></style>
