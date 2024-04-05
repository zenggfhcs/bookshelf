//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

import { elapsedTimeLevel, LOG_TYPE_MAP } from "@/constant/log-info.js";
import {
	ageLevel,
	GENDER_MAP,
	GENDER_TAG_TYPE_MAP,
	USER_TAG_TYPE_MAP,
} from "@/constant/user-info.js";

//#region 时间戳转 yyyy-MM-ddTHH:mm:ss
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
function timestampToDateTimeString(timestamp) {
	if (!timestamp) {
		return null;
	}

	// 创建一个新的 Date 对象
	const date = new Date(timestamp);

	// 获取年、月、日、时、分、秒
	const yyyy = date.getFullYear();
	const MM = padZero(date.getMonth() + 1);
	const dd = padZero(date.getDate());
	const HH = padZero(date.getHours());
	const mm = padZero(date.getMinutes());
	const ss = padZero(date.getSeconds());

	// 返回格式化后的字符串
	return `${yyyy}-${MM}-${dd}T${HH}:${mm}:${ss}`;
}

// 辅助函数，用于补零
function padZero(num) {
	return (num < 10 ? "0" : "") + num;
}

export { timestampToDateTimeString };

function timeFormat(time) {
	return time?.toString().replace("T", " ");
}

export { timeFormat };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

const getTagType = {
	byLogType: (value) => LOG_TYPE_MAP[value],
	byElapsedTime: (elapsedTime) => {
		for (const item of elapsedTimeLevel) {
			if (item.value <= elapsedTime) {
				return item.type;
			}
		}
		return "error";
	},
	byUserRole: (value) => USER_TAG_TYPE_MAP[value],
	byAge: (age) => {
		for (const item of ageLevel) {
			if (item.value <= age) {
				return item.type;
			}
		}
		return "default";
	},
	byGender: (g) => GENDER_TAG_TYPE_MAP[g],
};

export { getTagType };

function convertGender(g) {
	return GENDER_MAP[g];
}

export { convertGender };

function optional(checkObject, avoidanceValue) {
	return checkObject ? checkObject : avoidanceValue;
}

export { optional };
