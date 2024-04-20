import { messageOptions } from "@/constant/options.js";

function addItem(message, promise) {
	return promise
		.then((_) => {
			message.success("新增成功", messageOptions);
			return Promise.resolve();
		})
		.catch((err) => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
		});
}

export { addItem };
