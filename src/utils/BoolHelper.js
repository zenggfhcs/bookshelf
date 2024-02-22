import {ParameterType} from "@/constant/type.js";

/**
 * bool 聚合类
 */
export class BoolHelper {

   static isFunction(val, fun = undefined) {
      return this.isType(val, ParameterType.FUNCTION) && this.f(fun);
   }

   /**
    * 判断 val 是不是布尔值
    * @param val
    * @param fun 额外的判断
    * @returns {boolean}
    */
   static isBoolean(val, fun) {
      return this.isType(val, ParameterType.BOOLEAN) && this.f(fun);
   }

   /**
    * 判断 val 是不是正整数
    * @param val
    * @param fun 额外的判断
    * @returns {boolean}
    */
   static Integer(val, fun) {
      return Number.isInteger(val) && this.f(fun);
   }

   /**
    * 判断 val 是不是浮点数
    * @param val
    * @param fun 额外的判断
    * @returns {boolean}
    */
   static isFloat(val, fun) {
      return val === +val
         // && val !== (val | 0)
         && this.f(fun);
   }

   /**
    * 判断 val 是不是 Class 的实例
    * @param val
    * @param Class
    * @returns {boolean}
    */
   static isInstanceOf(val, Class) {
      return val instanceof Class;
   }

   /**
    * 判断 val 的类型是不是 Type
    * @param val
    * @param Type
    * @returns {boolean}
    */
   static isType(val, Type) {
      return typeof val === Type;
   }

   static f(fun) {
      return fun === undefined || fun();
   }

}



