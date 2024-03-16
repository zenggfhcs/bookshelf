<script setup>
import {Header} from "@/api/Header.js";
import BookBrain from "@/icons/book-brain.vue";
import LogIcon from "@/icons/log.vue";
import moon from "@/icons/moon.vue";
import PublisherIcon from "@/icons/publisher.vue";
import sun from "@/icons/sun.vue";
import router from "@/router/Router.js";
import {BASE_I, BOOK, BOOK_INFO, DEBIT, LOG, LOGIN, PUBLISHER, USER} from "@/router/RouterValue.js";
import {checkLoginState} from "@/utils/check-login-state.js";
import {gProps} from "@/utils/generate.js";
import {expandIcon, renderIcon} from "@/utils/render.js";
import {sleep} from "@/utils/sleep.js";
import {
	Book as BookManagerIcon,
	BookOpen as BookInfoManagerIcon,
	BookReader as DebitManagerIcon,
	UsersCog as UserManagerIcon
} from "@vicons/fa";
import {
	NButton,
	NFlex,
	NForm,
	NIcon,
	NLayout,
	NLayoutFooter,
	NLayoutHeader,
	NLayoutSider,
	NMenu,
	NModal,
	NPopover,
	NScrollbar,
	NSpace,
	useMessage,
} from 'naive-ui';
import {h, onMounted, ref, shallowRef} from "vue";
import {RouterLink} from "vue-router";

const props = defineProps(['switchTheme', 'isDark']);

//#region message
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const message = useMessage();
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region theme
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const isDark = ref(false);

const theme = shallowRef(null);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region logout
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const showLogout = ref(false);

const logout = () => {
	localStorage.removeItem(Header.TOKEN);
	message.success("成功退出登录");
	sleep();
	router.push(LOGIN.path);
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region menu
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const collapsed = ref(false);

const menuOptions = [
	{
		label: () =>
			h(
				RouterLink,
				gProps(DEBIT.name),
				{default: () => '借阅记录'}
			),
		key: 'm-debit',
		icon: renderIcon(DebitManagerIcon)
	}, {
		label: () =>
			h(
				RouterLink,
				gProps(BOOK.name),
				{default: () => '书籍管理'}
			),
		key: 'm-book',
		icon: renderIcon(BookManagerIcon)
	}, {
		label: () =>
			h(
				RouterLink,
				gProps(BOOK_INFO.name),
				{default: () => '书籍信息管理'}
			),
		key: 'm-book-info',
		icon: renderIcon(BookInfoManagerIcon)
	}, {
		label: () =>
			h(
				RouterLink,
				gProps(PUBLISHER.name),
				{default: () => '出版社管理'}
			)
		,
		key: 'm-publisher',
		icon: renderIcon(PublisherIcon)
	}, {
		label: () =>
			h(
				RouterLink,
				gProps(USER.name),
				{default: () => '用户管理'}
			)
		,
		key: 'm-user',
		icon: renderIcon(UserManagerIcon)
	}, {
		label: () =>
			h(
				RouterLink,
				gProps(LOG.name),
				{default: () => '系统日志'}
			)
		,
		key: 'log',
		icon: renderIcon(LogIcon)
	}
]
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region 生命周期函数
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
onMounted(() => {
	checkLoginState();
})
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion
</script>

<template>
	<n-layout has-sider position="absolute">
		<n-layout-sider
			:collapsed="collapsed"
			:collapsed-width="64"
			:width="240"
			bordered
			collapse-mode="width"
			show-trigger
			@collapse="collapsed = true"
			@expand="collapsed = false"
		>
			<n-layout-header bordered class="h-3em">
				<n-flex :size="0" :wrap="false">
					<router-link :to="BASE_I">
						<div class="logo">
							<BookBrain class="w-2.4em h-2.4em" color=""/>
						</div>
					</router-link>
					<div class="logo-text-box">
						<div id="logo-text" class="logo-text v-c-n-text-color">
							BookBrain
						</div>
					</div>

				</n-flex>
			</n-layout-header>
			<n-layout class="absolute top-3em bottom-2.4em left-0 right-0">
				<n-scrollbar>
					<n-menu
						:collapsed="collapsed"
						:collapsed-icon-size="22"
						:collapsed-width="64"
						:expand-icon="expandIcon"
						:options="menuOptions"
						class="font-size-1.2rem font-800"
					/>
				</n-scrollbar>
			</n-layout>
			<n-layout-footer
				bordered
				class="h-2.4em overflow-hidden"
				position="absolute"
			>
				<n-flex :wrap="false" class="h-full over-hidden items-center">
					<n-popover trigger="click">
						<template #trigger>
							<n-button circle class="m-l-15px m-r-15px" secondary strong>
								<template #icon>
									<n-icon :component="props.isDark ? moon : sun"/>
								</template>
							</n-button>
						</template>
						<n-form class="flex flex-col" label-placement="left"
						        style="--n-color: v-bind(); --n-text-color: v-bind();">
							<n-button :bordered="false" class="no-border-btn"
							          @click="props.switchTheme(false)">
								<template #icon>
									<n-icon :component="sun"/>
								</template>
								日间模式
							</n-button>
							<n-button :bordered="false" class="no-border-btn" @click="props.switchTheme(true)">
								<template #icon>
									<n-icon :component="moon"/>
								</template>
								夜间模式
							</n-button>
						</n-form>
					</n-popover>
				</n-flex>

			</n-layout-footer>
		</n-layout-sider>
		<n-layout>
			<n-layout-header bordered class="h-3em">
				<n-flex :wrap="false" class="mr4" justify="end">
					<n-popover class="p-0" placement="left-start" trigger="click">
						<template #trigger>
							<n-button class="m-.2em h-3em w-3em b-rd-50% p-0 b-0 cursor-pointer">
                        <span class="font-800 font-size-1em"
                              style="font-family: inter,sans-serif;">ME</span>
							</n-button>
						</template>
						<n-form label-placement="left">
							<n-button :bordered="false" class="no-border-btn" @click="showLogout = true">
								登出
							</n-button>
						</n-form>
					</n-popover>

				</n-flex>
			</n-layout-header>
			<n-layout class=" absolute top-3em bottom-0 left-0 right-0">
				<router-view v-slot="{ Component}">
					<component :is="Component"/>
				</router-view>
			</n-layout>

			<n-modal
				id="logout-modal"
				v-model:show="showLogout"
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
						<n-button type="warning" @click="logout">
							确定
						</n-button>
					</n-flex>
				</n-space>
			</n-modal>
		</n-layout>
	</n-layout>
</template>

<style scoped>
@import url("@/styles/no-border-btn.css");

.logo {
	flex: 0 0 auto;
	width: 4em;
	height: 3em;
	padding: calc((3em - 40px) / 2) calc((4em - 40px) / 2);
}

.logo-text-box {
	flex: 1 1 auto;
	height: 3em;
	line-height: 3em;
	color: black;
}

.logo-text {
	font-size: 1.8rem;
	letter-spacing: .125em;
	font-weight: bolder;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, .8);
	font-family: "Chinese Quotes", serif;
}
</style>

