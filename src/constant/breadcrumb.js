//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region home
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const I_HOME = {
	path: "/i",
	label: "工作台"
};
const B_I = [I_HOME];
export { B_I };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region debitHandler
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const DEBIT = {
	path: "/i/debits",
	label: "借阅记录"
};

const DEBIT_ADD = {
	path: "/i/debits/add",
	label: "新增"
};

function DEBIT_CHECK(id) {
	return {
		path: `/i/debits/${id}`,
		label: "详情"
	};
}

const B_DEBIT = [I_HOME, DEBIT];
const B_DEBIT_ADD = [I_HOME, DEBIT, DEBIT_ADD];

function B_DEBIT_CHECK(id) {
	return [I_HOME, DEBIT, DEBIT_CHECK(id)];
}

export { B_DEBIT, B_DEBIT_ADD, B_DEBIT_CHECK };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region book
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const BOOK = {
	path: "/i/books",
	label: "书籍"
};

const BOOK_ADD = {
	path: "/i/books/add",
	label: "新增"
};

function BOOK_CHECK(id) {
	return {
		path: `/i/books/${id}`,
		label: "详情"
	};
}

const B_BOOK = [I_HOME, BOOK];

const B_BOOK_ADD = [I_HOME, BOOK, BOOK_ADD];

function B_BOOK_CHECK(id) {
	return [I_HOME, BOOK, BOOK_CHECK(id)];
}

export { B_BOOK, B_BOOK_ADD, B_BOOK_CHECK };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region book info
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const BOOK_INFO = {
	path: "/i/bookInfos",
	label: "书籍信息"
};

const BOOK_INFO_ADD = {
	path: "/i/bookInfos/add",
	label: "新增"
};

function BOOK_INFO_CHECK(id) {
	return {
		path: `/i/bookInfos/${id}`,
		label: "详情"
	};
}

const B_BOOK_INFO = [I_HOME, BOOK_INFO];
const B_BOOK_INFO_ADD = [I_HOME, BOOK_INFO, BOOK_INFO_ADD];

function B_BOOK_INFO_CHECK(id) {
	return [I_HOME, BOOK_INFO, BOOK_INFO_CHECK(id)];
}

export { B_BOOK_INFO, B_BOOK_INFO_ADD, B_BOOK_INFO_CHECK };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region clc index
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const CLC_INDEX = {
	path: `/i/clcIndexes`,
	label: `分类信息`
};

const B_CLC_INDEX = [I_HOME, CLC_INDEX];

export { B_CLC_INDEX };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region permission
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const PERMISSION = {
	path: `/i/permissions`,
	label: `权限信息`
};

const B_PERMISSION = [I_HOME, PERMISSION];

export { B_PERMISSION };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region route
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const ROUTE = {
	path: `/i/routes`,
	label: `路由信息`
};

const B_ROUTE = [I_HOME, ROUTE];

export { B_ROUTE };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region publisher
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const PUBLISHER_INDEX = {
	path: "/i/publishers",
	label: "出版社"
};

function PUBLISHER_CHECK(id) {
	return {
		path: `/i/publishers/${id}`,
		label: "详情"
	};
}

const PUBLISHER_ADD = {
	path: "/i/publishers/add",
	label: "新增"
};

const B_PUBLISHER_INDEX = [I_HOME, PUBLISHER_INDEX];

function B_PUBLISHER_CHECK(id) {
	return [I_HOME, PUBLISHER_INDEX, PUBLISHER_CHECK(id)];
}

const B_PUBLISHER_ADD = [I_HOME, PUBLISHER_INDEX, PUBLISHER_ADD];

export { B_PUBLISHER_INDEX, B_PUBLISHER_CHECK, B_PUBLISHER_ADD };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region user
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const USER_INDEX = {
	path: "/i/users",
	label: "用户"
};

const USER_ADD = {
	path: "/i/users/add",
	label: "新增"
};

function USER_CHECK(id) {
	return {
		path: `/i/users/${id}`,
		label: "详情"
	};
}

const B_USER_INDEX = [I_HOME, USER_INDEX];

const B_USER_ADD = [I_HOME, USER_INDEX, USER_ADD];

function B_USER_CHECK(id) {
	return [I_HOME, USER_INDEX, USER_CHECK(id)];
}

export { B_USER_INDEX, B_USER_ADD, B_USER_CHECK };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region role
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const ROLE_INDEX = {
	path: "/i/users/roles",
	label: "角色"
};

function ROLE_CHECK(id) {
	return {
		path: `/i/users/roles/${id}`,
		label: "详情"
	};
}

const B_ROLE_INDEX = [I_HOME, USER_INDEX, ROLE_INDEX];

function B_ROLE_CHECK(id) {
	return [I_HOME, USER_INDEX, ROLE_INDEX, ROLE_CHECK(id)];
}

export { B_ROLE_INDEX, B_ROLE_CHECK };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region log
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const LOG_INDEX = {
	path: "/i/logs",
	label: "日志"
};

function LOG_CHECK(id) {
	return {
		path: `/i/logs/${id}`,
		label: "详情"
	};
}

const B_LOG_INDEX = [I_HOME, LOG_INDEX];

function B_LOG_CHECK(id) {
	return [I_HOME, LOG_INDEX, LOG_CHECK(id)];
}

export { B_LOG_INDEX, B_LOG_CHECK };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region my
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const MY = {
	path: "/i/my",
	label: "我的"
};

const B_MY = [I_HOME, MY];
export { B_MY };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion
