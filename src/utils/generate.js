import {ParameterType} from "@/constant/Type.js";
import {TypeCheck} from "@/utils/Check.js";
import {copyMatchingProperties} from "@/utils/index.js";
import {NIcon} from "naive-ui";
import {h} from "vue";


//#region generate property
/**
 *
 * @param internal
 * @param property
 * @param check
 * @returns {{set: *, get: (function(): *), configurable: boolean}}
 */
const generateProperty = (internal, property, check) => {
	generateProperty_check(internal, property, check);
	return {
		get: () => {
			return internal;
		}, set: (val) => {
			check(val);
			internal = val;
		}, configurable: false,
	}
}

const generateProperty_check = (internal, property, check) => {
	// TypeCheck.typeCorrect('internal', ParameterType.OBJECT, internal);
	TypeCheck.typeCorrect('property', ParameterType.STRING, property);
	TypeCheck.typeCorrect('check', ParameterType.FUNCTION, check);
}

export {
	generateProperty,
}
//#endregion


//#region generate to json object
/**
 * menu 路由生成
 * @param name 对应 router 配置里面的 name
 * @returns {{to: {name: string}}}
 */
const gProps = (name) => {
	return {
		to: {
			name: `${name}`
		}
	};
};


export {
	gProps,
}
//#endregion


//#region generate icon
function renderIcon(icon) {
	return () => h(NIcon, null, {default: () => h(icon)})
}

function expandIcon() {
	return h(NIcon, null, {default: () => h(null)})
}

export {
	renderIcon,
	expandIcon,
}
//#endregion

//#region g col item
/**
 * 生成表格头
 * @param t title
 * @param k key
 * @param ext 额外的属性
 */
const gCol = (t, k, ext = undefined) => {
	const res = {
		title: t,
		key: k,
		//#region default

		// 可拖动
		resizable: true,
		// 溢出省略
		ellipsis: {
			tooltip: true
		},
		minWidth: 30,
		maxWidth: 400,
		width: null,
		render: null,
		//#endregion
	}

	copyMatchingProperties(ext, res);

	return res;
}

export {
	gCol
}
//#endregion
