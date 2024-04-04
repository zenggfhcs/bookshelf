const LOG_TYPE_MAP = {
	select: "info",
	update: "warning",
	delete: "error",
	create: "success",
};

export { LOG_TYPE_MAP };

const elapsedTimeLevel = [
	{
		value: 1000,
		type: "warning",
	},
	{
		value: 50,
		type: "info",
	},
	{
		value: 0,
		type: "success",
	},
];

export { elapsedTimeLevel };
