<script setup>
import BookShelf from "@/icons/book-shelf.vue";
import Search from "@/icons/search.vue";
import {
	NBackTop,
	NButton,
	NCard,
	NCheckbox,
	NCollapse,
	NCollapseItem,
	NDivider,
	NFlex,
	NGi,
	NGrid,
	NImage,
	NInput,
	NInputGroup,
	NLayout,
	NLayoutSider,
	NNumberAnimation,
	NSpace,
	NText,
} from "naive-ui";

const props = defineProps(['updateMenuItem']);
{
	props.updateMenuItem('j-check');
}

</script>

<template>
	<n-layout :native-scrollbar="false" position="absolute">
		<n-flex class="m-t-2em items-center" justify="center" vertical>
			<n-flex class="w-80em min-w-80em">
				<n-layout class="h-100000" has-sider>
					<n-layout-sider>
						<n-card>
							<n-flex class="items-center " vertical>
								<BookShelf class="w-8em h-8em"/>
								<n-space class="w-100%" vertical>
									<n-card title="数据类型">
										<n-flex style="flex-wrap: nowrap">
											<n-checkbox/>
											<n-grid class="flex-auto" cols="2">
												<n-gi>
													<n-text>图书</n-text>
												</n-gi>
												<n-gi>
													<n-number-animation :from="0" :to="12039" class="m-l-a"/>
												</n-gi>
												<n-gi>
													<n-text>CIP</n-text>
												</n-gi>
												<n-gi>
													<n-number-animation :from="0" :to="12039" class="m-l-a"/>
												</n-gi>
												<n-gi>
													<n-text>馆藏</n-text>
												</n-gi>
												<n-gi>
													<n-number-animation :from="0" :to="12039" class="m-l-a"/>
												</n-gi>
												<n-gi>
													<n-text>ISBN</n-text>
												</n-gi>
												<n-gi>
													<n-number-animation :from="0" :to="12039" class="m-l-a"/>
												</n-gi>
											</n-grid>
										</n-flex>
									</n-card>
									<n-card>
										<n-collapse>
											<n-collapse-item name="1" title="中图分类法">
												<template #header-extra/>
												<template #arrow/>
												<template #header/>
												<template v-for="i in 20">
													<n-flex class="items-center">
														<n-checkbox/>
														abcd
													</n-flex>
												</template>
											</n-collapse-item>
										</n-collapse>
									</n-card>
								</n-space>
							</n-flex>
						</n-card>
					</n-layout-sider>
					<n-layout class="m-l-1em">
						<n-flex class="items-center m-b-4" vertical>
							<n-input-group>
								<n-input size="large"/>
								<n-button ghost size="large" type="primary">
									<template #icon>
										<Search/>
									</template>
								</n-button>
							</n-input-group>
						</n-flex>
						<n-card>
							<n-space>
								<template v-for="i in 100">
									<n-flex vertical>
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
										<n-divider style="margin: .5em 0;"/>
									</n-flex>
								</template>

							</n-space>
						</n-card>
					</n-layout>
				</n-layout>
			</n-flex>
		</n-flex>
		<n-back-top :right="100"/>
	</n-layout>
</template>

<style scoped>
.logo-text {
	letter-spacing: .125em;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, .8);
	font-family: "Chinese Quotes", serif;
}

:deep(.n-grid div) {
	font-size: 12px;
}

.n-grid div:nth-child(n * 2) {
	text-align: right;
}
</style>