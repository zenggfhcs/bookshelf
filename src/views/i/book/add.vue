<script setup>

import {debounce} from "@/utils/debounce.js";
import {formValidator, inputValidator} from "@/utils/validator.js";
import {
	NButton,
	NCard,
	NCheckbox,
	NFlex,
	NForm,
	NFormItem,
	NInput,
	NLayout,
	NLayoutHeader,
	NSelect,
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
		<n-flex justify="center">
			<n-card class="w-44em">
				<n-form ref="addFormRef" :model="entity" :rules="addRule">
					<n-form-item label="书籍破损程度" path="damageLevel">
						<n-select
							v-model:value="damageLevelValue"
							:options="damageLevelOptions"
							placeholder="破损程度"/>
					</n-form-item>
					<n-form-item label="书籍信息" path="bookInfo">
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
					<!--								todo 书籍信息-->
					todo 书籍信息
					<n-form-item>
						<n-checkbox label="可借的" value="borrowable"/>
					</n-form-item>
					<n-form-item label="备注" path="remark">
						<n-input v-model:value="entity.remark" :allow-input="inputValidator.noSideSpace" autosize
						         clearable maxlength="255"
						         placeholder="输入备注" type="textarea"/>
					</n-form-item>
				</n-form>
			</n-card>
		</n-flex>
	</n-layout>
</template>

<style scoped>
@import url(@/styles/trc.css);
</style>