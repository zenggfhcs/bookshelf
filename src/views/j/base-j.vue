<script setup>
import {BASE_I, J_HOME} from "@/router/RouterValue.js";
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
		<n-flex class="h-3em items-center" style="flex-wrap: nowrap">
			<n-menu
				v-model:value="menuItemValue"
				:collapsed-icon-size="16"
				:expand-icon="expandIcon"
				:options="menuOptions"
				class="font-size-5"
				mode="horizontal"
			/>
			<router-link :to="BASE_I">
				<n-button type="info">
					神秘的地方
				</n-button>
			</router-link>
		</n-flex>
	</n-layout-header>
	<n-layout :native-scrollbar="false" class="absolute top-3em bottom-0 left-0 right-0 bg-#00bd7e"
	          content-style="padding: .5em;">
		<router-view v-slot="{ Component}">
			<component :is="Component" :updateMenuItem="updateMenuItem"/>
		</router-view>
	</n-layout>

</template>

<style scoped>
</style>