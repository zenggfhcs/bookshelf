//#region user data
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

const USER_TAG_TYPE_MAP = {
	"root": "error",
	"admin": "warning",
	"common": "success",
	"limit": "default",
}

export {
	USER_TAG_TYPE_MAP
}

const ageLevel = [
	{
		value: 45,
		type: "warning",
	},
	{
		value: 18,
		type: "success",
	},
	{
		value: 0,
		type: "error",
	}
]

export {
	ageLevel
}

const GENDER_MAP = [
	"女",
	"男",
	"未知"
]

export {
	GENDER_MAP
}

const GENDER_TAG_TYPE_MAP = [
	"error",
	"success",
	"default",
]

export {GENDER_TAG_TYPE_MAP}