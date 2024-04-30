<script setup>
import { action } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { Header } from "@/constant/Header.js";
import { getIconByName } from "@/icons/getIconByName.js";
import sun from "@/icons/sun.vue";
import { BASE_I, J_MY_LIB, LOGIN, REGISTER } from "@/router/route-value.js";
import { local } from "@/storage/local.js";
import { gProps } from "@/utils/generate.js";
import logout from "@/utils/logout.js";
import { expandIcon, renderIcon } from "@/utils/render.js";
import {
	NBackTop,
	NButton,
	NFlex,
	NForm,
	NIcon,
	NLayout,
	NLayoutHeader,
	NMenu,
	NModal,
	NPopover,
	NSpace,
	useMessage
} from "naive-ui";
import { computed, h, onBeforeMount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
	switchTheme: Function
});

const message = useMessage();

const menuItemValue = ref("");

const logoutConfirmationShow = ref(false);

const loginStatus = ref(false);

function showLogout() {
	logoutConfirmationShow.value = true;
}

function updateMenuItem(v) {
	menuItemValue.value = v;
}

const showUserPopover = ref(false);

const canSwitch = ref(true);

// todo
function switchShowUserPopover(target = !showUserPopover.value) {
	if (canSwitch.value) {
		showUserPopover.value = target;
	}
}

function handleClickPopoverOutSide() {
	showUserPopover.value = false;
	canSwitch.value = false;
	setTimeout(() => {
		canSwitch.value = true;
	}, 100);
}

onMounted(() => {

	// localStorage.clear();
});

const menuOptions = ref([]);
// 	[
// 	{
// 		label: () =>
// 			h(RouterLink, gProps(J_HOME.name), { default: () => "首页" }),
// 		key: "j-index",
// 		icon: renderIcon(Home)
// 	},
// 	{
// 		label: () =>
// 			h(RouterLink, gProps(J_QUERY.name), { default: () => "检索" }),
// 		// children: [
// 		// 	{
// 		// 		label: () =>
// 		// 			h(RouterLink, gProps(J_QUERY_QUICK.name), { default: () => "快速检索" }),
// 		// 		key: "j-quick-query"
// 		// 	},
// 		// 	{
// 		// 		label: () =>
// 		// 			h(RouterLink, gProps(J_QUERY_ADVANCED.name), { default: () => "高级检索" }),
// 		// 		key: "j-advanced-query"
// 		// 	},
// 		// 	{
// 		// 		label: () =>
// 		// 			h(RouterLink, gProps(J_QUERY_TYPE.name), { default: () => "分类检索" }),
// 		// 		key: "j-type-query"
// 		// 	},
// 		// 	{
// 		// 		label: () =>
// 		// 			h(RouterLink, gProps(J_READ_GUIDE.name), { default: () => "读书指引" }),
// 		// 		key: "j-read-guide"
// 		// 	}
// 		// ],
// 		key: "j-query",
// 		icon: renderIcon(Search)
// 	},
// 	{
// 		label: () =>
// 			h(RouterLink, gProps(J_READ_GUIDE.name), { default: () => "读书指引" }),
// 		key: "j-read-guide",
// 		icon: renderIcon(IGuide)
// 	},
// 	// {
// 	// 	label: () =>
// 	// 		h(RouterLink, gProps(J_MY_LIB.name), { default: () => "统计" }),
// 	// 	key: "j-statistics",
// 	// 	icon: renderIcon(Statistics)
// 	// },
// 	{
// 		label: () =>
// 			h(RouterLink, gProps(J_MY_LIB.name), {
// 				default: () => "我的图书馆"
// 			}),
// 		key: "j-my-info",
// 		icon: renderIcon(IUser)
// 	}
// ];

const themeIcon = computed(() => {
	return sun;
});

function generateMenuItem(routeItem) {
	const menuItem = {};
	menuItem.label = routeItem?.toName ? () => h(RouterLink, gProps(routeItem?.toName), {
			default: () => routeItem.label
		})
		: routeItem.label;
	menuItem.key = routeItem?.key;
	menuItem.icon = routeItem?.iconName ?
		renderIcon(getIconByName(routeItem.iconName))
		: null;
	menuItem.children = routeItem?.children.map(item => generateMenuItem(item));
	return menuItem;
}

onBeforeMount(() => {
	if (local.get(Header.TOKEN)) {
		loginStatus.value = true;
	}
	action(message, Service.Routes.getByGroup("reader-menu"), (res) => {
		console.log(res);
		menuOptions.value = res?.map(item => generateMenuItem(item));
	}, () => {});
});
</script>

<template>
	<n-layout :native-scrollbar="false" position="absolute">
		<n-layout-header bordered class="h-3em">
			<n-flex justify="center">
				<n-flex class="w-80em h-3em items-center" style="flex-wrap: nowrap">
					<n-menu
						v-model:value="menuItemValue"
						:collapsed-icon-size="16"
						:expand-icon="expandIcon"
						:options="menuOptions"
						:root-indent="0"
						mode="horizontal" />
					<n-button
						circle
						strong
						@click.prevent="props.switchTheme"
					>
						<template #icon>
							<n-icon :component="themeIcon" />
						</template>
					</n-button>
					<template v-if="loginStatus">
						<n-popover
							:show="showUserPopover"
							class="p-0"
							placement="bottom"
							trigger="click"
							@clickoutside.prevent="handleClickPopoverOutSide()"
						>
							<template #trigger>
								<n-button
									class="h-2.4em w-2.4em b-rd-50% p-0 b-0 cursor-pointer"
									@click.prevent="switchShowUserPopover()">
									<span style="font-family: inter, sans-serif">ME</span>
								</n-button>
							</template>
							<n-form label-placement="left">
								<n-flex style="text-align: justify" vertical>
									<router-link :to="BASE_I.path">
										<n-button
											:bordered="false"
											class="w-100% no-border-btn"
										>
											后台
										</n-button>
									</router-link>
									<router-link :to="J_MY_LIB.path">
										<n-button
											:bordered="false"
											class="w-100% no-border-btn"
											@click="switchShowUserPopover(false)"
										>
											个人信息
										</n-button>
									</router-link>
									<n-button
										:bordered="false"
										class="no-border-btn"
										@click.prevent="
											switchShowUserPopover(false);
											showLogout();
										"
									>
										登出
									</n-button>
								</n-flex>
							</n-form>
						</n-popover>
					</template>
					<template v-else>
						<router-link :to="LOGIN">
							<n-button :bordered="false" style="--n-padding: 0">
								Sign in
							</n-button>
						</router-link>
						<router-link :to="REGISTER">
							<n-button tag="span"> Sign up</n-button>
						</router-link>
					</template>
				</n-flex>
			</n-flex>
		</n-layout-header>
		<n-layout
			:native-scrollbar="false"
			class="absolute top-3em bottom-0 left-0 right-0"
			content-style="padding: 1em;"
		>
			<router-view v-slot="{ Component }">
				<component :is="Component" :updateMenuItem="updateMenuItem" />
			</router-view>
			<n-back-top />
		</n-layout>
	</n-layout>
	<n-modal
		id="logout-modal"
		v-model:show="logoutConfirmationShow"
		preset="dialog"
		style="--n-font-size: 16px"
		title="退出二次确认"
		transform-origin="center"
		type="warning"
	>
		<n-space vertical>
			<span> 您是否要退出登录？ </span>
			<n-flex justify="right">
				<n-button type="warning" @click="logout(message)"> 是</n-button>
			</n-flex>
		</n-space>
	</n-modal>
</template>

<style scoped>
@import url(@/styles/no-border-btn.css);

:deep(div.n-menu.n-menu--horizontal div.n-menu-item-content) {
	padding: 0;
	margin: 0 2em 0 0;
}
</style>
