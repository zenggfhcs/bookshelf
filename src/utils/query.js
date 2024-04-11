import { messageOptions } from "@/constant/options.js";
import { copyMatchingProperties } from "@/utils/index.js";

// /**
//  * 通过 id查找用户，将查找到的用户信息复制给 target，如果查找过程中出现异常，通过 message显示
//  * @param id
//  * @param message
//  * @param target
//  */
// function queryUser(id, message, target) {
// 	if (!id) {
// 		return;
// 	}
// 	return Service.Users.get(id)
// 		.then((res) => {
// 			copyMatchingProperties(res, target);
// 			return new Promise((resolve) => resolve());
// 		})
// 		.catch((err) => {
// 			message.error(err.message, messageOptions);
// 		})
// 		.finally(() => {
// 		});
// }
//
// export { queryUser };

function queryInfo(message, promise, info, creator, updater) {
	return promise
		.then(async (res) => {
			copyMatchingProperties(res, info);
			return new Promise((resolve) => resolve());
		})
		.catch((err) => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
		});
}

export { queryInfo };

// function queryList(message, promise, itemCount, tableData, filteredData) {
// 	return promise
// 		.then((res) => {
// 			itemCount.value = res?.length;
// 			tableData.value = res;
// 			tableData.value.forEach((item) => {
// 				item.key = item.id;
// 			});
// 			filteredData.value = tableData.value;
// 			return new Promise((resolve) => resolve());
// 		})
// 		.catch((err) => {
// 			message.error(err.message, messageOptions);
// 		})
// 		.finally(() => {
// 		});
// }
//
// export { queryList };

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
			return new Promise((resolve) => resolve());
		})
		.catch((err) => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
		});
}

export { queryList };
