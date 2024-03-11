import {messageOptions} from "@/constant/options.js";
import {ResponseCode} from "@/constant/response-code.js";

const iThen = (res, then) => {
	const data = res.data;
	if (!data || data?.code !== ResponseCode.SUCCESS) {
		message.error(data?.msg, messageOptions);
		return;
	}
	then(data);
}