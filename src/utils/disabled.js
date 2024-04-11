const dateDisabled = (ts) => {
	return ts > Date.now();
};

export { dateDisabled };