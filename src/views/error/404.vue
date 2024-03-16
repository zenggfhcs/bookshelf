<script setup>
import Index from "@/layout/error.vue";
import {NLayout, NResult} from 'naive-ui'
</script>

<template>
	<n-layout class="bg-#00bd7e" position="absolute">
		<index>
			<n-result description="生活总归带点荒谬" size="huge" status="404" title="404">
				<div class="flex justify-center font-800 font-size-2em">
					<span>资源不存在</span>
					<span v-if="$route.redirectedFrom?.matched?.[0].name === 'undefined'">
               :
               <span class="color-yellow">{{ $route.redirectedFrom?.fullPath }}</span>
            </span>
				</div>
			</n-result>
		</index>
	</n-layout>
</template>

<style scoped>
@import url(@/styles/error.css);
</style>