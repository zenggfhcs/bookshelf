<script setup>
import { action, queryItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import InfoBookList from "@/components/info-book-list.vue";
import BookInfo from "@/components/j/book-info.vue";
import { messageOptions } from "@/constant/options.js";
import IEdit from "@/icons/i-edit.vue";
import { debounce } from "@/utils/debounce.js";
import { NBackTop, NButton, NCard, NFlex, NIcon, useMessage } from "naive-ui";
import { onBeforeMount, onMounted, reactive, ref } from "vue";

const props = defineProps({
	id: String,
	showModal: Function,
	updateMenuItem: Function
});

const loadingQuery = ref(false);

const message = useMessage();

const info = reactive({
	id: null,
	isbn: null,
	cip: null,
	bookName: "",
	bookType: null,
	cover: "",
	author: null,
	describe: null,
	publishedDate: null,
	publisher: "",
	edition: 1,
	printing: 1,
	keyword: null,
	lang: null,
	price: null,
	remark: null,
	revision: null
});

const books = ref([]);

async function query(id) {
	loadingQuery.value = true;

	await queryItem(message, Service.BookInfos.get(id), info);

	await action(message, Service.Books.getByInfoId(info.id), (res) => {
		books.value = [...res];
	});

	loadingQuery.value = false;
}

const options = {};

onBeforeMount(() => {
});

onMounted(() => {
	query(props.id);
});

const loadingBorrowRef = ref(false);

// const borrowHandler = debounce(async () => {
// 	loadingBorrowRef.value = true;
//
// 	await action(message, Service.BookInfos.borrow(props.id), () => {
// 		message.success("借阅成功", messageOptions);
// 	});
//
// 	loadingBorrowRef.value = false;
// });

</script>

<template>
	<n-flex class="m-t-.5em" justify="center">
<!--		<n-flex class="w-80em items-center" justify="right">-->
<!--			<n-button :loading="loadingBorrowRef" type="warning" @click.prevent="borrowHandler">-->
<!--				<template #icon>-->
<!--					<n-icon :component="IEdit" />-->
<!--				</template>-->
<!--				借阅-->
<!--			</n-button>-->
<!--		</n-flex>-->
		<n-flex class="w-80em" vertical>
			<n-card>
				<BookInfo :info="info" />
			</n-card>

			<n-card title="馆藏情况">
				<InfoBookList :data="books" :options="options" />
			</n-card>
		</n-flex>
	</n-flex>
	<n-back-top />
</template>

<style scoped>
@import url(@/styles/trc.css);

:deep(.n-upload .n-upload-file-list .n-upload-file.n-upload-file--image-card-type),
:deep(.n-upload .n-upload-file-list .n-upload-trigger.n-upload-trigger--image-card) {
	width: 360px;
	height: 720px;
}
</style>
