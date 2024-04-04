//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

const put = (key, value) => {
	sessionStorage.setItem(key, JSON.stringify(value));
};

const get = (key) => {
	const _v = sessionStorage.getItem(key);
	return _v ? JSON.parse(_v) : "";
};

const remove = (key) => {
	sessionStorage.removeItem(key);
};

export const session = {
	put,
	get,
	remove,
};
