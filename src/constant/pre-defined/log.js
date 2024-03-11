const typeMap = {
	select: "info",
	update: "warning",
	delete: "error",
	create: "success",
}

const transType = value => typeMap[value];

const getTagTypeByElapsedTime = (elapsedTime) => {
	if (elapsedTime > 1000) {
		return "error";
	}
	if (elapsedTime > 50) {
		return "warning";
	}
	return "info";
}

export {
	transType,
	getTagTypeByElapsedTime
}