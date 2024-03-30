<script setup>

import Search from "@/icons/search.vue";
import {NButton, NInput, NInputGroup} from "naive-ui";
</script>

<template>
	<n-input-group>
		<n-input size="large"/>
		<n-button ghost size="large" type="primary">
			<template #icon>
				<Search/>
			</template>
		</n-button>
	</n-input-group>
</template>

<style scoped>

</style>