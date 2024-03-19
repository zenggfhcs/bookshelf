<script setup>

import {debounce} from "@/utils/debounce.js";
import {formValidator, inputValidator} from "@/utils/validator.js";
import {
	NButton,
	NCheckbox,
	NCheckboxGroup,
	NFlex,
	NForm,
	NFormItem,
	NGi,
	NGrid,
	NInput,
	NLayout,
	NLayoutHeader,
	NSelect,
	NTable,
	NTd,
	NTr,
	useMessage
} from "naive-ui";
import {reactive, ref} from "vue";

const props = defineProps(['updateMenuItem']);

props.updateMenuItem("i-book");

const message = useMessage();

const addFormRef = ref(null);

const entity = reactive({
	damageLevel: '',
	borrowable: '',
	remark: '',
	bookInfo: {
		id: ''
	}
})

const damageLevelValue = ref('');
// todo 定义 damageLevel options
const damageLevelOptions = [];

const bookInfoValue = ref('');

// todo 定义 bookInfo options
const bookInfoOptions = [
	{}
]

const loadingSearchBookInfo = ref(false);

// todo 定义 search bookInfo
const handleSearchBookInfo = (v) => {
	console.log(v);
}

const states = ref([]);

const loadingAdd = ref(false);

const addRule = {
	damageLevel: {
		trigger: ["blur"],
		required: true,
		message: "请选择",
	},
	bookInfo: {
		trigger: ["blur"],
		required: true,
		message: "请选择",
	}
}

// todo pre add 编辑添加前的转换
const preAdd = () => {

}

// todo add
const add = debounce((e) => {
	e.preventDefault();
	// todo
	formValidator(addFormRef, message, () => {

	});
})

</script>

<template>
	<n-layout-header>
		<n-flex class="items-center m-l-1em m-r-1em">
			<h1 class="m-r-a">新增书籍</h1>
			<n-button :loading="loadingAdd" type="success" @click="add">
				确定
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout :native-scrollbar="false" class="absolute top-3em bottom-0 left-0 right-0"
	          content-style="padding: .3em 1em">
		<n-form ref="addFormRef" :model="entity" :rules="addRule"
		        label-placement="left">
			<n-table :single-line="false" class="w-100%">
				<tbody class="trc">
				<n-tr>
					<n-td class="w-43%">书籍破损程度</n-td>
					<n-td>
						<n-form-item path="damageLevel">
							<n-select
								v-model:value="damageLevelValue"
								:options="damageLevelOptions"
								placeholder="破损程度"/>
						</n-form-item>
					</n-td>
				</n-tr>
				<n-tr>
					<n-td>状态</n-td>
					<n-td>
						<n-checkbox-group v-model:value="states">
							<n-grid cols="4">
								<n-gi>
									<n-checkbox label="可借的" value="borrowable"/>
								</n-gi>
							</n-grid>
						</n-checkbox-group>
					</n-td>
				</n-tr>
				<n-tr>
					<n-td>备注</n-td>
					<n-td>
						<n-form-item path="remark">
							<n-input v-model:value="entity.remark" :allow-input="inputValidator.noSideSpace" autosize
							         clearable maxlength="255"
							         placeholder="输入备注" type="textarea"/>
						</n-form-item>
					</n-td>
				</n-tr>
				<n-tr>
					<n-td>书籍信息</n-td>
					<n-td>
						<n-grid cols="1" y-gap="8">
							<n-gi>
								<n-form-item path="bookInfo">
									<n-select
										v-model:value="bookInfoValue"
										:loading="loadingSearchBookInfo"
										:options="bookInfoOptions"
										clearable
										filterable
										placeholder="搜索"
										remote
										@search="handleSearchBookInfo"/>
								</n-form-item>
							</n-gi>
							<n-gi>
								<!--								todo 书籍信息-->
								todo 书籍信息
							</n-gi>
						</n-grid>
					</n-td>
				</n-tr>
				</tbody>
			</n-table>
		</n-form>
	</n-layout>
</template>

<style scoped>
@import url(@/styles/trc.css);
</style>