//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


//#region home
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const I_HOME = {
	path: "/i",
	label: "工作台",
}
const B_I = [
	I_HOME
]
export {
	B_I,
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region book
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const BOOK = {
	path: "/i/books",
	label: "书籍",
}

const BOOK_ADD = {
	path: "/i/books/add",
	label: "新增",
}

const BOOK_CHECK = (id) => ({
	path: `/i/books/${id}`,
	label: "详情",
})

const B_BOOK = [
	I_HOME,
	BOOK,
]

const B_BOOK_ADD = [
	I_HOME,
	BOOK,
	BOOK_ADD,
]

const B_BOOK_CHECK = (id) => [
	I_HOME,
	BOOK,
	BOOK_CHECK(id),
]

export {
	B_BOOK,
	B_BOOK_ADD,
	B_BOOK_CHECK,
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region book info
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const BOOK_INFO = {
	path: "/i/bookInfos",
	label: "书籍信息",
}

const BOOK_INFO_ADD = {
	path: "/i/bookInfos/add",
	label: "新增",
}

const BOOK_INFO_CHECK = (id) => ({
	path: `/i/bookInfos/${id}`,
	label: "详情",
})

const B_BOOK_INFO = [
	I_HOME,
	BOOK_INFO,
]
const B_BOOK_INFO_ADD = [
	I_HOME,
	BOOK_INFO,
	BOOK_INFO_ADD,
]
const B_BOOK_INFO_CHECK = (id) => [
	I_HOME,
	BOOK_INFO,
	BOOK_INFO_CHECK(id),
]

export {
	B_BOOK_INFO,
	B_BOOK_INFO_ADD,
	B_BOOK_INFO_CHECK,
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region publisher
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const PUBLISHER_INDEX = {
	path: "/i/publishers",
	label: "出版社",
}

const PUBLISHER_CHECK = (id) => ({
	path: `/i/publishers/${id}`,
	label: "详情"
})

const PUBLISHER_ADD = {
	path: "/i/publishers/add",
	label: "新增"
}

const B_PUBLISHER_INDEX = [
	I_HOME,
	PUBLISHER_INDEX,
]

const B_PUBLISHER_CHECK = (id) => [
	I_HOME,
	PUBLISHER_INDEX,
	PUBLISHER_CHECK(id),
]

const B_PUBLISHER_ADD = [
	I_HOME,
	PUBLISHER_INDEX,
	PUBLISHER_ADD,
]

export {
	B_PUBLISHER_INDEX,
	B_PUBLISHER_CHECK,
	B_PUBLISHER_ADD,
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region user
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const USER_INDEX = {
	path: "/i/users",
	label: "用户",
}

const USER_ADD = {
	path: "/i/users/add",
	label: "新增",
}

const USER_CHECK = (id) => ({
	path: `/i/users/${id}`,
	label: "详情",
})

const B_USER_INDEX = [
	I_HOME,
	USER_INDEX,
]

const B_USER_ADD = [
	I_HOME,
	USER_INDEX,
	USER_ADD,
]

const B_USER_CHECK = (id) => [
	I_HOME,
	USER_INDEX,
	USER_CHECK(id),
]

export {
	B_USER_INDEX,
	B_USER_ADD,
	B_USER_CHECK,
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region log
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const LOG_INDEX = {
	path: "/i/logs",
	label: "日志",
}

const LOG_CHECK = (id) => ({
	path: `/i/logs/${id}`,
	label: "详情",
})

const B_LOG_INDEX = [
	I_HOME,
	LOG_INDEX,
]

const B_LOG_CHECK = (id) => [
	I_HOME,
	LOG_INDEX,
	LOG_CHECK(id),
]

export {
	B_LOG_INDEX,
	B_LOG_CHECK,
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion