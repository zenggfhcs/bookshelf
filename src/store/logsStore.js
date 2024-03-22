import {defineStore} from "pinia";
import {ref} from "vue";

const useLogsStore = defineStore("logs", () => {
	const page = ref(1);
	const pageSize = ref(10);

	const inc = () => page.value++;
	const dec = () => page.value--;

	const alterSize = (s) => pageSize.value = s;
	const start = () => (page.value - 1) * pageSize.value;

	const end = () => pageSize.value;

	return {
		page,
		pageSize,
		start,
		end,
	}
});

export default useLogsStore;