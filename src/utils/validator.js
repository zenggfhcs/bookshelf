//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

const formValidator = (formRef, message, messageContent, then) => {
	formRef?.value?.validate((errors) => {
		if (errors) {
			message?.error(messageContent);
			return;
		}
		then();
	});
};

export {
	formValidator
}

const inputValidator = {
	onlyAllowNumber: (s) => !s || /^\d+$/.test(s),
	noSideSpace: (s) => !s.startsWith(' ') && !s.endsWith(' '),
}

export {
	inputValidator
}