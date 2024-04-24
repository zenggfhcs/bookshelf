//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

import { elapsedTimeLevel, LOG_TYPE_MAP } from "@/constant/log-info.js";
import { GENDER_MAP } from "@/constant/map.js";
import { ageLevel, GENDER_TAG_TYPE_MAP, USER_TAG_TYPE_MAP } from "@/constant/user-info.js";

// function timestampToDateTimeString(timestamp) {
// 	if (!timestamp) {
// 		return null;
// 	}
//
// 	// 创建一个新的 Date 对象
// 	const date = new Date(timestamp);
//
// 	// 获取年、月、日、时、分、秒
// 	const yyyy = date.getFullYear();
// 	const MM = padZero(date.getMonth() + 1);
// 	const dd = padZero(date.getDate());
// 	const HH = padZero(date.getHours());
// 	const mm = padZero(date.getMinutes());
// 	const ss = padZero(date.getSeconds());
//
// 	// 返回格式化后的字符串
// 	return `${yyyy}-${MM}-${dd}T${HH}:${mm}:${ss}`;
// }
//
// // 辅助函数，用于补零
// function padZero(num) {
// 	return (num < 10 ? "0" : "") + num;
// }
//
// export { timestampToDateTimeString };

// function timeFormat(time) {
// 	return time?.toString().replace("T", " ");
// }
//
// export { timeFormat };

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
	byGender: (g) => GENDER_TAG_TYPE_MAP[g]
};

export { getTagType };

function convertGender(g) {
	return GENDER_MAP.getByValue(g);
}

export { convertGender };

function optional(checkObject, avoidanceValue) {
	return checkObject ? checkObject : avoidanceValue;
}

export { optional };

function convertToChineseNum(num) {
	if (typeof num !== "number" || num < 0 || isNaN(num)) {
		return num;
	}
	const chineseNums = [
		"零",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六",
		"七",
		"八",
		"九"
	];

	if (num > 0 && num < 10) {
		return chineseNums[num];
	}
	if (num === 10) {
		return "十";
	}
	if (num > 10) {
		return `${chineseNums[Math.floor(num / 10)]}十${chineseNums[num % 10]}`;
	}
}

export { convertToChineseNum };

function convertToNum(chineseStr) {
	if (typeof chineseStr !== "string") {
		return null;
	}

	// 定义中文数字到阿拉伯数字的映射
	const chineseToNum = {
		"零": 0,
		"一": 1,
		"二": 2,
		"三": 3,
		"四": 4,
		"五": 5,
		"六": 6,
		"七": 7,
		"八": 8,
		"九": 9
	};

	// 检查是否为单个数字字符
	if (chineseToNum[chineseStr]) {
		return chineseToNum[chineseStr];
	}

	// 检查是否为"十"或者"十"加个位数的组合
	if (chineseStr.startsWith("十")) {
		if (chineseStr.length === 1) {
			// 只有"十"
			return 10;
		} else {
			// "十"加个位数
			const singleDigit = chineseStr[1];
			if (chineseToNum[singleDigit]) {
				return 10 + chineseToNum[singleDigit];
			}
		}
	}

	// 如果不匹配任何模式，返回null
	return chineseStr;
}

export { convertToNum };
