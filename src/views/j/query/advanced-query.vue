<script setup>
import QueryResult from "@/views/j/query/query-result.vue";
import { NButton, NCard, NFlex, NForm, NFormItem, NGi, NGrid, NInput, NLayout } from "naive-ui";
import { ref } from "vue";

const props = defineProps(["updateMenuItem"]);
{
	props.updateMenuItem("j-advanced-query");
}

const queryRef = ref(false);
</script>

<template>
	<n-layout>
		<n-flex class="items-center" justify="center" vertical>
			<n-card class="w-80em">
				<div class="font-size-1.5em">馆藏书目组配检索(tips:&nbsp;检索点为前方一致)</div>
				<n-form
					label-placement="left"
					label-width="auto"
					size="small">
					<n-grid :cols="4" x-gap="12" y-gap="0">
						<n-gi>
							<n-form-item label="题名">
								<n-input />
							</n-form-item>
						</n-gi>
						<n-gi>
							<n-form-item label="出版社">
								<n-input />
							</n-form-item>
						</n-gi>
						<n-gi>
							<n-form-item label="著者">
								<n-input />
							</n-form-item>
						</n-gi>
						<n-gi>
							<n-form-item label="分类号">
								<n-input />
							</n-form-item>
						</n-gi>
						<n-gi>
							<n-form-item label="主题词">
								<n-input />
							</n-form-item>
						</n-gi>
						<n-gi>
							<n-form-item label="ISBN">
								<n-input />
							</n-form-item>
						</n-gi>
						<n-gi>
							<n-form-item label="索引号">
								<n-input />
							</n-form-item>
						</n-gi>
						<n-gi>
							<n-form-item label="CIP">
								<n-input />
							</n-form-item>
						</n-gi>
					</n-grid>
					<n-flex justify="space-between">
						<n-button secondary type="default">重置</n-button>
						<n-button type="primary" @click="queryRef=true;">检索</n-button>
					</n-flex>
				</n-form>
			</n-card>
			<QueryResult v-if="queryRef" class="w-80em" />
		</n-flex>
	</n-layout>

</template>

<style scoped>

</style>