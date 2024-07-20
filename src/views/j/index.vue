<script setup>
import { messageOptions } from "@/constant/options.js";
import BookShelf from "@/icons/i-book-shelf.vue";
import Search from "@/icons/i-query.vue";
import { goto_ } from "@/router/goto.js";
import { J_MY_LIB, J_READER_GUIDE } from "@/router/route-value.js";
import { NButton, NFlex, NInput, NInputGroup, NSpace, useMessage } from "naive-ui";
import { onMounted, ref } from "vue";

const props = defineProps(["updateMenuItem"]);

const message = useMessage();

const queryKeyword = ref();

function query() {
	if (!queryKeyword.value) {
		message.warning("检索内容不可为空", messageOptions);
		return;
	}
	goto_(`/query?keyword=${queryKeyword.value}`);
}

function toQuery(type) {
	goto_(`/query?tab=${type}`);
}

onMounted(() => {
	props.updateMenuItem("home");
});
</script>

<template>
	<n-flex class="m-t-16" justify="center">
		<n-flex class="w-60em items-center" vertical>
			<BookShelf class="w-10em h-10em" />
			<div
				id="logo-text"
				class="logo-text line-height-1em font-size-4rem font-black v-c-n-text-color">
				BookShelf
			</div>
			<n-input-group>
				<n-input status="success" class="text-center" round v-model:value="queryKeyword" @keydown.enter="query" placeholder="请输入关键字" size="large" />
<!--				<n-button ghost size="large" type="primary" @click.prevent="query">-->
<!--					<template #icon>-->
<!--						<Search />-->
<!--					</template>-->
<!--				</n-button>-->
			</n-input-group>
			<n-space>
				<!--				<n-button class="w-7em" secondary @click.prevent="toQuery('quick')">快速检索</n-button>-->
				<n-button class="h-5em" secondary @click.prevent="toQuery('advanced')">高级检索</n-button>
				<n-button class="h-5em" secondary @click.prevent="toQuery('type')">类型检索</n-button>
				<router-link :to="J_READER_GUIDE">
					<n-button class="h-5em" secondary>读者指引</n-button>
				</router-link>
				<router-link :to="J_MY_LIB">
					<n-button class="h-5em" secondary>我的图书馆</n-button>
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
