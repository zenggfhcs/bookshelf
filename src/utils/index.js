/**
 * 打乱数组 array
 * @param array
 * @returns {*} 打乱后的数组
 */
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

/**
 * 同名属性复制
 * @param source 复制来源
 * @param target 复制目标
 */
function copyMatchingProperties(source, target) {
	for (const key in target) {
		console.log(key);
		target[key] = source?.[key];
	}
}

export {
	copyMatchingProperties
}
