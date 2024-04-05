/**
 * 打乱数组
 * @param array
 * @returns {*} 打乱后的数组
 */
export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1)); // 生成一个随机索引，范围是 [0, i]
		// 交换当前元素和随机索引处的元素
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

/**
 * 同名属性复制
 * @param source 复制来源
 * @param target 复制目标
 */
export function copyMatchingProperties(source, target) {
	for (const key in target) {
		target[key] = source?.[key];
	}
}

export function subProperty(v1, v2) {
	return v1 === v2 ? null : v2;
}

/**
 * 消消乐，将 target 里面与 source 同名的属性中同值的设为 null
 * @param source
 * @param target
 * @returns {{}}
 */
export function subMatchingProperties(source, target) {
	const _res = {};
	for (const key in target) {
		_res[key] = subProperty(source[key], target[key]);
	}
	return _res;
}

/**
 * if else 简写
 * @param array 要求是 [([bool, fuc],)*[true, fuc]]
 */
export function traverse(array) {
	for (let i = 0; i < array.length; i++) {
		const _item = array[i];
		if (_item[0]) {
			_item[1]();
			return;
		}
	}
}

/**
 * 格式化字符串
 * @param dateString
 * @param formatString
 */
export function transDateString(dateString, formatString) {
	const dateReg =
		/^(\d+)(([-/])(\d+))?(([-/])(\d+))?(([ T])(\d+))?(([:])(\d+))?(([:])(\d+(\.\d+)?))?$/;
	const _execArray = dateReg.exec(dateString);
	const _valueArray = [
		_execArray?.[1],
		_execArray?.[3],
		_execArray?.[4],
		_execArray?.[6],
		_execArray?.[7],
		_execArray?.[9],
		_execArray?.[10],
		_execArray?.[12],
		_execArray?.[13],
		_execArray?.[15],
		_execArray?.[16],
	];
}
