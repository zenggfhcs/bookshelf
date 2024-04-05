//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

import BiMap from "@/model/BiMap.js";

function g(l, v, map = undefined) {
	if (map) {
		map.set(l, v);
	}
	return {
		label: l,
		value: v,
	};
}

//#region log type
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const LOG_TYPE_MAP = new BiMap();

const select = g("查询", "select", LOG_TYPE_MAP);
const update = g("修改", "update", LOG_TYPE_MAP);
const create = g("新增", "create", LOG_TYPE_MAP);
const remove = g("删除", "delete", LOG_TYPE_MAP);

const LOG_PRE_DEFINED_TYPE = [select, update, create, remove];

export { LOG_PRE_DEFINED_TYPE, LOG_TYPE_MAP };
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

const LOG_PRE_DEFINED_SERVICE_NAME = [publisher, debit, user, bookInfo, book];

export { SERVICE_NAME_MAP, LOG_PRE_DEFINED_SERVICE_NAME };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region role map
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const ROLE_MAP = new BiMap();

const root = g("超级管理员", "root", ROLE_MAP);
const admin = g("管理员", "admin", ROLE_MAP);
const common = g("普通用户", "common", ROLE_MAP);
const limit = g("受限用户", "limited", ROLE_MAP);

const ROLE_PRE_DEFINED = [root, admin, common, limit];

export { ROLE_MAP, ROLE_PRE_DEFINED };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region 语种 type
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const LANG_TYPE_MAP = new BiMap();
const en = g("英文", "en", LANG_TYPE_MAP);
const zh = g("中文", "zh", LANG_TYPE_MAP);
const es = g("西班牙文", "es", LANG_TYPE_MAP);
const fr = g("法文", "fr", LANG_TYPE_MAP);
const de = g("德文", "de", LANG_TYPE_MAP);
const ru = g("俄文", "ru", LANG_TYPE_MAP);
const ja = g("日文", "ja", LANG_TYPE_MAP);
const ko = g("韩文", "ko", LANG_TYPE_MAP);
const it = g("意大利文", "it", LANG_TYPE_MAP);
const pt = g("葡萄牙文", "pt", LANG_TYPE_MAP);
const ar = g("阿拉伯文", "ar", LANG_TYPE_MAP);
const el = g("希腊文", "el", LANG_TYPE_MAP);
const nl = g("荷兰文", "nl", LANG_TYPE_MAP);
const sv = g("瑞典文", "sv", LANG_TYPE_MAP);
const no = g("挪威文", "no", LANG_TYPE_MAP);
const da = g("丹麦文", "da", LANG_TYPE_MAP);
const fi = g("芬兰文", "fi", LANG_TYPE_MAP);
const tr = g("土耳其文", "tr", LANG_TYPE_MAP);
const pl = g("波兰文", "pl", LANG_TYPE_MAP);
const hu = g("匈牙利文", "hu", LANG_TYPE_MAP);

const LANG_TYPE_PRE_DEFINED = [
	en,
	zh,
	es,
	fr,
	de,
	ru,
	ja,
	ko,
	it,
	pt,
	ar,
	el,
	nl,
	sv,
	no,
	da,
	fi,
	tr,
	pl,
	hu,
];

export { LANG_TYPE_MAP, LANG_TYPE_PRE_DEFINED };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

/*
 可以通过 label 或者 value 查询到对应的
 可以返回 {label, value}
 */

/* ============================ code massage map ============================ */

// todo 移到 api 请求失败部分
const data = [
	g("错误请求", 400),
	g("未授权，请重新登录", 401),
	g("拒绝访问", 403),
	g("请求错误,未找到该资源", 404),
	g("请求方法未允许", 405),
	g("请求超时", 408),
	g("服务器端出错", 500),
	g("网络未实现", 501),
	g("网络错误", 502),
	g("服务不可用", 503),
	g("网络超时", 504),
	g("http版本不支持该请求", 505),
];

/* ============================ code massage map ============================ */
