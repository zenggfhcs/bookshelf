import { ParameterType } from "@/constant/Type.js";
import { TypeCheck } from "@/utils/Check.js";
import { shuffleArray } from "@/utils/index.js";
import { randomInt } from "@/utils/random.js";

//#region generate property
/**
 *
 * @param internal
 * @param property
 * @param check
 * @returns {{set: *, get: (function(): *), configurable: boolean}}
 */
function generateProperty(internal, property, check) {
	generateProperty_check(internal, property, check);
	return {
		get: () => {
			return internal;
		},
		set: (val) => {
			check(val);
			internal = val;
		},
		configurable: false,
	};
}

function generateProperty_check(internal, property, check) {
	// TypeCheck.typeCorrect('internal', ParameterType.OBJECT, internal);
	TypeCheck.typeCorrect("property", ParameterType.STRING, property);
	TypeCheck.typeCorrect("check", ParameterType.FUNCTION, check);
}

export { generateProperty };
//#endregion

//#region generate to json object
/**
 * menu 路由生成
 * @param name 对应 router 配置里面的 name
 * @returns {{to: {name: string}}}
 */
function gProps(name) {
	return {
		to: {
			name: `${name}`,
		},
	};
}

export { gProps };
//#endregion

/**
 * 生成验证码
 * @returns {string}
 */
function gCode() {
	let code = "";
	const l = randomInt(randomInt(3)) + 7;
	while (code.length < l) {
		code += Math.ceil(Math.random() * 1000).toString(16);
	}
	code = shuffleArray(code.split("")).join("");
	return code.substring(0, l);
}

export { gCode };
