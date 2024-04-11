<script setup>
import BookBrain from "@/icons/book-brain.vue";
import WorkBenchIcon from "@/icons/home.vue";
import BookInfoManagerIcon from "@/icons/i-book-info.vue";
import BookManagerIcon from "@/icons/i-book.vue";
import LogIcon from "@/icons/log.vue";
import SelfIcon from "@/icons/self.vue";
import sun from "@/icons/sun.vue";
import { BASE_I, BOOK, BOOK_INFO, DEBIT, I_HOME, I_MY, LOG, USER } from "@/router/RouterValue.js";
import { checkLoginState } from "@/utils/check-login-state.js";
import { gProps } from "@/utils/generate.js";
import logout from "@/utils/logout.js";
import { expandIcon, renderIcon } from "@/utils/render.js";
import { BookReader as DebitManagerIcon, UsersCog as UserManagerIcon } from "@vicons/fa";
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
	useMessage
} from "naive-ui";
import { h, onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps(["switchTheme"]);

const message = useMessage();

const breadcrumbArray = ref([]);

function updateBreadcrumbArray(array) {
	breadcrumbArray.value = array;
}

const collapsed = ref(false);

const menuItemValue = ref("");

function updateMenuItem(itemValue) {
	menuItemValue.value = itemValue;
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

const menuOptions = [
	{
		label: () =>
			h(RouterLink, gProps(I_HOME.name), { default: () => "工作台" }),
		key: "i-index",
		icon: renderIcon(WorkBenchIcon)
	},
	{
		label: () =>
			h(RouterLink, gProps(DEBIT.name), { default: () => "借阅管理" }),
		key: "i-debit",
		icon: renderIcon(DebitManagerIcon)
	},
	{
		label: () =>
			h(RouterLink, gProps(BOOK.name), { default: () => "书籍管理" }),
		key: "i-book",
		icon: renderIcon(BookManagerIcon)
	},
	{
		label: () =>
			h(RouterLink, gProps(BOOK_INFO.name), {
				default: () => "书籍信息管理"
			}),
		key: "i-book-info",
		icon: renderIcon(BookInfoManagerIcon)
	},
	{
		label: () =>
			h(RouterLink, gProps(USER.name), { default: () => "用户管理" }),
		key: "i-user",
		icon: renderIcon(UserManagerIcon)
	},
	// {
	// 	label: () =>
	// 		h(RouterLink, gProps(USER.name), { default: () => "统计报表" }),
	// 	key: "i-statistics",
	// 	icon: renderIcon(IStatisticsIcon)
	// },
	{
		label: () =>
			h(RouterLink, gProps(LOG.name), { default: () => "系统日志" }),
		key: "i-log",
		icon: renderIcon(LogIcon)
	},
	{
		label: () =>
			h(RouterLink, gProps(I_MY.name), { default: () => "我的信息" }),
		key: "i-my",
		icon: renderIcon(SelfIcon)
	}
];

const modal = reactive({
	show: false,
	type: "default",
	title: "",
	content: "",
	action: () => {
	}
});

function showModal(type, title, content, action) {
	modal.show = true;
	modal.type = type;
	modal.title = title;
	modal.content = content;
	modal.action = action;
}

onMounted(() => {
	checkLoginState();
});
</script>

<template>
	<n-layout
		has-sider
		position="absolute"
		style="
			--n-color: v-bind();
			--n-text-color: v-bind();
			--n-item-text-color-active: v-bind();
			--n-text-color-hover: v-bind();
		"
	>
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
							<BookBrain class="w-2.4em h-2.4em" color="" />
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
					/>
				</n-scrollbar>
			</n-layout>
			<n-layout-footer
				bordered
				class="h-2.4em overflow-hidden"
				position="absolute"
			>
				<n-flex :wrap="false" class="h-full over-hidden items-center">
					<n-button
						circle
						class="m-l-15px m-r-15px"
						secondary
						strong
						@click="props.switchTheme()"
					>
						<template #icon>
							<n-icon :component="sun" />
						</template>
					</n-button>
				</n-flex>
			</n-layout-footer>
		</n-layout-sider>
		<n-layout>
			<n-layout-header bordered class="h-3em">
				<n-flex :wrap="false" class="h-3em m-r-4 items-center m-l-4">
					<n-breadcrumb>
						<n-breadcrumb-item v-for="item in breadcrumbArray">
							<router-link :to="item?.path"
							>{{ item?.label }}
							</router-link>
						</n-breadcrumb-item>
					</n-breadcrumb>
					<n-popover
						:show="showUserPopover"
						class="p-0"
						placement="left-start"
						trigger="click"
						@clickoutside.prevent="handleClickPopoverOutSide()"
					>
						<template #trigger>
							<n-button
								class="m-l-a m-.2em h-2.4em w-2.4em b-rd-50% p-0 b-0 cursor-pointer"
								@click.prevent="switchShowUserPopover()">
								<span class="font-800" style="font-family: inter, sans-serif">ME</span>
							</n-button>
						</template>
						<n-form label-placement="left">
							<n-flex vertical>
								<router-link
									:to="I_MY"
									@click.prevent="switchShowUserPopover()"
								>
									<n-button
										:bordered="false"
										class="w-100% no-border-btn"
									>
										个人信息
									</n-button>
								</router-link>
								<n-button
									:bordered="false"
									class="no-border-btn"
									@click.prevent="
										switchShowUserPopover();
										showModal(
											'warning',
											'登出二次确认',
											'是否要确认登出？',
											() => {
												logout(message);
											},
										);
									"
								>
									登出
								</n-button>
							</n-flex>
						</n-form>
					</n-popover>
				</n-flex>
			</n-layout-header>
			<n-layout
				class="absolute top-3em bottom-0 left-0 right-0 overflow-hidden"
			>
				<router-view v-slot="{ Component }">
					<component
						:is="Component"
						:showModal="showModal"
						:updateBreadcrumbArray="updateBreadcrumbArray"
						:updateMenuItem="updateMenuItem"
					/>
				</router-view>
			</n-layout>
		</n-layout>

		<n-modal
			id="checked-confirmed-modal"
			v-model:show="modal.show"
			:mask-closable="false"
			:title="modal.title"
			:type="modal.type"
			class="w-25em"
			preset="dialog"
			transform-origin="center"
		>
			<n-space vertical>
				<div class="text-center m-t-1em m-b-1em font-size-1.2em">
					{{ modal.content }}
				</div>
				<n-flex justify="right">
					<n-button
						:type="modal.type"
						@click.prevent="
							modal.action();
							modal.show = false;
						"
					>
						是
					</n-button>
				</n-flex>
			</n-space>
		</n-modal>
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
	letter-spacing: 0.125em;
	font-weight: bolder;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
	font-family: "Chinese Quotes", serif;
}
</style>
