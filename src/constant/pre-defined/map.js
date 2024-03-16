//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

import BiMap from "@/model/BiMap.js";

const g = (l, v, map = undefined) => {
	if (map) {
		map.set(l, v);
	}
	return {
		label: l,
		value: v,
	}
};

//#region log type
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const TYPE_MAP = new BiMap();

const select = g("查询", "select", TYPE_MAP);
const update = g("修改", "update", TYPE_MAP);
const create = g("新增", "create", TYPE_MAP);
const remove = g("删除", "delete", TYPE_MAP);

const LOG_PRE_DEFINED_TYPE = [
	select,
	update,
	create,
	remove,
]

export {
	LOG_PRE_DEFINED_TYPE,
	TYPE_MAP,
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region log service name
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const SERVICE_NAME_MAP = new BiMap();

const publisher = g("出版社", "Publisher", SERVICE_NAME_MAP);
const user = g("用户", "User", SERVICE_NAME_MAP);
const debit = g("借阅记录", "Debit", SERVICE_NAME_MAP);
const bookInfo = g("书籍信息", "BookInfo", SERVICE_NAME_MAP);
const book = g("书籍", "Book", SERVICE_NAME_MAP);

const LOG_PRE_DEFINED_SERVICE_NAME = [
	publisher,
	debit,
	user,
	bookInfo,
	book,
]


export {
	SERVICE_NAME_MAP,
	LOG_PRE_DEFINED_SERVICE_NAME,
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


//#region role map
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const ROLE_MAP = new BiMap();

const root = g("超级管理员", "root", ROLE_MAP);
const admin = g("管理员", "admin", ROLE_MAP);
const common = g("普通用户", "common", ROLE_MAP);
const limit = g("受限用户", "limit", ROLE_MAP);

const ROLE_PRE_DEFINED = [
	root,
	admin,
	common,
	limit
]

export {
	ROLE_MAP,
	ROLE_PRE_DEFINED,
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

/*
 可以通过 label 或者 value 查询到对应的
 可以返回 {label, value}
 */


/* ============================ code massage map ============================ */
const data = [
	g('错误请求', 400),
	g('未授权，请重新登录', 401),
	g('拒绝访问', 403),
	g('请求错误,未找到该资源', 404),
	g('请求方法未允许', 405),
	g('请求超时', 408),
	g('服务器端出错', 500),
	g('网络未实现', 501),
	g('网络错误', 502),
	g('服务不可用', 503),
	g('网络超时', 504),
	g('http版本不支持该请求', 505),
];

/* ============================ code massage map ============================ */
