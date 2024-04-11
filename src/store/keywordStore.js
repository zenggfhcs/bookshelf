import { defineStore } from "pinia";
import { ref } from "vue";

const keywordStore = defineStore("keyword", () => {
	const key = ref("");

	return { key };
});

export default keywordStore;