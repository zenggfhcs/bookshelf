//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion
const REG_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const REG_PHONE_NUMBER = /^\d{11}$/;

const REG_BASE64 = /\/?([\da-zA-Z]+[\/+]+)*[\da-zA-Z]+([+=]{1,3}|\/)?/;

export { REG_EMAIL,REG_PHONE_NUMBER, REG_BASE64 };
