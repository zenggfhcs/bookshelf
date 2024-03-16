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
	NSpin,
	useMessage
} from "naive-ui";
import {reactive, ref} from "vue";

const message = useMessage();

//#region add
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const entity = reactive({
	name: '',
	remark: '',
})

const showAdd = ref(false);

const loadingAdd = ref(false);

const addFormRef = ref(null);

const addRule = {
	name: {
		required: true,
		trigger: ["input", "blur"],
		validator(rule, value) {
			if (value === undefined || value === null || value.length === 0) {
				return new Error("请输入");
			}
		}
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
}, 777);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

</script>

<template>
	<n-layout-header>
		<n-flex style="margin: .3em 1em">
			<h1 class="m-r-a">添加出版社</h1>
			<n-button type="success" @click="add">
				确定
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout>

		<n-flex justify="center">
			<div class="w-30em">
				<n-spin :show="loadingAdd">
					<n-form ref="addFormRef" :model="entity" :rules="addRule" label-align="right" label-placement="left"
					        label-width="auto" style="--n-font-size: 16px;">
						<n-form-item label="出版社名称" path="name">
							<n-input-group>
								<n-input v-model:value="entity.name" :allow-input="inputValidator.noSideSpace" clearable
								         maxlength="32" placeholder="输入出版社名称"/>
								<n-input-group-label>出版社</n-input-group-label>
							</n-input-group>
						</n-form-item>

						<n-form-item label="备注" path="remark">
							<n-input v-model:value="entity.remark" :allow-input="inputValidator.noSideSpace" clearable
							         maxlength="255" placeholder="输入备注"
							         type="textarea"/>
						</n-form-item>
					</n-form>
				</n-spin>
			</div>
		</n-flex>
	</n-layout>
</template>

<style scoped>

</style>