<template>
	<n-data-table
		ref="table"
		:columns="columnsRef"
		:data="dataRef"
		:loading="loading"
		:pagination="pagination"
		:row-key="rowKey"
		remote
		@update:sorter="handleSorterChange"
		@update:filters="handleFiltersChange"
		@update:page="handlePageChange"
	/>
</template>

<script setup>
import {NDataTable} from 'naive-ui'
import {onMounted, reactive, ref} from 'vue'

const column1 = {
	title: 'column1',
	key: 'column1',
	sorter: true,
	sortOrder: false
}

const column2 = {
	title: 'column2',
	key: 'column2',
	filter: true,
	filterOptionValues: [],
	filterOptions: [
		{
			label: 'Value1',
			value: 1
		},
		{
			label: 'Value2',
			value: 2
		}
	]
}

const columns = [
	column1,
	column2,
	{
		title: 'Column3',
		key: 'column3'
	}
]

const data = Array.apply(null, {length: 987}).map((_, index) => {
	return {
		column1: index,
		column2: (index % 2) + 1,
		column3: 'a' + index
	}
})

function query(page, pageSize = 20, order = 'ascend', filterValues = []) {
	return new Promise((resolve) => {
		const copiedData = data.map((v) => v)
		const orderedData = order === 'descend' ? copiedData.reverse() : copiedData
		const filteredData = filterValues.length
			? orderedData.filter((row) => filterValues.includes(row.column2))
			: orderedData
		const pagedData = filteredData.slice((page - 1) * pageSize, page * pageSize)
		const total = filteredData.length
		const pageCount = Math.ceil(filteredData.length / pageSize)
		setTimeout(
			() =>
				resolve({
					pageCount,
					data: pagedData,
					total
				}),
			1500
		)
	})
}


const dataRef = ref([])
const loading = ref(true)
const columnsRef = ref(columns)
const column1Reactive = reactive(column1)
const column2Reactive = reactive(column2)
const pagination = reactive({
	page: 1,
	pageCount: 1,
	pageSize: 20,
	prefix({itemCount}) {
		return `Total is ${itemCount}.`
	}
})

onMounted(() => {
	query(
		pagination.page,
		pagination.pageSize,
		column1Reactive.sortOrder,
		column2Reactive.filterOptionValues
	).then((data) => {
		dataRef.value = data.data
		pagination.pageCount = data.pageCount
		pagination.itemCount = data.total
		loading.value = false
	})
})


const rowKey = (rowData) => {
	return rowData.column1
}

const handleSorterChange = (sorter) => {
	if (!sorter || sorter.columnKey === 'column1') {
		if (!loading.value) {
			loading.value = true
			query(
				pagination.page,
				pagination.pageSize,
				!sorter ? false : sorter.order,
				column2Reactive.filterOptionValues
			).then((data) => {
				column1Reactive.sortOrder = !sorter ? false : sorter.order
				dataRef.value = data.data
				pagination.pageCount = data.pageCount
				pagination.itemCount = data.total
				loading.value = false
			})
		}
	}
}

const handleFiltersChange = (filters) => {
	if (!loading.value) {
		loading.value = true
		const filterValues = filters.column2 || []
		query(
			pagination.page,
			pagination.pageSize,
			column1Reactive.sortOrder,
			filterValues
		).then((data) => {
			column2Reactive.filterOptionValues = filterValues
			dataRef.value = data.data
			pagination.pageCount = data.pageCount
			pagination.itemCount = data.total
			loading.value = false
		})
	}
}
const handlePageChange = (currentPage) => {
	if (!loading.value) {
		loading.value = true
		query(
			currentPage,
			pagination.pageSize,
			column1Reactive.sortOrder,
			column2Reactive.filterOptionValues
		).then((data) => {
			dataRef.value = data.data
			pagination.page = currentPage
			pagination.pageCount = data.pageCount
			pagination.itemCount = data.total
			loading.value = false
		})
	}
}

</script>