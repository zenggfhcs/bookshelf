//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


const inputValidator = {
	onlyAllowNumber: (s) => !s || /^\d+$/.test(s),
	noSideSpace: (s) => !s.startsWith(' ') && !s.endsWith(' '),
	allowFloatNumber: (s) => !s || /^\d*\.?\d{0,2}$/.test(s),
}

export {
	inputValidator
}