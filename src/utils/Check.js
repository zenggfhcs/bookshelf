import {ParameterType} from "@/constant/Type.js";
import {BoolTools} from "@/utils/BoolTools.js";
import {Exception} from "@/utils/exception.js";

/**
 * type check
 */
export class TypeCheck {
	/**
	 * 检查 val 是不是 布尔值
	 * @param attribute 要接收 val 的变量名
	 * @param val 被检查的变量
	 * @param fun 额外的判断函数
	 */
	static isBoolean(attribute, val, fun) {
		if (BoolTools.isBoolean(val, fun)) {
			return;
		}
		Exception.typeError(attribute, ParameterType.BOOLEAN, val);
	}

	/**
	 * 检查 val 是不是 浮点数
	 * @param attribute 要接收 val 的变量名
	 * @param val 被检查的变量
	 * @param fun 额外的判断函数
	 */
	static isFloatNumber(attribute, val, fun) {
		if (BoolTools.isFloat(val, fun)) {
			return;
		}
		Exception.typeError(attribute, 'float number', val);
	}

	/**
	 * 检查 val 是不是 正整数
	 * @param attribute 要接收 val 的变量名
	 * @param val 被检查的变量
	 * @param fun 额外的判断函数
	 */
	static isInteger(attribute, val, fun) {
		if (BoolTools.Integer(val, fun)) {
			return;
		}
		Exception.typeError(attribute, 'integer', val);
	}

	/**
	 * 检查 val 的类型是不是 type
	 * @param attribute 要接收 val 的变量名
	 * @param type 类型
	 * @param val 被检查的变量
	 */
	static typeCorrect(attribute, type, val) {
		if (typeof type === 'string') {
			if (BoolTools.isType(val, type)) {
				return;
			}
			Exception.typeError(attribute, type, val);
		} else {
			if (BoolTools.isInstanceOf(val, type)) {
				return;
			}
			Exception.typeError(attribute, type.name, val);
		}
	}
}
