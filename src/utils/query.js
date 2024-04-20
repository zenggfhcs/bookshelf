import { messageOptions } from "@/constant/options.js";
import { copyMatchingProperties } from "@/utils/index.js";

function queryItem(message, promise, info) {
	return promise
		.then(async (res) => {
			copyMatchingProperties(res, info);
			return Promise.resolve();
		})
		.catch((err) => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
		});
}

export { queryItem };

function queryList(message, promise, itemCount, tableData) {
	return promise
		.then(async (res) => {
			itemCount.value = res?.length;
			tableData.value = res?.list;
			// todo
			console.log(tableData.value);
			tableData.value.forEach((item) => {
				item.key = item.id;
			});
			return Promise.resolve();
		})
		.catch((err) => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
		});
}

export { queryList };
