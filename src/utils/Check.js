import {BoolHelper} from "@/utils/BoolHelper.js";
import {Exception} from "@/utils/exception.js";
import {ParameterType} from "@/constant/type.js";

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
      if (BoolHelper.isBoolean(val, fun)) {
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
      if (BoolHelper.isFloat(val, fun)) {
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
   static isPositiveInteger(attribute, val, fun) {
      if (BoolHelper.isPositiveInteger(val, fun)) {
         return;
      }
      Exception.typeError(attribute, 'positive integer', val);
   }

   /**
    * 检查 typeof val 是不是 type
    * @param attribute 要接收 val 的变量名
    * @param type 类型
    * @param val 被检查的变量
    */
   static typeCorrect(attribute, type, val) {
      if (BoolHelper.isType(val, type)) {
         return;
      }
      Exception.typeError(attribute, type, val);
   }

   /**
    * 检查 val 是不是 Class 的实例
    * @param attribute 要接收 val 的变量名
    * @param Class 类
    * @param val 被检查的变量
    */
   static classCorrect(attribute, Class, val) {
      if (BoolHelper.isInstanceOf(val, Class)) {
         return;
      }
      Exception.typeError(attribute, Class.name, val);
   }
}