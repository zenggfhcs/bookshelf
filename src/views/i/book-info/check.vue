<script setup>
import { action, queryItem, removeItem } from "@/api/action.js";
import { Service } from "@/api/index.js";
import BookAdd from "@/components/book-add.vue";
import BookInfoUpdate from "@/components/book-info-update.vue";
import BookInfoShow from "@/components/i/book-info.vue";
import InfoBookList from "@/components/info-book-list.vue";
import { B_BOOK_INFO_CHECK } from "@/constant/breadcrumb.js";
import { messageOptions } from "@/constant/options.js";
import IBack from "@/icons/i-back.vue";
import IDelete from "@/icons/i-delete.vue";
import IEdit from "@/icons/i-edit.vue";
import IReload from "@/icons/i-reload.vue";
import IWarehouse from "@/icons/i-warehouse.vue";
import { BOOK_INFO } from "@/router/route-value.js";
import { debounce } from "@/utils/debounce.js";
import { NButton, NFlex, NIcon, NLayout, NLayoutHeader, NModal, useMessage } from "naive-ui";
import { onBeforeMount, onMounted, reactive, ref } from "vue";

const props = defineProps({
	id: String,
	showModal: Function,
	updateMenuItem: Function,
	updateBreadcrumbArray: Function
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


// todo 编写测试更新功能
const isUpdatingRef = ref(false);

const bookInfoUpdateRef = ref();

const updateHandler = debounce(() => {
	if (!bookInfoUpdateRef.value) {
		return;
	}
	bookInfoUpdateRef.value.handleUpdate().then((_) => {
		isUpdatingRef.value = false;
		query(props.id);
	}).catch(() => {
	});
});

const books = ref([]);

async function query(id) {
	loadingQuery.value = true;

	await queryItem(message, Service.BookInfos.get(id), info);

	if (info.id) {
		await action(message, Service.Books.getByInfoId(info.id), (res) => {
			books.value = [...res];
		});
	}

	loadingQuery.value = false;
}

const queryHandler = debounce(() => {
	if (props.id) {
		query(props.id);
	}
});

const switchToUpdateHandler = debounce(() => {
	isUpdatingRef.value = true;
});

const showAddBookModalRef = ref(false);

function handleFinishAddBook() {
	showAddBookModalRef.value = false;
	query(props.id);
}

function remove() {
	if (books.value.length > 0) {
		message.error("仍存在未出库的书籍，不可删除该书籍信息", messageOptions);
		return;
	}
	removeItem(message, Service.BookInfos.remove(props.id), BOOK_INFO);
}

function showDeleteConfirmModal() {
	props.showModal("error", "删除二次确认", "您是否要删除？", remove);
}

const options = {
	action: {
		remove: true
	}
};

onBeforeMount(() => {
	props.updateMenuItem("i-book-info");
	props.updateBreadcrumbArray(B_BOOK_INFO_CHECK(props.id));
});

onMounted(() => {
	query(props.id);
});

</script>

<template>
	<n-layout-header class="top-0 h-3em" position="absolute">
		<n-flex class="h-3em items-center" justify="center">
			<router-link :to="BOOK_INFO">
				<n-button type="tertiary">
					<template #icon>
						<n-icon :component="IBack" />
					</template>
					后退
				</n-button>
			</router-link>
			<n-button
				v-show="!isUpdatingRef" :loading="loadingQuery"
				class="h-2.4em"
				type="info"
				@click.prevent="queryHandler">
				<template #icon>
					<n-icon :component="IReload" />
				</template>
				刷新
			</n-button>
			<n-button v-show="!isUpdatingRef" class="h-2.4em" type="success" @click.prevent="showAddBookModalRef = true">
				<template #icon>
					<n-icon :component="IWarehouse" />
				</template>
				入库
			</n-button>
			<n-button v-show="!books.length && !isUpdatingRef" type="error" @click.prevent="showDeleteConfirmModal">
				<template #icon>
					<n-icon :component="IDelete" />
				</template>
				删除
			</n-button>
			<n-button v-show="!isUpdatingRef" type="warning" @click.prevent="switchToUpdateHandler">
				<template #icon>
					<n-icon :component="IEdit" />
				</template>
				修改
			</n-button>
			<n-button v-show="isUpdatingRef" secondary type="warning" @click.prevent="isUpdatingRef = false">
				<template #icon>
					<n-icon :component="IEdit" />
				</template>
				取消修改
			</n-button>
			<n-button v-show="isUpdatingRef" type="warning" @click.prevent="updateHandler">
				<template #icon>
					<n-icon :component="IEdit" />
				</template>
				提交
			</n-button>
		</n-flex>
	</n-layout-header>
	<n-layout
		:native-scrollbar="false"
		class="absolute top-3em bottom-0 left-0 right-0"
		content-style="padding: .5em 1em"
	>
		<n-flex vertical>
			<BookInfoUpdate v-if="isUpdatingRef" ref="bookInfoUpdateRef" :data-info="info" @handle-update="" />
			<template v-else>
				<BookInfoShow :info="info" />
				<InfoBookList :data="books" :options="options" :show-modal="props.showModal"
				              @after-delete="query(info.id)" />
			</template>
		</n-flex>
	</n-layout>
	<n-modal id="add-book-modal" v-model:show="showAddBookModalRef">
		<BookAdd :book-info="info" :close="handleFinishAddBook" />
	</n-modal>

</template>

<style scoped>
@import url(@/styles/trc.css);

:deep(.n-upload .n-upload-file-list .n-upload-file.n-upload-file--image-card-type),
:deep(.n-upload .n-upload-file-list .n-upload-trigger.n-upload-trigger--image-card) {
	width: 360px;
	height: 720px;
}
</style>
