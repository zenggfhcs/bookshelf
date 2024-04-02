<script setup>
import BookBrain from "@/icons/book-brain.vue";
import WorkBenchIcon from "@/icons/home.vue";
import LogIcon from "@/icons/log.vue";
import PublisherIcon from "@/icons/publisher.vue";
import SelfIcon from "@/icons/self.vue";
import sun from "@/icons/sun.vue";
import {BASE_I, BOOK, BOOK_INFO, DEBIT, I_HOME, I_MY, LOG, PUBLISHER, USER} from "@/router/RouterValue.js";
import {checkLoginState} from "@/utils/check-login-state.js";
import {gProps} from "@/utils/generate.js";
import logout from "@/utils/logout.js";
import {expandIcon, renderIcon} from "@/utils/render.js";
import {
	Book as BookManagerIcon,
	BookOpen as BookInfoManagerIcon,
	BookReader as DebitManagerIcon,
	UsersCog as UserManagerIcon
} from "@vicons/fa";
import {
	NBreadcrumb,
	NBreadcrumbItem,
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
import {h, onMounted, ref} from "vue";
import {RouterLink} from "vue-router";

const props = defineProps(['switchTheme']);

const message = useMessage();

const breadcrumbArray = ref([]);

const updateBreadcrumbArray = (array) => {
	breadcrumbArray.value = array;
}

const showLogout = ref(false);

const switchShowLogout = (targetValue = !showLogout.value) => {
	showLogout.value = targetValue;
}

const collapsed = ref(false);

const menuItemValue = ref("");

const updateMenuItem = (itemValue) => {
	menuItemValue.value = itemValue;
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

const menuOptions = [
	{
		label: () =>
			h(
				RouterLink,
				gProps(I_HOME.name),
				{default: () => '工作台'}
			),
		key: 'i-index',
		icon: renderIcon(WorkBenchIcon)
	},
	{
		label: () =>
			h(
				RouterLink,
				gProps(DEBIT.name),
				{default: () => '借阅记录'}
			),
		key: 'i-debit',
		icon: renderIcon(DebitManagerIcon)
	}, {
		label: () =>
			h(
				RouterLink,
				gProps(BOOK.name),
				{default: () => '书籍管理'}
			),
		key: 'i-book',
		icon: renderIcon(BookManagerIcon)
	}, {
		label: () =>
			h(
				RouterLink,
				gProps(BOOK_INFO.name),
				{default: () => '书籍信息管理'}
			),
		key: 'i-book-info',
		icon: renderIcon(BookInfoManagerIcon)
	}, {
		label: () =>
			h(
				RouterLink,
				gProps(PUBLISHER.name),
				{default: () => '出版社管理'}
			)
		,
		key: 'i-publisher',
		icon: renderIcon(PublisherIcon)
	}, {
		label: () =>
			h(
				RouterLink,
				gProps(USER.name),
				{default: () => '用户管理'}
			)
		,
		key: 'i-user',
		icon: renderIcon(UserManagerIcon)
	}, {
		label: () =>
			h(
				RouterLink,
				gProps(LOG.name),
				{default: () => '系统日志'}
			)
		,
		key: 'i-log',
		icon: renderIcon(LogIcon)
	}, {
		label: () =>
			h(
				RouterLink,
				gProps(I_MY.name),
				{default: () => '我的'}
			)
		,
		key: 'i-my',
		icon: renderIcon(SelfIcon)
	}
]


onMounted(() => {
	checkLoginState();
})

</script>

<template>
	<n-layout has-sider position="absolute"
	          style="--n-color: v-bind(); --n-text-color: v-bind(); --n-item-text-color-active: v-bind(); --n-text-color-hover: v-bind();">
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
						v-model:value="menuItemValue"
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
					<n-button circle class="m-l-15px m-r-15px" secondary strong @click="props.switchTheme()">
						<template #icon>
							<n-icon :component="sun"/>
						</template>
					</n-button>
				</n-flex>

			</n-layout-footer>
		</n-layout-sider>
		<n-layout>
			<n-layout-header bordered class="h-3em">
				<n-flex :wrap="false" class="m-r-4 items-center m-l-4">
					<n-breadcrumb>
						<n-breadcrumb-item v-for="item in breadcrumbArray">
							<router-link :to="item?.path">{{ item?.label }}</router-link>
						</n-breadcrumb-item>
					</n-breadcrumb>
					<n-popover :show="showUserPopover" class="p-0" placement="left-start"
					           trigger="click" @clickoutside.prevent="handleClickPopoverOutSide()">
						<template #trigger>
							<n-button class="m-l-a m-.2em h-3em w-3em b-rd-50% p-0 b-0 cursor-pointer"
							          @click.prevent="switchShowUserPopover()">
                        <span class="font-800 font-size-1em"
                              style="font-family: inter,sans-serif;">ME</span>
							</n-button>
						</template>
						<n-form label-placement="left">
							<n-flex vertical>
								<router-link :to="I_MY.path">
									<n-button :bordered="false" class="w-100% no-border-btn"
									          @click.prevent="switchShowUserPopover()">
										个人信息
									</n-button>
								</router-link>
								<n-button :bordered="false" class="no-border-btn"
								          @click.prevent="switchShowUserPopover(); switchShowLogout()">
									登出
								</n-button>
							</n-flex>
						</n-form>
					</n-popover>

				</n-flex>
			</n-layout-header>
			<n-layout class="absolute top-3em bottom-0 left-0 right-0 overflow-hidden">
				<router-view v-slot="{ Component}">
					<component :is="Component" :updateBreadcrumbArray="updateBreadcrumbArray"
					           :updateMenuItem="updateMenuItem"/>
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
						<n-button type="warning" @click="logout(message)">
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

