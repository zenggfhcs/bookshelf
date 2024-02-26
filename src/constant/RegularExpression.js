/**
 * user id 规则
 * @type {RegExp}
 */
const REG_USER_ID = /^\d{7,19}$/;

const REG_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export {
   REG_USER_ID,
   REG_EMAIL
}