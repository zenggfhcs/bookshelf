//#region home
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const HOME_INDEX = {
	path: "/i",
	label: "工作台",
}
const BREADCRUMB_I_INDEX = [
	HOME_INDEX
]
export {
	BREADCRUMB_I_INDEX,
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


//#region publisher
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const PUBLISHER_INDEX = {
	path: "/i/publishers",
	label: "出版社",
}

const PUBLISHER_CHECK = {
	path: "/i/publishers/check",
	label: "详情"
}

const PUBLISHER_ADD = {
	path: "/i/publishers/add",
	label: "新增"
}
const BREADCRUMB_PUBLISHER_INDEX = [
	HOME_INDEX,
	PUBLISHER_INDEX,
]
const BREADCRUMB_PUBLISHER_CHECK = [
	HOME_INDEX,
	PUBLISHER_INDEX,
	PUBLISHER_CHECK,
]
const BREADCRUMB_PUBLISHER_ADD = [
	HOME_INDEX,
	PUBLISHER_INDEX,
	PUBLISHER_ADD,
]
export {
	BREADCRUMB_PUBLISHER_INDEX,
	BREADCRUMB_PUBLISHER_CHECK,
	BREADCRUMB_PUBLISHER_ADD,
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

