<script setup>
import BookBrain from "@/icons/book-brain.vue";
import BookShelf from "@/icons/book-shelf.vue";
import Flying from "@/icons/flying.vue";
import sun from "@/icons/sun.vue";
import { NButton, NCard, NFlex, NGi, NGrid, NIcon, NLayout } from "naive-ui";

const props = defineProps(["switchTheme"]);
</script>
<template>
	<n-layout :native-scrollbar="false" class="z--2" position="absolute">
		<n-flex justify="center">
			<n-card class="w-30em m-t-10em">
				<n-grid class="w-100%" cols="7">
					<n-gi />
					<n-gi>
						<BookBrain class="w-15 h-15" />
					</n-gi>
					<n-gi />
					<n-gi>
						<Flying class="w-15 h-15" />
					</n-gi>
					<n-gi />
					<n-gi>
						<BookShelf class="w-15 h-15" />
					</n-gi>
					<n-gi />
				</n-grid>
				<router-view />
			</n-card>
			<!--			<n-flex :size="0" class="w-100 p-8 m-t-16 b-rd-4 v-tc-n-color" justify="center">-->

			<!--				<n-layout class="z-1">-->
			<!--				</n-layout>-->
			<!--			</n-flex>-->
		</n-flex>
	</n-layout>
	<n-button
		circle
		class="absolute bottom-3em right-3em z-1"
		size="large"
		strong
		@click="props.switchTheme()"
	>
		<template #icon>
			<n-icon :component="sun" />
		</template>
	</n-button>
</template>

<style scoped>
@import "/src/styles/form-item-input.css";
</style>
