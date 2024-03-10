const Validator = {}

export {
	Validator
}


const validate = (message, messageContent, form, then) => {
	form?.value?.validate((errors) => {
		if (!errors) {
			then(this.args);
		} else {
			message?.error(messageContent);
		}
	});
};

export {
	validate
}
