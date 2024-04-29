<script setup>

import { removeItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { debounce } from "@/utils/debounce.js";
import { NButton, NFlex, NSpace, NTable, NTag, useMessage } from "naive-ui";
import { onMounted, ref } from "vue";

const props = defineProps({
	data: Array,
	showModal: Function,
	options: Object
});

const emits = defineEmits({
	afterDelete: Function
});

const message = useMessage();

const books = ref([]);

const removeHandler = debounce((id) => {
	if (!id) {
		return;
	}
	props.showModal(
		"error",
		"删除二次确认",
		"您是否要删除该图书？",
		async () => {
			await removeItem(
				message,
				Service.Books.remove(id)
			);
			emits("afterDelete");
		});

});

onMounted(() => {
});
</script>

<template>
	<n-flex class="w-100%">
		<n-table>
			<tbody>
			<tr>
				<th>序号</th>
				<th>馆藏地（排/架参考）</th>
				<th>索取号</th>
				<th class="w-11em">状态</th>
				<th v-if="options?.action">操作</th>
			</tr>
			<tr v-for="(item, index) in props.data" :key="index">
				<td>{{ index + 1 }}</td>
				<td></td>
				<td>{{ item?.libIndex }}</td>
				<td>
					<n-tag v-if="item.borrowable" :bordered="false" type="success">可借的</n-tag>
					<n-tag v-else :bordered="false" type="warning">{{ item?.currentDebit?.returnDeadline }}应还</n-tag>
				</td>
				<td v-if="options?.action">
					<n-space>
						<n-button v-if="options.action?.remove && item.borrowable" :bordered="false" type="error"
						          @click.prevent="removeHandler(item?.id)">出库
						</n-button>
						<!--						<n-button :bordered="false" type="warning">归还</n-button>-->
					</n-space>
				</td>
			</tr>
			</tbody>
		</n-table>
	</n-flex>
</template>

<style scoped>

</style>