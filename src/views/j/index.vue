<script setup>
import BookShelf from "@/icons/book-shelf.vue";
import Search from "@/icons/search.vue";
import {NButton, NCard, NFlex, NInput, NInputGroup, NLayout, NSpace} from "naive-ui";

const props = defineProps(['updateMenuItem']);
{
	props.updateMenuItem('j-index');
}

</script>

<template>
	<n-layout position="absolute">
		<n-flex class="m-t-16" justify="center">
			<n-flex class="w-60em items-center" vertical>
				<BookShelf class="w-10em h-10em"/>
				<div id="logo-text" class="logo-text line-height-1em font-size-4rem font-black v-c-n-text-color ">
					BookShelf
				</div>
				<n-input-group>
					<n-input size="large"/>
					<n-button ghost size="large" type="primary">
						<template #icon>
							<Search/>
						</template>
					</n-button>
				</n-input-group>
				<n-space class="max-w-50%">
					<router-link to="/j/index">
						<n-card class="max-w-max">
							高级检索
						</n-card>
					</router-link>
					<router-link to="/j/index">
						<n-card class="max-w-max">
							神秘的地方
						</n-card>
					</router-link>
				</n-space>
			</n-flex>
		</n-flex>
	</n-layout>
</template>

<style scoped>
.logo-text {
	letter-spacing: .125em;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, .8);
	font-family: "Chinese Quotes", serif;
}
</style>