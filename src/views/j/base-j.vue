<script setup>
import {Header} from "@/api/Header.js";
import Home from "@/icons/home.vue";
import Statistics from "@/icons/i-statistics.vue";
import moon from "@/icons/moon.vue";
import Msg from "@/icons/msg.vue";
import Search from "@/icons/search.vue";
import sun from "@/icons/sun.vue";
import {BASE_I, J_CHECK, J_HOME, J_STATISTICS, J_USER_INFO, LOGIN, REGISTER} from "@/router/RouterValue.js";
import {local} from "@/storage/local.js";
import {checkLoginState} from "@/utils/check-login-state.js";
import {gProps} from "@/utils/generate.js";
import logout from "@/utils/logout.js";
import {expandIcon, renderIcon} from "@/utils/render.js";
import {
	NBadge,
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
	useMessage,
} from 'naive-ui'
import {computed, h, onBeforeMount, onMounted, ref} from "vue";
import {RouterLink} from "vue-router";

const props = defineProps(['switchTheme', 'isDark']);

const message = useMessage();

const menuItemValue = ref("");

const logoutConfirmationShow = ref(false);

const loginStatus = ref(false);

const showLogout = () => logoutConfirmationShow.value = true;

const updateMenuItem = (v) => {
	menuItemValue.value = v;
}

const showUserPopover = ref(false);

const canSwitch = ref(true);

// todo
const switchShowUserPopover = (target = !showUserPopover.value) => {
	if (canSwitch.value) {
		showUserPopover.value = target;
	}
}

const handleClickPopoverOutSide = () => {
	showUserPopover.value = false;
	canSwitch.value = false;
	setTimeout(() => {
		canSwitch.value = true;
	}, 100);
}

onMounted(() => {
	checkLoginState();
	// localStorage.clear();
})

const menuOptions = [
	{
		label: () => h(
			RouterLink,
			gProps(J_HOME.name),
			{default: () => '首页'}
		),
		key: 'j-index',
		icon: renderIcon(Home)
	},
	{
		label: () => h(
			RouterLink,
			gProps(J_CHECK.name),
			{default: () => '查阅'}
		),
		key: "j-check",
		icon: renderIcon(Search)
	},
	{
		label: () => h(
			RouterLink,
			gProps(J_STATISTICS.name),
			{default: () => '统计'},
		),
		key: "j-statistics",
		icon: renderIcon(Statistics)
	},
	{
		label: () => h(
			RouterLink,
			gProps(J_STATISTICS.name),
			{default: () => '借阅记录'},
		),
		key: "j-debit-info",
		icon: renderIcon(Statistics)
	}
]

const themeIcon = computed(() => {
	return props.isDark ? moon : sun;
})

onBeforeMount(() => {
	if (local.get(Header.TOKEN)) {
		loginStatus.value = true;
	}
})
</script>

<template>
	<n-layout position="absolute" :native-scrollbar="false">
		<n-layout-header bordered class="h-3em">
			<n-flex justify="center">
				<n-flex class="w-80em h-3em items-center" style="flex-wrap: nowrap">
					<n-menu
						v-model:value="menuItemValue"
						:collapsed-icon-size="16"
						:expand-icon="expandIcon"
						:options="menuOptions"
						:root-indent="0"
						class="font-size-5"
						mode="horizontal"
					/>
					<n-badge :value="15" class="m-l-a" dot>
						<Msg class="w-2em h-2em"/>
					</n-badge>
					<n-button circle size="large" strong @click="props.switchTheme()">
						<template #icon>
							<n-icon :component="themeIcon"/>
						</template>
					</n-button>
					<!-- todo 添加头像，登录后显示，没有登录显示以下内容 -->
					<template v-if="loginStatus">
						<n-popover :show="showUserPopover" class="p-0" placement="bottom"
						           trigger="click" @clickoutside.prevent="handleClickPopoverOutSide()">
							<template #trigger>
								<n-button class="m-.2em h-3em w-3em b-rd-50% p-0 b-0 cursor-pointer"
								          @click.prevent="switchShowUserPopover()">
                        <span class="font-800 font-size-1em"
                              style="font-family: inter,sans-serif;">ME</span>
								</n-button>
							</template>
							<n-form label-placement="left">
								<n-flex style="text-align: justify;" vertical>
									<router-link :to="BASE_I.path">
										<n-button :bordered="false" class="w-100% no-border-btn">
											后台
										</n-button>
									</router-link>
									<router-link :to="J_USER_INFO.path">
										<n-button :bordered="false" class="w-100% no-border-btn"
										          @click="switchShowUserPopover(false)">
											个人信息
										</n-button>
									</router-link>
									<n-button :bordered="false" class="no-border-btn"
									          @click.prevent="switchShowUserPopover(false); showLogout();">
										登出
									</n-button>
								</n-flex>
							</n-form>
						</n-popover>
					</template>
					<template v-else>
						<router-link :to="LOGIN">
							<n-button :bordered="false" style="--n-padding: 0;">
								Sign in
							</n-button>
						</router-link>
						<router-link :to="REGISTER">
							<n-button tag="span">
								Sign up
							</n-button>
						</router-link>
					</template>
				</n-flex>
			</n-flex>
		</n-layout-header>
		<n-layout content-style="padding: 1em;">
			<router-view v-slot="{ Component}">
				<component :is="Component" :updateMenuItem="updateMenuItem"/>
			</router-view>
		</n-layout>
	</n-layout>
	<n-modal
		id="logout-modal"
		v-model:show="logoutConfirmationShow"
		preset="dialog"
		style="--n-font-size: 16px;"
		title="退出二次确认"
		transform-origin="center"
		type="warning"
	>
		<n-space vertical>
					<span>
						您是否要退出登录？
					</span>
			<n-flex justify="right">
				<n-button type="warning" @click="logout(message)">
					确定
				</n-button>
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