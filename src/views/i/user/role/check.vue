<script setup>
import { action, addItem, queryItem, removeItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import NoData from "@/components/no-data.vue";
import { B_ROLE_CHECK } from "@/constant/breadcrumb.js";
import { messageOptions } from "@/constant/options.js";
import IBack from "@/icons/i-back.vue";
import IReload from "@/icons/i-reload.vue";
import { goto } from "@/router/goto.js";
import { ROLE } from "@/router/route-value.js";
import { debounce } from "@/utils/debounce.js";
import {
	NButton,
	NDynamicTags,
	NFlex,
	NIcon,
	NLayout,
	NLayoutHeader,
	NSelect,
	NTable,
	NTag,
	useMessage
} from "naive-ui";
import { computed, createVNode, onBeforeMount, onMounted, reactive, ref } from "vue";

const props = defineProps({
	id: Number,
	showModal: Function,
	updateMenuItem: Function,
	updateBreadcrumbArray: Function
});

const message = useMessage();

const info = reactive({
	id: 0,
	name: "",
	remark: null,
	revision: null,
	permissions: [],
	routeItems: []
});

const rolePermissionNameMap = new Map();

const permissionNameMap = new Map();

async function query(id) {
	if (!id) {
		return;
	}
	loadingQuery.value = true;
	await queryItem(message, Service.Roles.get(id), info);

	await queryPermissionInfo();

	await queryRouteInfo();

	loadingQuery.value = false;
}

async function queryPermissionInfo() {
	await action(message, Service.Permissions.list(), (res) => {
		permissionsRef.value = res;
	});

	rolePermissionNameMap.clear();
	info.permissions.forEach(item => {
		rolePermissionNameMap.set(item.name, item);
	});

	permissionOptions.value = [];
	permissionsRef.value.forEach(item => {
		permissionNameMap.set(item.name, item);
		if (!rolePermissionNameMap.get(item.name)) {
			permissionOptions.value.push({
				label: item?.remark,
				value: item?.id
			});
		}
	});
}

const routesRef = ref([]);

const roleRouteNameMap = new Map();

const routeOptions = ref([]);

async function queryRouteInfo() {
	await action(message, Service.Routes.list(), (res) => {
		routesRef.value = res;
	});

	roleRouteNameMap.clear();
	info.routeItems.forEach(item => {
		roleRouteNameMap.set(item?.key, item);
	});

	routeOptions.value = [];
	routesRef.value.forEach(item => {
		if (!roleRouteNameMap.has(item?.key)) {
			routeOptions.value.push({
				label: item?.label,
				value: item?.id
			});
		}
	});
}

const showRemoveModal = ref(false);

const removeHandler = debounce(async () => {
	await action(message, Service.Roles.remove(props.id), () => {
		message.success("删除成功", messageOptions);
		goto(ROLE);
	}); // todo use remove item

	showRemoveModal.value = false;
});

const showRemoveConfirmedHandler = debounce(() => {
	props.showModal("error", "删除二次确认", "您是否要删除该角色？", removeHandler);
});

const permissionOptions = ref([]);

const permissionsRef = ref([]);

const rolePermissionTagsRef = computed(() => info.permissions.map(item => item?.remark));

const roleRouteTagsRef = computed(() => info.routeItems.map(item => `${item?.group} | ${item?.label}`));

function renderPermissionTag(tag, index) {
	let type = "info";
	if (tag.startsWith("新增")) {
		type = "success";
	}
	if (tag.startsWith("查找") || tag.startsWith("获取")) {
		type = "default";
	}
	if (tag.startsWith("删除")) {
		type = "error";
	}
	if (tag.startsWith("修改") || tag.startsWith("更新")) {
		type = "warning";
	}
	return createVNode(
		NTag,
		{
			style: {
				// margin: ".3em"
			},
			type: type,
			bordered: false,
			closable: true,
			onClose: () => {
				handleRemoveRolePermission(info.permissions[index].id);
			}
		},
		{
			default: () => createVNode(
				"div",
				{},
				{
					default: () => tag
				}
			)
		}
	);
}

function renderRouteTag(tag, index) {
	return createVNode(
		NTag,
		{
			style: {
				// margin: ".3em"
			},
			type: tag.startsWith("reader") ? "success" : "error",
			bordered: false,
			closable: true,
			onClose: () => {
				handleRemoveRoleRoute(info.routeItems[index].id);
			}
		},
		{
			default: () => createVNode(
				"div",
				{},
				{
					default: () => tag
				}
			)
		}
	);
}

async function handleRemoveRolePermission(permissionId) {
	const _info = {
		id: info.id,
		remark: permissionId
	};
	await removeItem(message, Service.Roles.removePermission(_info));

	await query(props.id);
}

async function handleAddRolePermission(permissionId) {
	// addItem(message, Service.Roles.addPermission())
	const _info = {
		id: info.id,
		remark: permissionId
	};
	await addItem(message, Service.Roles.addPermission(_info));

	await query(props.id);
}

async function handleAddRoleRoute(routeId) {
	// addItem(message, Service.Roles.addPermission())
	const _info = {
		id: info.id,
		remark: routeId
	};
	await addItem(message, Service.Roles.addRoute(_info));

	await query(props.id);
}

async function handleRemoveRoleRoute(routeId) {
	const _info = {
		id: info.id,
		remark: routeId
	};
	await removeItem(message, Service.Roles.removeRoute(_info));

	await query(props.id);
}

const loadingQuery = ref(false);

const queryHandler = debounce(() => {
	query(props.id);
});

onBeforeMount(() => {
	// 加载数据

});

onMounted(() => {
	props.updateMenuItem("i-role");
	props.updateBreadcrumbArray(B_ROLE_CHECK(props.id));
	query(props.id);
	// action(message, Service.Permissions.rolePermission(), (res) => {
	// 	rolePermissionsRef.value = res;
	// });
});
</script>

<template>
	<n-layout-header bordered class="top-0 h-3em" position="absolute">
		<n-flex class="h-3em items-center" justify="center">
			<router-link :to="ROLE">
				<n-button type="tertiary">
					<template #icon>
						<n-icon :component="IBack" />
					</template>
					后退
				</n-button>
			</router-link>
			<n-button
				type="error"
				@click.prevent="showRemoveConfirmedHandler">
				删除
			</n-button>
			<n-button
				:loading="loadingQuery"
				class="h-2.4em"
				type="info"
				@click.prevent="queryHandler"
			>
				<template #icon>
					<n-icon :component="IReload" />
				</template>
				刷新
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout
		:native-scrollbar="false"
		class="absolute top-3em bottom-0 left-0 right-0"
		content-style="padding: .3em 1em">
		<n-table :single-line="false" class="w-100%">
			<tbody class="trc">
			<tr>
				<td class="w-33%">角色名</td>
				<td>
					<span v-if="info.name">{{ info.name }}</span>
					<NoData v-else />
				</td>
			</tr>
			<tr>
				<td>权限</td>
				<td>
					<div class="max-w-40em">
						<n-dynamic-tags :max="permissionsRef.length" v-model:value="rolePermissionTagsRef"
						                :render-tag="renderPermissionTag"
						                @create="handleAddRolePermission">
							<template #input="{ submit, deactivate }">
								<n-select
									:options="permissionOptions"
									class="min-w-10em"
									@blur="deactivate"
									@update:value="submit($event)"
								/>
							</template>
						</n-dynamic-tags>
					</div>
				</td>
			</tr>
			<tr>
				<td>菜单</td>
				<td>
					<div class="max-w-50em">
						<n-dynamic-tags :max="routesRef.length" v-model:value="roleRouteTagsRef" :render-tag="renderRouteTag"
						                @create="handleAddRoleRoute">
							<template #input="{ submit, deactivate }">
								<n-select
									:options="routeOptions"
									class="min-w-10em"
									@blur="deactivate"
									@update:value="submit($event)"
								/>
							</template>
						</n-dynamic-tags>
					</div>
				</td>
			</tr>
			</tbody>
		</n-table>
	</n-layout>
</template>

<style scoped>
@import url(@/styles/trc.css);
</style>
