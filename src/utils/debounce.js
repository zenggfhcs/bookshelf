/**
 * 防抖
 * @param fun 需要执行的函数
 * @param delay 防抖时间
 * @returns {(function(): void)|*}
 */
const debounce = (fun, delay = 777) => {
	let running = false;
	return (args) => {
		if (running) {
			return;
		}
		running = true;
		setTimeout(() => {
			running = false;
		}, delay);
		fun(args);
	};
};

export { debounce };
