import {Header} from "@/api/Header.js";
import axios from "axios";

const PRE_DEFINED_AXIOS = axios.create({

	// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
	// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
	baseURL: 'http://localhost:9090/', // `${BASE_URL}`,

	// `transformRequest` 允许在向服务器发送前，修改请求数据
	// 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
	// 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
	// 你可以修改请求头。
	transformRequest: [function (data, headers) {
		// 对发送的 data 进行任意转换处理
		return JSON.stringify(data);
	}],
	// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
	transformResponse: [function (data) {
		// 对接收的 data 进行任意转换处理
		console.log(data);
		return JSON.parse(data);
	}],

	// 自定义请求头
	headers: {
		"Content-Type": "application/json",
		"token": ""
	},

	// `timeout` 指定请求超时的毫秒数。
	// 如果请求时间超过 `timeout` 的值，则请求会被中断
	timeout: 5 * 1000, // 默认值是 `0` (永不超时)

	// `withCredentials` 表示跨域请求时是否需要使用凭证
	withCredentials: false, // default

	// `responseType` 表示浏览器将要响应的数据类型
	// 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
	// 浏览器专属：'blob'
	responseType: 'json', // 默认值

	// `responseEncoding` 表示用于解码响应的编码 (Node.js 专属)
	// 注意：忽略 `responseType` 的值为 'stream'，或者是客户端请求
	// Note: Ignored for `responseType` of 'stream' or client-side requests
	responseEncoding: 'utf8', // 默认值

	// `xsrfCookieName` 是 xsrf token 的值，被用作 cookie 的名称
	xsrfCookieName: 'XSRF-TOKEN', // 默认值

	// `xsrfHeaderName` 是带有 xsrf token 值的http 请求头名称
	xsrfHeaderName: 'X-XSRF-TOKEN', // 默认值

	// `onUploadProgress` 允许为上传处理进度事件
	// 浏览器专属
	onUploadProgress: function (progressEvent) {
		// 处理原生进度事件
	},

	// `onDownloadProgress` 允许为下载处理进度事件
	// 浏览器专属
	onDownloadProgress: function (progressEvent) {
		// 处理原生进度事件
	},

	// `maxContentLength` 定义了node.js中允许的HTTP响应内容的最大字节数
	maxContentLength: 2000,

	// `maxBodyLength`（仅Node）定义允许的http请求内容的最大字节数
	maxBodyLength: 2000,

	// `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
	// 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
	// 则promise 将会 resolved，否则是 rejected。
	validateStatus: function (status) {
		return status >= 200 && status < 300; // 默认值
	},
});

//#region interceptor
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
// 添加请求拦截器
PRE_DEFINED_AXIOS.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	config.headers[Header.TOKEN] = localStorage.getItem(Header.TOKEN);
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});


// 添加响应拦截器
PRE_DEFINED_AXIOS.interceptors.response.use(function (response) {
	// 2xx 范围内的状态码都会触发该函数。
	// 对响应数据做点什么
	return response;
}, function (error) {
	// 超出 2xx 范围的状态码都会触发该函数。
	// 对响应错误做点什么
	return Promise.reject(error);
});
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

export {
	PRE_DEFINED_AXIOS
}