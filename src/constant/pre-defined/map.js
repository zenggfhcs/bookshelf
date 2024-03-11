//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

import DefaultMap from "@/model/DefaultMap.js";

const labelMap = new DefaultMap();

const valueMap = new DefaultMap();

const g = (v, l) => {
	if (labelMap.has(l) || valueMap.has(v))
		throw new Error(`已经存在 label：${l} 或者 value：${v}`);
	labelMap.set(l, v);
	valueMap.set(v, l);
	return {
		label: l,
		value: v,
	}
};

const mapOperations = {
	getByLabel: (l) => labelMap.get(l),
	getByValue: (v) => valueMap.get(v),
};

const select = g("select", "查询");
const update = g("update", "修改");
const create = g("create", "新增");
const remove = g("delete", "删除");

const publisher = g("Publisher", "出版社");
const debit = g("Debit", "借阅记录");
const user = g("User", "用户");
const bookInfo = g("BookInfo", "书籍信息");
const book = g("Book", "书籍");


const logPDM = {
	select,
	update,
	create,
	remove,
	/* -- -- */
	publisher,
	debit,
	user,
	bookInfo,
	book,
}

export {
	logPDM,
}

export {
	mapOperations,
}

/*
 可以通过 label 或者 value 查询到对应的
 可以返回 {label, value}
 */


/* ============================ code massage map ============================ */
const data = [
	g(400, '错误请求'),
	g(401, '未授权，请重新登录'),
	g(403, '拒绝访问'),
	g(404, '请求错误,未找到该资源'),
	g(405, '请求方法未允许'),
	g(408, '请求超时'),
	g(500, '服务器端出错'),
	g(501, '网络未实现'),
	g(502, '网络错误'),
	g(503, '服务不可用'),
	g(504, '网络超时'),
	g(505, 'http版本不支持该请求'),
];

/* ============================ code massage map ============================ */
