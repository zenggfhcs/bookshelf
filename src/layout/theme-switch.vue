<script setup>
import moon from "@/icons/moon.vue";
import sun from "@/icons/sun.vue";
import {darkTheme, NButton, NConfigProvider, NIcon} from "naive-ui";
import {ref} from "vue";

const isDark = ref(false);

</script>
<!-- todo bg -->
<template>
	<n-config-provider :theme="isDark ? darkTheme : null">
		<slot></slot>
		<n-button circle class="absolute bottom-3em right-3em z-1" size="large" strong @click="isDark = !isDark">
			<template #icon>
				<n-icon :component="isDark ? moon : sun"/>
			</template>
		</n-button>
	</n-config-provider>
</template>

<style scoped>
@import "/src/styles/form-item-input.css";
</style>
