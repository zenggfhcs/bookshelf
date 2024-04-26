import { messageOptions } from "@/constant/options.js";
import { goto } from "@/router/goto.js";
import { copyMatchingProperties } from "@/utils/index.js";

function action(message, promise, then, error) {
	return promise
		.then(res => {
			then(res);
		})
		.catch(err => {
			if (error) {
				error(err);
				return;
			}
			message.error(err.message, messageOptions);
		})
		.finally(() => {
			return Promise.resolve();
		});
}

export { action };

function addItem(message, promise) {
	return action(message, promise, () => {
		message.success("新增成功", messageOptions);
	});
}

export { addItem };

function queryItem(message, promise, info) {
	return action(message, promise, (res) => {
		copyMatchingProperties(res, info);
	});
}

export { queryItem };

function queryList(message, promise, itemCount, tableData) {
	return action(message, promise, (res) => {
		itemCount.value = res?.length;
		tableData.value = res?.list;
		tableData.value.forEach((item) => {
			item.key = item.id;
		});
	});
}

export { queryList };

function removeItem(message, promise, toComponent = undefined) {
	return action(message, promise, () => {
		message.success("删除成功", messageOptions);
		if (toComponent) {
			goto(toComponent);
		}
	});
}

export { removeItem };

function updateItem(message, promise) {
	return action(message, promise, () => {
		message.success("更新成功", messageOptions);
	});
}

export { updateItem };