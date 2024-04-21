<template>
	<n-config-provider :theme="theme">
		<n-layout :native-scrollbar="false" position="absolute">
			<n-layout-footer>
				<n-card>
					<n-space>
						<n-button @click="theme = darkTheme">
							深色
						</n-button>
						<n-button @click="theme = null">
							浅色
						</n-button>
					</n-space>
				</n-card>
			</n-layout-footer>
		</n-layout>
	</n-config-provider>
</template>

<script setup>
import { darkTheme, NButton, NCard, NConfigProvider, NLayout, NLayoutFooter, NSpace } from "naive-ui";
import { ref } from "vue";

const theme = ref(null);
</script>