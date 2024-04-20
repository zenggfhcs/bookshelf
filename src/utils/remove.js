import { messageOptions } from "@/constant/options.js";
import { goto } from "@/router/goto.js";

function removeItem(message, promise, toComponent = undefined) {
	return promise
		.then()
		.then((_) => {
			message.success("删除成功", messageOptions);
			if (toComponent) {
				goto(toComponent);
			}
		})
		.catch((err) => {
			message.error(err.message, messageOptions);
		})
		.finally(() => {
		});
}

export { removeItem };
