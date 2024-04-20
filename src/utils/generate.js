/**
 * menu 路由生成
 * @param name 对应 router 配置里面的 name
 * @returns {{to: {name: string}}}
 */
function gProps(name) {
	return {
		to: {
			name: `${name}`
		}
	};
}

export { gProps };

//#endregion

function generateISBN() {
	// 随机选择ISBN-10或ISBN-13
	const isISBN10 = Math.random() < 0.5;

	if (isISBN10) {
		// 生成ISBN-10
		let isbn10 = "";
		for (let i = 0; i < 9; i++) {
			isbn10 += Math.floor(Math.random() * 10); // 生成0-9的随机数字
		}

		// 计算校验码
		let sum = 0;
		for (let i = 0; i < 9; i++) {
			sum += parseInt(isbn10[i], 10) * (10 - i);
		}
		let checkDigit = 11 - (sum % 11);
		if (checkDigit === 10) {
			isbn10 += "X";
		} else if (checkDigit < 10) {
			isbn10 += checkDigit;
		} else {
			// 如果校验码不是0-9或X，重新生成
			return generateISBN();
		}

		return isbn10;
	} else {
		// 生成ISBN-13
		let isbn13 = "978"; // 通常ISBN-13以978开头
		for (let i = 0; i < 9; i++) {
			isbn13 += Math.floor(Math.random() * 10); // 生成0-9的随机数字
		}

		// 计算校验码
		let sum = 0;
		let multiplier = 1;
		for (let i = 0; i < 12; i++) {
			sum += parseInt(isbn13[i], 10) * multiplier;
			multiplier = 4 - multiplier; // 切换乘数1和3
		}
		let checkDigit = (10 - (sum % 10)) % 10;
		isbn13 += checkDigit;

		return isbn13;
	}
}

export { generateISBN };
