<script setup>

import {NCheckbox, NFlex, NGi, NGrid, NImage, NText} from "naive-ui";
</script>

<template>
	<n-flex class="items-center">
		<n-checkbox size="large"/>
		<n-image
			height="128"
			src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
			width="108"
		/>
		<n-flex class="h-100% flex-1">
			<n-text class="font-size-1.5em">acb</n-text>
			<n-grid :y-gap="8" cols="3">
				<n-gi>CIP核准号：2012114842</n-gi>
				<n-gi>ISBN: 978-7-5074-2605-2</n-gi>
				<n-gi>出版时间：2012.9</n-gi>
				<n-gi>出版单位：中国城市出版社</n-gi>
				<n-gi>丛书名：童本佳</n-gi>
				<n-gi>作者：(日)童本佳,著、绘</n-gi>
			</n-grid>
			<n-text>主题词：英语课－学前教育－教学参考资料</n-text>
		</n-flex>
		<n-flex class="items-end" justify="right" vertical>
			<n-text>
				版次：1丨印次：1
			</n-text>
			<n-text>CIP数据库</n-text>
		</n-flex>
	</n-flex>
</template>

<style scoped>

</style>