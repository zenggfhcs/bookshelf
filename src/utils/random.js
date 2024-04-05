/**
 * 返回一个 [1, m] 之间的整数
 * @param m max
 * @returns {number}
 */
function randomInt(m) {
	return Math.floor(Math.random() * m + 1);
}

export { randomInt };
