//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

const put = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
}

const get = (key) => {
	const _v = localStorage.getItem(key);
	return _v ? JSON.parse(_v) : "";
}

const remove = (key) => {
	localStorage.removeItem(key);
}

export const local = {
	put,
	get,
	remove,
}