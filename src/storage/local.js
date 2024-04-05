//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

function put(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function get(key) {
	const _v = localStorage.getItem(key);
	return _v && _v !== "undefined" ? JSON.parse(_v) : "";
}

function remove(key) {
	localStorage.removeItem(key);
}

export const local = {
	put,
	get,
	remove,
};
