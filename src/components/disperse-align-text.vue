<script setup>

import { NFlex } from "naive-ui";

const props = defineProps({
	data: String
});
</script>

<template>
	<n-flex justify="space-between">
		<span v-for="(item, index) in data" :key="index">{{ item }}</span>
	</n-flex>
</template>

<style scoped>

</style>