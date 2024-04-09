<script setup>
import Search from "@/icons/search.vue";
import { NButton, NInput, NInputGroup, NSelect } from "naive-ui";
</script>

<template>
	<n-input-group>
		<n-select size="large" :style="{ width: '300px' }" />
		<n-input size="large" />
		<n-button ghost size="large" type="primary">
			<template #icon>
				<Search />
			</template>
		</n-button>
	</n-input-group>
</template>

<style scoped></style>
