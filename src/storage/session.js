//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

function put(key, value) {
	sessionStorage.setItem(key, JSON.stringify(value));
}

function get(key) {
	const _v = sessionStorage.getItem(key);
	return _v ? JSON.parse(_v) : "";
}

function remove(key) {
	sessionStorage.removeItem(key);
}

export const session = {
	put,
	get,
	remove,
};
