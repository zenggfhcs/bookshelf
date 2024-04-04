//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

import { messageOptions } from "@/constant/options.js";

const inputValidator = {
	onlyAllowNumber: (s) => !s || /^\d+$/.test(s),
	noSideSpace: (s) => !s.startsWith(" ") && !s.endsWith(" "),
	allowFloatNumber: (s) => !s || /^\d*\.?\d{0,2}$/.test(s),
};

export { inputValidator };

const formValidator = (form, message, then) => {
	form?.value?.validate((errors) => {
		if (errors) {
			message.error("表单没有通过验证，请检查表单项", messageOptions);
			return;
		}
		then();
	});
};

export { formValidator };
