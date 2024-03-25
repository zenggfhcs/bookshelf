<script setup>
import {NProgress} from "naive-ui";

const props = defineProps(['updateMenuItem']);
{
	props.updateMenuItem('j-statistics');
}
</script>

<template>
	<n-progress :percentage="80" gap-position="bottom" type="dashboard"/>
</template>

<style scoped>

</style>