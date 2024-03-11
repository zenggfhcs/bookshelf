const sleep = (ms = 777) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export {sleep};