import {customRef} from "vue"

/**
 * 带延迟更新的 ref，对于变量可以实现，对于对象不行
 * @param value 更新的值
 * @param delay 延迟时间（毫秒值）
 * @returns debounce ref
 */
export function debounceRef(value, delay = 666) {
	let timer;
	return customRef((track, trigger) => {
		return {
			get() {
				track();
				return value;
			},
			set(val) {
				clearTimeout(timer);
				timer = setTimeout(() => {
					value = val;
					trigger();
				}, delay);
			}
		};
	});
}

/**
 * 防抖
 * @param fun 需要执行的函数
 * @param delay 防抖时间
 * @returns {(function(): void)|*}
 */
export function debounce(fun, delay = 777) {
	let running = false;                                  // 默认 false，表示未在运行
	// console.log(running);
	return (args) => {                                       // 返回实际函数
		if (running) {                                              // 运行中
			return;                                                  // 阻止运行
		}
		running = true;                                             // 设置 true，表示运行中
		setTimeout(() => {
			running = false;
		}, delay);  // 设置延时，经过时长 delay 后，默认运行结束，允许运行
		fun(args);                                                  // 运行
	};
}
