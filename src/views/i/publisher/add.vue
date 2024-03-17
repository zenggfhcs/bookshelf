<script setup>

import {Service} from "@/api/index.js";
import {messageOptions} from "@/constant/options.js";
import {ResponseCode} from "@/constant/response-code.js";
import {goto} from "@/router/goto.js";
import {PUBLISHER} from "@/router/RouterValue.js";
import {debounce} from "@/utils/debounce.js";
import {inputValidator} from "@/utils/validator.js";
import {
	NButton,
	NFlex,
	NForm,
	NFormItem,
	NInput,
	NInputGroup,
	NInputGroupLabel,
	NLayout,
	NLayoutHeader,
	NTable,
	useMessage
} from "naive-ui";
import {reactive, ref} from "vue";

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
		validator(rule, value) {
			if (value === undefined || value === null || value.length === 0) {
				return new Error("请输入");
			}
		},
	},
	place: {
		trigger: ["input", "blur"],
		required: true,
		validator(rule, value) {
			if (value === undefined || value === null || value.length === 0) {
				return new Error("请输入");
			}
		},
	}
}

const add = debounce((e) => {
	e.preventDefault();
	addFormRef.value?.validate((errors) => {
		if (errors) {
			message.error("添加失败", messageOptions);
			return;
		}
		loadingAdd.value = true;
		Service.Publishers.add(entity)
			.then(res => {
				const data = res.data;
				if (!data || data?.code !== ResponseCode.SUCCESS) {
					message.error(data?.msg, messageOptions);
					return;
				}

				message.success("添加成功", messageOptions);
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
	<n-layout-header>
		<n-flex class="items-center m-l-1em m-r-1em">
			<h1 class="m-r-a">添加出版社</h1>
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
				<!--			todo 优化布局，-->
				<tbody class="trc">
				<tr>
					<td class="w-43%">出版社名称</td>
					<td>
						<n-form-item path="name">
							<n-input-group>
								<n-input v-model:value="entity.name" :allow-input="inputValidator.noSideSpace" clearable
								         maxlength="32" placeholder="输入出版社名称"/>
								<n-input-group-label>出版社</n-input-group-label>
							</n-input-group>
						</n-form-item>
					</td>
				</tr>
				<tr>
					<td>出版社所在地</td>
					<td>
						<n-form-item path="place">
							<n-input v-model:value="entity.place" :allow-input="inputValidator.noSideSpace"
							         maxlength="16" placeholder="输入出版社所在地"/>
						</n-form-item>
					</td>
				</tr>
				<tr>
					<td>备注</td>
					<td>
						<n-form-item path="remark">
							<n-input v-model:value="entity.remark" :allow-input="inputValidator.noSideSpace" autosize
							         clearable maxlength="255"
							         placeholder="输入备注" type="textarea"/>
						</n-form-item>
					</td>
				</tr>
				</tbody>
			</n-table>
		</n-form>
	</n-layout>
</template>

<style scoped>
@import url(@/styles/trc.css);
</style>