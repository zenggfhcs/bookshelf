<script setup>

const props = defineProps(["updateMenuItem"]);
{
	props.updateMenuItem("j-quick-query");
}
</script>

<template>
	<RouterView />
</template>

<style scoped>
.logo-text {
	letter-spacing: 0.125em;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
	font-family: "Chinese Quotes", serif;
}
</style>
