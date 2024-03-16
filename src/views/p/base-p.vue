<script setup>
import Bg from "@/components/bg.vue";
import BookBrain from "@/icons/book-brain.vue";
import BookShelf from "@/icons/book-shelf.vue";
import Flying from "@/icons/flying.vue";
import moon from "@/icons/moon.vue";
import sun from "@/icons/sun.vue";
import {NButton, NFlex, NGi, NGrid, NIcon, NLayout} from "naive-ui";

const props = defineProps(['switchTheme', 'isDark']);

</script>
<template>
	<n-layout class="z--2" position="absolute">
		<bg/>
		<n-flex justify="center">
			<n-flex class="w-100 p-8 m-t-16 b-rd-4 v-tc-n-color" justify="center">
				<n-grid class="w-100%" cols="7">
					<n-gi/>
					<n-gi>
						<BookBrain class="w-15 h-15"/>
					</n-gi>
					<n-gi/>
					<n-gi>
						<Flying class="w-15 h-15"/>
					</n-gi>
					<n-gi/>
					<n-gi>
						<BookShelf class="w-15 h-15"/>
					</n-gi>
					<n-gi/>
				</n-grid>
				<router-view class="z-1"/>
			</n-flex>
		</n-flex>
	</n-layout>
	<n-button circle class="absolute bottom-3em right-3em z-1" size="large" strong @click="props.switchTheme()">
		<template #icon>
			<n-icon :component="props.isDark ? moon : sun"/>
		</template>
	</n-button>
</template>

<style scoped>
@import "/src/styles/form-item-input.css";
</style>
