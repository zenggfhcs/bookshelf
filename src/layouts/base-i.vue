<script setup>
import BookBrain from "@/icons/book-brain.vue";
import { getIconByName } from "@/icons/getIconByName.js";
import WorkBenchIcon from "@/icons/home.vue";
import BookManagerIcon from "@/icons/i-book.vue";
import DebitManagerIcon from "@/icons/i-debit.vue";
import ILog from "@/icons/i-log.vue";
import IUserSetting from "@/icons/i-user-setting.vue";
import SelfIcon from "@/icons/self.vue";
import Sun from "@/icons/sun.vue";
import {
	BASE_I,
	BASE_J,
	BOOK_INFO,
	CLC_INDEX,
	DEBIT,
	I_HOME,
	I_MY,
	LOG,
	PERMISSION,
	ROLE,
	SYS_ROUTER,
	USER
} from "@/router/route-value.js";
import { debounce } from "@/utils/debounce.js";
import { gProps } from "@/utils/generate.js";
import logout from "@/utils/logout.js";
import { expandIcon, renderIcon } from "@/utils/render.js";
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

const props = defineProps({
	switchTheme: Function
});

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

const showUserPopoverRef = ref(false);

const canSwitch = ref(true);

// todo
function switchUserPopover(target = !showUserPopoverRef.value) {
	if (canSwitch.value) {
		showUserPopoverRef.value = target;
	}
}

function handleClickPopoverOutSide() {
	showUserPopoverRef.value = false;
	canSwitch.value = false;
	setTimeout(() => {
		canSwitch.value = true;
	}, 100);
}

const menuOptions = ref([
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
		label: "馆藏管理",
		key: "i-collection",
		icon: renderIcon(BookManagerIcon),
		children: [
			// {
			// 	label: () =>
			// 		h(RouterLink, gProps(BOOK.name), { default: () => "书籍管理" }),
			// 	key: "i-book"
			// 	// icon: renderIcon(BookManagerIcon)
			// },
			{
				label: () =>
					h(RouterLink, gProps(BOOK_INFO.name), {
						default: () => "书籍信息"
					}),
				key: "i-book-info"
				// icon: renderIcon(BookInfoManagerIcon)
			},
			{
				label: () =>
					h(RouterLink, gProps(CLC_INDEX.name), {
						default: () => "分类信息"
					}),
				key: "i-clc-index"
				// icon: renderIcon(BookInfoManagerIcon)
			}
		]
	},
	{
		label: "用户管理",
		key: "i-user-manager",
		icon: renderIcon(IUserSetting),
		children: [
			{
				label: () => h(RouterLink, gProps(USER.name), { default: () => "用户信息" }),
				key: "i-user"
				// icon: renderIcon(IUser)
			},
			{
				label: () => h(RouterLink, gProps(ROLE.name), { default: () => "角色信息" }),
				key: "i-role"
				// icon: renderIcon(IRole)
			},
			{
				label: () => h(RouterLink, gProps(PERMISSION.name), { default: () => "权限信息" }),
				key: "i-permission"
			},
			{
				label: () =>
					h(RouterLink, gProps(SYS_ROUTER.name), { default: () => "路由管理" }),
				key: "i-route",
				icon: renderIcon(getIconByName("i-route"))
			}
		]
	},
	{
		label: () =>
			h(RouterLink, gProps(LOG.name), { default: () => "操作日志" }),
		key: "i-log",
		icon: renderIcon(ILog)
	},

	{
		label: () =>
			h(RouterLink, gProps(I_MY.name), { default: () => "我的信息" }),
		key: "i-my",
		icon: renderIcon(SelfIcon)
	}
]);

const modalReactive = reactive({
	show: false,
	type: "default",
	title: "",
	content: "",
	action: () => {
	}
});

function showModal(type, title, content, action) {
	modalReactive.show = true;
	modalReactive.type = type;
	modalReactive.title = title;
	modalReactive.content = content;
	modalReactive.action = action;
}

function confirmedHandler() {
	modalReactive.action();
	modalReactive.show = false;
}

const exitHandler = debounce(() => {
	switchUserPopover();
	showModal(
		"warning",
		"登出二次确认",
		"是否要确认登出？",
		() => {
			logout(message);
		}
	);
});

onMounted(() => {
});
</script>

<template>
	<n-layout
		has-sider
		position="absolute"
		style="--n-color: v-bind();--n-text-color: v-bind();
			--n-item-text-color-active: v-bind();--n-text-color-hover: v-bind();">
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
						accordion
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
						@click.prevent="props.switchTheme">
						<template #icon>
							<n-icon :component="Sun" />
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
						:show="showUserPopoverRef"
						class="p-0"
						placement="left-start"
						trigger="click"
						@clickoutside.prevent="handleClickPopoverOutSide()"
					>
						<template #trigger>
							<n-button
								class="m-l-a m-.2em h-2.4em w-2.4em b-rd-50% p-0 b-0 cursor-pointer"
								@click.prevent="switchUserPopover()">
								<span class="font-800" style="font-family: inter, sans-serif">ME</span>
							</n-button>
						</template>
						<n-form label-placement="left">
							<n-flex vertical>
								<router-link :to="BASE_J.path">
									<n-button
										:bordered="false"
										class="w-100% no-border-btn"
									>
										前台
									</n-button>
								</router-link>
								<router-link :to="I_MY" @click.prevent="switchUserPopover()">
									<n-button
										:bordered="false"
										class="w-100% no-border-btn"
									>
										个人信息
									</n-button>
								</router-link>
								<n-button :bordered="false" class="no-border-btn" @click.prevent="exitHandler">
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
						:show-modal="showModal"
						:update-breadcrumb-array="updateBreadcrumbArray"
						:update-menu-item="updateMenuItem"
					/>
				</router-view>
			</n-layout>
		</n-layout>

		<n-modal
			id="checked-confirmed-modal"
			v-model:show="modalReactive.show"
			:mask-closable="false"
			:title="modalReactive.title"
			:type="modalReactive.type"
			class="w-25em"
			preset="dialog"
			transform-origin="center"
		>
			<n-space vertical>
				<div class="text-center m-t-1em m-b-1em font-size-1.2em">
					{{ modalReactive.content }}
				</div>
				<n-flex justify="right">
					<n-button
						:type="modalReactive.type"
						@click.prevent="confirmedHandler">
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
