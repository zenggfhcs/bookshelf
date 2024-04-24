<script setup>

import { addItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import { messageOptions } from "@/constant/options.js";
import { debounce } from "@/utils/debounce.js";
import { formValidator, inputValidator } from "@/utils/validator.js";
import { NButton, NCard, NFlex, NForm, NFormItem, NInput, NSelect, NTable, NTag, useMessage } from "naive-ui";
import { computed, onMounted, reactive, ref } from "vue";

const props = defineProps(["bookInfo", "close"]);

const message = useMessage();

const addFormRef = ref(null);

const bookInfoRef = ref(null);

const rules = {
	damageLevel: {
		trigger: ["blur"],
		required: true,
		message: "请选择"
	},
	bookInfo: {
		trigger: ["blur"],
		required: true,
		validator(_, value) {
			if (!value) {
				return new Error("请选择");
			}
		}
	}
};

const info = reactive({
	damageLevel: "",
	borrowable: "",
	remark: "",
	bookInfo: props.bookInfo ? props.bookInfo : computed(() => {
		return bookInfoRef.value ? JSON.parse(bookInfoRef.value) : undefined;
	})
});


const damageLevelOptionsRef = ref([]);

const bookInfoOptionsRef = ref([]);

const loadingQueryBookInfo = ref(false);


const handleQueryBookInfo = debounce((queryKeyword) => {
	if (!queryKeyword) {
		bookInfoOptionsRef.value = [];
		return;
	}
	Service.BookInfos.getByKeyword(queryKeyword)
		.then((res) => {
			bookInfoOptionsRef.value = res?.map((item) => {
				return {
					label: `${item.bookName}`,
					value: JSON.stringify(item)
				};
			});
		})
		.catch((err) => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
		});
}, 100);

const loadingAdd = ref(false);

const addHandler = debounce(() => {
	formValidator(addFormRef, message, async () => {
		loadingAdd.value = true;
		await addItem(message, Service.Books.add(info));
		props.close();
		loadingAdd.value = false;
	});
});

onMounted(() => {
	Service.Books.getDamageLevels().then((res) => {
		damageLevelOptionsRef.value = res?.map((item) => {
			return {
				label: `${item.value}`,
				value: `${item.key}`
			};
		});
	});
});
</script>


<template>
	<n-flex justify="center">
		<n-card class="w-44em" title="书籍入库">
			<n-form ref="addFormRef" :model="info" :rules="rules">
				<n-form-item label="书籍破损程度" path="damageLevel">
					<n-select
						v-model:value="info.damageLevel"
						:options="damageLevelOptionsRef"
						clearable
						placeholder="破损程度"
					/>
				</n-form-item>
				<n-table v-if="props.bookInfo" v-show="info.bookInfo" class="m-b-1.5em">
					<tbody>
					<tr>
						<td class="w-43%">名称</td>
						<td>
							<n-tag :bordered="false" type="info">
								{{ info.bookInfo?.bookName }}
							</n-tag>
						</td>
					</tr>
					<tr>
						<td>ISBN</td>
						<td>
							<n-tag :bordered="false" type="default">
								{{ info.bookInfo?.isbn }}
							</n-tag>
						</td>
					</tr>
					<tr>
						<td>CIP</td>
						<td>
							<n-tag :bordered="false" type="default">
								{{ info.bookInfo?.cip }}
							</n-tag>
						</td>
					</tr>
					</tbody>
				</n-table>
				<n-form-item v-else label="书籍信息" path="bookInfo">
					<n-select
						v-model:value="bookInfoRef"
						:loading="loadingQueryBookInfo"
						:options="bookInfoOptionsRef"
						clearable
						filterable
						placeholder="输入"
						remote
						@search="handleQueryBookInfo"
					/>
				</n-form-item>
				<n-form-item label="备注" path="remark">
					<n-input
						v-model:value="info.remark"
						:allow-input="inputValidator.noSideSpace"
						autosize
						clearable
						maxlength="255"
						placeholder="输入备注"
						type="textarea"
					/>
				</n-form-item>
			</n-form>
			<n-flex justify="right">
				<n-button :loading="loadingAdd" type="success" @click.prevent="addHandler">
					提交
				</n-button>
			</n-flex>
		</n-card>
	</n-flex>
</template>

<style scoped>

</style>