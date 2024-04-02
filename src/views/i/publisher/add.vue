<script setup>

import {Service} from "@/api/index.js";
import {B_PUBLISHER_ADD} from "@/constant/breadcrumb.js";
import {messageOptions} from "@/constant/options.js";
import {ResponseCode} from "@/constant/response-code.js";
import {goto} from "@/router/goto.js";
import {PUBLISHER} from "@/router/RouterValue.js";
import {debounce} from "@/utils/debounce.js";
import {formValidator, inputValidator} from "@/utils/validator.js";
import {
	NButton,
	NCard,
	NFlex,
	NForm,
	NFormItem,
	NInput,
	NInputGroup,
	NInputGroupLabel,
	NLayout,
	NLayoutHeader,
	useMessage
} from "naive-ui";
import {reactive, ref} from "vue";

const props = defineProps(['updateMenuItem', 'updateBreadcrumbArray']);
{
	props.updateMenuItem("i-publisher");
	props.updateBreadcrumbArray(B_PUBLISHER_ADD);
}

const addFormRef = ref(null);

const entity = reactive({
	name: '',
	remark: '',
	place: ''
})

const loadingAdd = ref(false);

const message = useMessage();

const showAdd = ref(false);

const addRule = {
	name: {
		trigger: ["input", "blur"],
		required: true,
		message: "不能为空",
	},
	place: {
		trigger: ["input", "blur"],
		required: true,
		message: "不能为空",
	}
}

const add = debounce((e) => {
	e.preventDefault();
	formValidator(addFormRef, message, () => {
		loadingAdd.value = true;
		Service.Publishers.add(entity)
			.then(res => {
				const data = res.data;
				if (!data || data?.code !== ResponseCode.SUCCESS) {
					message.error(data.message, messageOptions);
					return;
				}
				message.success("新增成功", messageOptions);
				showAdd.value = false;

				goto(PUBLISHER);
			})
			.catch(err => {
				message.error(err.message, messageOptions);
			})
			.finally(() => {
				loadingAdd.value = false;
			})
	})
});
</script>

<template>
	<n-layout-header class="top-0 h-3em" position="absolute">
		<n-flex class="items-center" style="margin: 0 1em;">
			<h1 class="m-r-a">新增出版社</h1>
			<n-button :loading="loadingAdd" type="success" @click="add">
				确定
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout :native-scrollbar="false" class="absolute top-3em bottom-0 left-0 right-0"
	          content-style="padding: .3em 1em">
		<n-flex justify="center">
			<n-card class="w-25em" title="新增出版社">
				<n-form ref="addFormRef" :model="entity" :rules="addRule">
					<n-form-item label="名称" path="name">
						<n-input-group>
							<n-input v-model:value="entity.name" :allow-input="inputValidator.noSideSpace" clearable
							         maxlength="32" placeholder="输入出版社名称"/>
							<n-input-group-label>出版社</n-input-group-label>
						</n-input-group>
					</n-form-item>
					<n-form-item label="出版地" path="place">
						<n-input v-model:value="entity.place" :allow-input="inputValidator.noSideSpace"
						         maxlength="16" placeholder="输入出版社所在地"/>
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