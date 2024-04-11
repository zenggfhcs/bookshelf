<script setup>
import BookShelf from "@/icons/book-shelf.vue";
import Search from "@/icons/search.vue";
import { goto } from "@/router/goto.js";
import { J_MY, J_QUERY_ADVANCED, J_QUERY_QUICK, J_QUERY_TYPE, J_READ_GUIDE } from "@/router/RouterValue.js";
import keywordStore from "@/store/keywordStore.js";
import { NButton, NCard, NFlex, NInput, NInputGroup, NSpace } from "naive-ui";
import { onMounted, ref } from "vue";

const props = defineProps(["updateMenuItem"]);


const queryKeyword = ref();

const queryKeywordStore = keywordStore();

function query() {
	queryKeywordStore.key = queryKeyword.value;
	goto(J_QUERY_QUICK);
}

onMounted(() => {
	props.updateMenuItem("j-index");
});
</script>

<template>
	<n-flex class="m-t-16" justify="center">
		<n-flex class="w-60em items-center" vertical>
			<BookShelf class="w-10em h-10em" />
			<div
				id="logo-text"
				class="logo-text line-height-1em font-size-4rem font-black v-c-n-text-color"
			>
				BookShelf
			</div>
			<n-input-group>
				<n-input v-model:value="queryKeyword" placeholder="请输入关键字" size="large" />

				<n-button ghost size="large" type="primary" @click.prevent="query" @keydown.enter="query">
					<template #icon>
						<Search />
					</template>
				</n-button>
			</n-input-group>
			<n-space class="max-w-50%">
				<router-link :to="J_QUERY_QUICK">
					<n-card class="max-w-max"> 快速检索</n-card>
				</router-link>
				<router-link :to="J_QUERY_ADVANCED">
					<n-card class="max-w-max"> 高级检索</n-card>
				</router-link>
				<router-link :to="J_QUERY_TYPE">
					<n-card class="max-w-max"> 类型检索</n-card>
				</router-link>
				<router-link :to="J_READ_GUIDE">
					<n-card class="max-w-max"> 读者指引</n-card>
				</router-link>
				<router-link :to="J_MY">
					<n-card class="max-w-max"> 我的图书馆</n-card>
				</router-link>
			</n-space>
		</n-flex>
	</n-flex>
</template>

<style scoped>
.logo-text {
	font-size: 4rem;
	letter-spacing: 0.125em;
	font-weight: bolder;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
	font-family: "Chinese Quotes", serif;
}
</style>
