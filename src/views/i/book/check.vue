<script setup>
// todo start
import { B_BOOK_CHECK } from "@/constant/breadcrumb.js";
import { checkLoginState } from "@/utils/check-login-state.js";
import { onBeforeMount, onMounted } from "vue";

const props = defineProps(["id", "updateMenuItem", "updateBreadcrumbArray"]);

onBeforeMount(() => {
	checkLoginState();
});

onMounted(() => {
	props.updateMenuItem("i-book");
	props.updateBreadcrumbArray(B_BOOK_CHECK(props.id));
	query();
});
</script>

<template>
	<!--	todo add form -->
	a?
</template>

<style scoped></style>
