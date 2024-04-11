//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

import { messageOptions } from "@/constant/options.js";

const inputValidator = {
	onlyAllowNumber: (s) => !s || /^\d+$/.test(s),
	noSideSpace: (s) => !s.startsWith(" ") && !s.endsWith(" ")
	// allowFloatNumber: (s) => !s || /^\d*\.?\d{0,2}$/.test(s),
};

export { inputValidator };

function formValidator(form, message, then) {
	form?.value?.validate((errors) => {
		if (errors) {
			message.error("表单没有通过验证，请检查表单项", messageOptions);
			return;
		}
		then();
	});
}

export { formValidator };

function isbnValidator(isbn) {
	// 删除字符串中的空格和短横线
	isbn = isbn.replace(/[-\s]/g, "");

	// 检查ISBN-10
	if (isbn.length === 10) {
		let sum = 0;
		for (let i = 0; i < 9; i++) {
			if (isNaN(parseInt(isbn[i], 10))) {
				return false;
			}
			sum += parseInt(isbn[i], 10) * (10 - i);
		}
		let lastChar = isbn[9].toUpperCase();
		return (
			(lastChar === "X" && sum % 11 === 10) ||
			parseInt(lastChar, 10) * (10 - 9) === 11 - (sum % 11)
		);
	}
	// 检查ISBN-13
	else if (isbn.length === 13) {
		let sum = 0;
		let multiplier = 1;
		for (let i = 0; i < 12; i++) {
			if (isNaN(parseInt(isbn[i], 10))) {
				return false;
			}
			sum += parseInt(isbn[i], 10) * multiplier;
			multiplier = 4 - multiplier; // 切换乘数1和3
		}
		let checkDigit = (10 - (sum % 10)) % 10;
		return checkDigit === parseInt(isbn[12], 10);
	}
	// 长度不符合ISBN-10或ISBN-13
	return false;
}

export { isbnValidator };
