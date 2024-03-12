//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region 时间戳转 yyyy-MM-ddTHH:mm:ss
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

import {elapsedTimeLevel, typeMap} from "@/constant/pre-defined/log.js";

const timestampToDateTimeString = (timestamp) => {
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
	return (num < 10 ? '0' : '') + num;
}

export {timestampToDateTimeString};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


const transType = value => typeMap[value];

export {transType};

const getTagTypeByElapsedTime = (elapsedTime) => {
	for (const item of elapsedTimeLevel) {
		if (item.value <= elapsedTime) {
			return item.type;
		}
	}
	return "error";
}
export {getTagTypeByElapsedTime};