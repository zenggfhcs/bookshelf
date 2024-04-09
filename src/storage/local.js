//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

//#endregion

function put(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

// todo 可能存在未知的格式解析问题
function get(key) {
	const _v = localStorage.getItem(key);
	try {
		return JSON.parse(_v);
	} catch (e) {
		return null;
	}
}

function remove(key) {
	localStorage.removeItem(key);
}

export const local = {
	put,
	get,
	remove,
};
