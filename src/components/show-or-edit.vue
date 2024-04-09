<script setup>
import { NInput } from "naive-ui";
import { nextTick, ref } from "vue";

const props = defineProps(["value", "onUpdateValue"]);

const isEdit = ref(false);

const inputRef = ref(null);

const inputValue = ref(props.value);

function handleOnClick() {
	isEdit.value = true;
	nextTick(() => {
		inputRef.value?.focus();
	});
}

function handleChange() {
	props.onUpdateValue(inputValue.value);
	isEdit.value = false;
}

function handleUpdateValue(v) {
	inputValue.value = v;
}
</script>

<template>
	<n-input
		v-if="isEdit"
		ref="inputRef"
		:value="inputValue"
		@change="handleChange"
		@blur="handleChange"
		@update:value="handleUpdateValue"
	/>
	<div v-else @click="handleOnClick">
		{{ props.value }}
	</div>
</template>

<style scoped></style>
