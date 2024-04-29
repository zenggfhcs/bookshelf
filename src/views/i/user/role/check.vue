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

async function queryRouteInfo() {
	await action(message, Service.Routes.list(), (res) => {
		console.log(res);
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

const roleRouteTagsRef = computed(() => info.routeItems.map(item => `${item?.key}|${item?.label}`));

function renderTag(tag, index) {
	return createVNode(
		NTag,
		{
			style: {
				marginBottom: "1em",
				marginRight: "1em"
			},
			type: index < 3 ? "success" : "error",
			bordered: false,
			closable: true,
			onClose: () => {
				handleRemoveRolePermission(info.permissions[index].id);
			}
		},
		{
			default: () => createVNode(
				"div",
				{
					style: {
						minWidth: "10em"
					}
				},
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
		name: info.name,
		remark: permissionId,
		revision: info.revision
	};
	await removeItem(message, Service.Roles.removePermission(_info));

	await query(props.id);
}

async function handleAddRolePermission(permissionName) {
	// addItem(message, Service.Roles.addPermission())
	const _info = {
		id: info.id,
		name: info.name,
		remark: permissionName,
		revision: info.revision
	};
	await addItem(message, Service.Roles.addPermission(_info));

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
					<div style="width: calc(14em * 3 + 2 * 8px);">
						<n-dynamic-tags v-model:value="rolePermissionTagsRef" :render-tag="renderTag"
						                @create="handleAddRolePermission">
							<template #input="{ submit, deactivate }">
								<n-select
									:options="permissionOptions"
									style="min-width: calc(12em + 4px)"
									@blur="deactivate"
									@update:value="submit($event)"
								/>
							</template>
						</n-dynamic-tags>
					</div>

					<!--					<n-collapse>-->
					<!--						<n-collapse-item name="1" title="图书">-->
					<!--							<n-checkbox-group>-->
					<!--								<n-grid :cols="2" :y-gap="8">-->
					<!--									<n-gi>-->
					<!--										<n-checkbox label="推开" value="Pushes Open" />-->
					<!--									</n-gi>-->
					<!--									<n-gi>-->
					<!--										<n-checkbox label="窗户" value="The Window" />-->
					<!--									</n-gi>-->
					<!--									<n-gi>-->
					<!--										<n-checkbox label="举起" value="And Raises" />-->
					<!--									</n-gi>-->
					<!--									<n-gi>-->
					<!--										<n-checkbox label="望远镜" value="The Spyglass" />-->
					<!--									</n-gi>-->
					<!--								</n-grid>-->
					<!--							</n-checkbox-group>-->
					<!--						</n-collapse-item>-->
					<!--						<n-collapse-item name="2" title="用户">-->
					<!--							<n-checkbox-group>-->
					<!--								<n-grid :cols="2" :y-gap="8">-->
					<!--									<n-gi>-->
					<!--										<n-checkbox label="推开" value="Pushes Open" />-->
					<!--									</n-gi>-->
					<!--									<n-gi>-->
					<!--										<n-checkbox label="窗户" value="The Window" />-->
					<!--									</n-gi>-->
					<!--									<n-gi>-->
					<!--										<n-checkbox label="举起" value="And Raises" />-->
					<!--									</n-gi>-->
					<!--									<n-gi>-->
					<!--										<n-checkbox label="望远镜" value="The Spyglass" />-->
					<!--									</n-gi>-->
					<!--								</n-grid>-->
					<!--							</n-checkbox-group>-->
					<!--						</n-collapse-item>-->
					<!--						<n-collapse-item name="3" title="权限">-->
					<!--							<n-checkbox-group>-->
					<!--								<n-grid :cols="2" :y-gap="8">-->
					<!--									<n-gi>-->
					<!--										<n-checkbox label="推开" value="Pushes Open" />-->
					<!--									</n-gi>-->
					<!--									<n-gi>-->
					<!--										<n-checkbox label="窗户" value="The Window" />-->
					<!--									</n-gi>-->
					<!--									<n-gi>-->
					<!--										<n-checkbox label="举起" value="And Raises" />-->
					<!--									</n-gi>-->
					<!--									<n-gi>-->
					<!--										<n-checkbox label="望远镜" value="The Spyglass" />-->
					<!--									</n-gi>-->
					<!--								</n-grid>-->
					<!--							</n-checkbox-group>-->
					<!--						</n-collapse-item>-->
					<!--					</n-collapse>-->
				</td>
			</tr>
			<tr>
				<td>菜单</td>
				<td>
					<n-dynamic-tags v-model:value="roleRouteTagsRef" :render-tag="renderTag"
					                @create="handleAddRolePermission">
						<template #input="{ submit, deactivate }">
							<n-select
								:options="permissionOptions"
								style="min-width: calc(12em + 4px)"
								@blur="deactivate"
								@update:value="submit($event)"
							/>
						</template>
					</n-dynamic-tags>
				</td>
			</tr>
			</tbody>
		</n-table>
	</n-layout>
</template>

<style scoped>
@import url(@/styles/trc.css);
</style>
