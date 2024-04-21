<script setup>
import { action, queryItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import NoData from "@/components/no-data.vue";
import { B_ROLE_CHECK } from "@/constant/breadcrumb.js";
import { messageOptions } from "@/constant/options.js";
import IBack from "@/icons/i-back.vue";
import { goto } from "@/router/goto.js";
import { ROLE } from "@/router/router-value.js";
import { debounce } from "@/utils/debounce.js";
import {
	NButton,
	NCheckbox,
	NCheckboxGroup,
	NCollapse,
	NCollapseItem,
	NFlex,
	NGi,
	NGrid,
	NIcon,
	NLayout,
	NLayoutHeader,
	NTable,
	useMessage
} from "naive-ui";
import { onBeforeMount, onMounted, reactive, ref } from "vue";

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
	createdBy: {
		id: null,
		displayName: null,
		name: null,
		surname: null,
		email: null,
		phoneNumber: null
	},
	creationTime: null,
	updatedBy: {
		id: null,
		displayName: null,
		name: null,
		surname: null,
		email: null,
		phoneNumber: null
	},
	lastUpdatedTime: null,
	remark: null,
	revision: null
});

async function query(id) {
	if (!id) {
		return;
	}
	await queryItem(message, Service.Roles.get(id), info);
}

const showRemoveModal = ref(false);

const removeHandler = debounce(async () => {

	await action(message, Service.BookInfos.getFirstLevelType(), () => {
		message.success("删除成功", messageOptions);
		goto(ROLE);
	}); // todo use remove item

	showRemoveModal.value = false;
});

const showRemoveConfirmedHandler = debounce(() => {
	props.showModal("error", "删除二次确认", "您是否要删除该角色？", removeHandler);
});

onBeforeMount(() => {
	// 加载数据

});

onMounted(() => {
	props.updateMenuItem("i-role");
	props.updateBreadcrumbArray(B_ROLE_CHECK(props.id));
	query(props.id);
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
				<td>对应权限</td>
				<td>
					<n-collapse>
						<n-collapse-item name="1" title="图书">
							<n-checkbox-group>
								<n-grid :cols="2" :y-gap="8">
									<n-gi>
										<n-checkbox label="推开" value="Pushes Open" />
									</n-gi>
									<n-gi>
										<n-checkbox label="窗户" value="The Window" />
									</n-gi>
									<n-gi>
										<n-checkbox label="举起" value="And Raises" />
									</n-gi>
									<n-gi>
										<n-checkbox label="望远镜" value="The Spyglass" />
									</n-gi>
								</n-grid>
							</n-checkbox-group>
						</n-collapse-item>
						<n-collapse-item name="2" title="用户">
							<n-checkbox-group>
								<n-grid :cols="2" :y-gap="8">
									<n-gi>
										<n-checkbox label="推开" value="Pushes Open" />
									</n-gi>
									<n-gi>
										<n-checkbox label="窗户" value="The Window" />
									</n-gi>
									<n-gi>
										<n-checkbox label="举起" value="And Raises" />
									</n-gi>
									<n-gi>
										<n-checkbox label="望远镜" value="The Spyglass" />
									</n-gi>
								</n-grid>
							</n-checkbox-group>
						</n-collapse-item>
						<n-collapse-item name="3" title="权限">
							<n-checkbox-group>
								<n-grid :cols="2" :y-gap="8">
									<n-gi>
										<n-checkbox label="推开" value="Pushes Open" />
									</n-gi>
									<n-gi>
										<n-checkbox label="窗户" value="The Window" />
									</n-gi>
									<n-gi>
										<n-checkbox label="举起" value="And Raises" />
									</n-gi>
									<n-gi>
										<n-checkbox label="望远镜" value="The Spyglass" />
									</n-gi>
								</n-grid>
							</n-checkbox-group>
						</n-collapse-item>
					</n-collapse>
				</td>
			</tr>
			</tbody>
		</n-table>
	</n-layout>
</template>

<style scoped>
@import url(@/styles/trc.css);
</style>
