<script setup>
import Book from "@/components/book.vue";
import {BASE_I, J_HOME, LOGIN, REGISTER} from "@/router/RouterValue.js";
import {checkLoginState} from "@/utils/check-login-state.js";
import {gProps} from "@/utils/generate.js";
import {expandIcon, renderIcon} from "@/utils/render.js";
import {Home} from "@vicons/fa";
import {NButton, NFlex, NLayout, NLayoutHeader, NMenu} from 'naive-ui'
import {h, onMounted, ref} from "vue";
import {RouterLink} from "vue-router";

const props = defineProps(['switchTheme', 'isDark']);

const menuItemValue = ref("");

const updateMenuItem = (v) => {
	menuItemValue.value = v;
}

onMounted(() => {
	checkLoginState();
	// localStorage.clear();
})

const menuOptions = [
	{
		label: () =>
			h(
				RouterLink,
				gProps(J_HOME.name),
				{default: () => '首页'}
			),
		key: 'j-index',
		icon: renderIcon(Home)
	},
]
</script>

<template>
	<n-layout-header class="h-3em" position="absolute">
		<n-flex class="h-3em items-center m-r-1em" style="flex-wrap: nowrap">
			<n-menu
				v-model:value="menuItemValue"
				:collapsed-icon-size="16"
				:expand-icon="expandIcon"
				:options="menuOptions"
				class="font-size-5"
				mode="horizontal"
			/>
			<!-- todo 添加头像，登录后显示，没有登录显示以下内容 -->
			<router-link :to="LOGIN">
				<n-button :bordered="false" style="--n-padding: 0;">
					Sign in
				</n-button>
			</router-link>
			<router-link :to="REGISTER">
				<n-button class="no-border-btn" tag="span">
					Sign up
				</n-button>
			</router-link>
			<router-link :to="BASE_I">
				<n-button class="no-border-btn" type="info">
					神秘的地方
				</n-button>
			</router-link>
		</n-flex>
	</n-layout-header>
	<n-layout :native-scrollbar="false" class="absolute top-3em bottom-0 left-0 right-0 bg-#00bd7e"
	          content-style="padding: .5em;">
		<Book/>
		<router-view v-slot="{ Component}">
			<component :is="Component" :updateMenuItem="updateMenuItem"/>
		</router-view>
	</n-layout>

</template>

<style scoped>
@import url(@/styles/no-border-btn.css);
</style>