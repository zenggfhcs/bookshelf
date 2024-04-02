import {instance} from "@/api/instance.js";

const MyRequest = {
	post: (url, entity) => {
		return instance.post(url, entity);
	},
	get: (url) => {
		return instance.get(url);
	},
	patch: (url, entity) => {
		return instance.patch(url, entity);
	},
	delete: (url) => {
		return instance.delete(url);
	}
}

export {
	MyRequest
}