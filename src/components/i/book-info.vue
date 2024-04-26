<script setup>

import NoData from "@/components/no-data.vue";
import { LANG_TYPE_MAP } from "@/constant/map.js";
import { format } from "date-fns";
import { NFlex, NGradientText, NImage, NTable, NTag, NText } from "naive-ui";
import { onMounted } from "vue";

const props = defineProps({
	info: Object
});


onMounted(() => {
	// Object.assign(info, props.info);
});
</script>

<template>
	<n-flex class="w-100%" style="flex-flow: nowrap;">
		<n-table :bordered="false" class="w-100%">
			<tbody class="trc">
			<tr>
				<td rowspan="12" style="border-bottom: 0; vertical-align: top;">
					<n-image :src="props.info.cover" alt="书籍图片链接" width="360" />
				</td>
				<td class="w-12%">ISBN</td>
				<td class="w-38%">
					<n-tag :bordered="false" type="error">
						{{ props.info.isbn }}
					</n-tag>
				</td>
				<td class="w-12%">CIP&nbsp;核准号</td>
				<td class="w-38%">
					<n-tag :bordered="false" type="error">
						{{ props.info.cip }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>名称</td>
				<td colspan="3">
					<n-gradient-text :size="24" type="error">
						{{ props.info.bookName }}
					</n-gradient-text>
				</td>
			</tr>
			<tr>
				<td>作者</td>
				<td colspan="3">
					<span v-if="props.info.author">{{ props.info.author }}</span>
					<NoData v-else />
				</td>
			</tr>
			<tr>
				<td>中图法分类号</td>
				<td colspan="3">
					<n-tag :bordered="false" type="default">
						{{ props.info.bookType }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>主题词</td>
				<td colspan="3">
					<n-tag
						v-for="(item, index) in props.info.keyword
								?.toString()
								?.split('－')" :key="index" :bordered="false" class="m-r-3" type="info">
						{{ item }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>正文语种</td>
				<td colspan="3">
					<n-tag :bordered="false" type="default">
						{{ LANG_TYPE_MAP.getByValue(props.info.lang) }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td>价格(CNY)</td>
				<td colspan="3">
					<n-tag :bordered="false" type="default">
						{{ props.info.price }}
					</n-tag>
				</td>
			</tr>
			<tr>
				<td colspan="4">&nbsp;</td>
			</tr>
			<tr>
				<td>出版社</td>
				<td>
					<n-tag v-if="props.info.publisher" :bordered="false" type="default">
						{{ props.info.publisher }}
					</n-tag>
					<NoData v-else />
				</td>
				<td class="w-30">出版日期</td>
				<td colspan="3">
					<n-tag v-if="props.info.publishedDate" :bordered="false" type="default">
						{{ format(props.info.publishedDate, "yyyy年MM月") }}
					</n-tag>
					<NoData v-else />
				</td>
			</tr>
			<tr>
				<td>版次</td>
				<td>
					<n-tag v-if="props.info.edition" :bordered="false" type="default">
						{{ props.info.edition }}
					</n-tag>
					<NoData v-else />
				</td>
				<td>印次</td>
				<td>
					<n-tag v-if="props.info.printing" :bordered="false" type="default">
						{{ props.info.printing }}
					</n-tag>
					<NoData v-else />
				</td>
			</tr>
			<tr>
				<td style="vertical-align: top;">内容摘要</td>
				<td colspan="3">
					<n-text v-if="props.info.describe" class="w-70%">
						{{ props.info.describe }}
					</n-text>
					<NoData v-else />
				</td>
			</tr>
			<tr>
				<td colspan="4">&nbsp;</td>
			</tr>
			<tr>
				<td>备注</td>
				<td colspan="3">
					<n-text v-if="props.info.remark">
						{{ props.info.remark }}
					</n-text>
					<NoData v-else />
				</td>
			</tr>
			</tbody>
		</n-table>
	</n-flex>
</template>

<style scoped>

</style>