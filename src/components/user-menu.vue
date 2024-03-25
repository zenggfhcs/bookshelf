<script setup>
import {NButton, NForm, NPopover} from "naive-ui";

const props = defineProps(["show"]);

</script>

<template>
	<n-popover class="p-0" placement="left-start" trigger="click">
		<template #trigger>
			<n-button class="m-l-a m-.2em h-3em w-3em b-rd-50% p-0 b-0 cursor-pointer">
                        <span class="font-800 font-size-1em"
                              style="font-family: inter,sans-serif;">ME</span>
			</n-button>
		</template>
		<n-form label-placement="left">
			<n-button :bordered="false" class="no-border-btn" @click="show">
				登出
			</n-button>
		</n-form>
	</n-popover>
</template>

<style scoped>
@import url(@/styles/no-border-btn.css);
</style>