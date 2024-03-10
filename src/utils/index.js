function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1)); // 生成一个随机索引，范围是 [0, i]
		// 交换当前元素和随机索引处的元素
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export {
	shuffleArray
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export {
	sleep
}


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

export {
	timestampToDateTimeString
}


