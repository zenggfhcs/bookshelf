<script setup>
import { Service } from "@/api/index.js";
import { B_BOOK_ADD } from "@/constant/breadcrumb.js";
import { messageOptions } from "@/constant/options.js";
import IAdd from "@/icons/i-add.vue";
import IBack from "@/icons/i-back.vue";
import { BOOK } from "@/router/RouterValue.js";
import { addItem } from "@/utils/add.js";
import { checkLoginState } from "@/utils/check-login-state.js";
import { debounce } from "@/utils/debounce.js";
import { formValidator, inputValidator } from "@/utils/validator.js";
import {
	NButton,
	NCard,
	NFlex,
	NForm,
	NFormItem,
	NIcon,
	NInput,
	NLayout,
	NLayoutHeader,
	NSelect,
	NTable,
	NTag,
	useMessage
} from "naive-ui";
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";

const props = defineProps(["updateMenuItem", "updateBreadcrumbArray"]);

const message = useMessage();

const addFormRef = ref(null);

const bookInfoRef = ref(null);

const info = reactive({
	damageLevel: "",
	borrowable: "",
	remark: "",
	bookInfo: computed(() => {
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
	Service.Books.getBookInfoByKeyword(queryKeyword)
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

// todo add
const add = debounce(() => {
	formValidator(addFormRef, message, () => {
		addItem(message, Service.Books.add(info));
	});
});

onBeforeMount(() => {
	checkLoginState();
});

onMounted(() => {
	props.updateMenuItem("i-book");
	props.updateBreadcrumbArray(B_BOOK_ADD);

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
	<n-layout-header>
		<n-flex class="items-center h-3em" justify="center">
			<router-link :to="BOOK">
				<n-button type="tertiary">
					<template #icon>
						<n-icon :component="IBack" />
					</template>
					后退
				</n-button>
			</router-link>
			<n-button :loading="loadingAdd" type="success" @click.prevent="add">
				<template #icon>
					<n-icon :component="IAdd" />
				</template>
				新增
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout
		:native-scrollbar="false"
		class="absolute top-3em bottom-0 left-0 right-0"
		content-style="padding: .3em 1em"
	>
		<n-flex justify="center">
			<n-card class="w-44em">
				<n-form ref="addFormRef" :model="info" :rules="rules">
					<n-form-item label="书籍破损程度" path="damageLevel">
						<n-select
							v-model:value="info.damageLevel"
							:options="damageLevelOptionsRef"
							clearable
							placeholder="破损程度"
						/>
					</n-form-item>
					<n-form-item label="书籍信息" path="bookInfo">
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
					<n-table v-show="info.bookInfo" class="m-b-1.5em">
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
			</n-card>
		</n-flex>
	</n-layout>
</template>

<style scoped>
@import url(@/styles/trc.css);
</style>
