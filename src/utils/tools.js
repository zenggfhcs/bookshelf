/**
 * bool 聚合类
 */
export class BoolHelper {

   static isFunction(val, fun = undefined) {
      return this.isType(val, Type.Function) && this.f(fun);
   }

   /**
    * 判断 val 是不是布尔值
    * @param val
    * @param fun 额外的判断
    * @returns {boolean}
    */
   static isBoolean(val, fun) {
      return this.isType(val, Type.Boolean) && this.f(fun);
   }

   /**
    * 判断 val 是不是正整数
    * @param val
    * @param fun 额外的判断
    * @returns {boolean}
    */
   static isPositiveInteger(val, fun) {
      return Number.isInteger(val) && val > 0 && this.f(fun);
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

export class Exception {
   static typeError(attribute, type, val) {
      throw new Error(`属性 ${attribute} 应当是一个 ${type}；而你的赋值为：${val}`);
   }
}

export class Check {

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
      Exception.typeError(attribute, Type.Boolean, val);
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

/**
 * 类型
 */
export class Type {
   /**
    * number
    * @returns {"number"}
    * @constructor
    */
   static get Number() {
      return typeof 0;
   }

   /**
    * string
    * @returns {"string"}
    * @constructor
    */
   static get String() {
      return typeof ''
   };

   /**
    * boolean
    * @returns {"boolean"}
    * @constructor
    */
   static get Boolean() {
      return typeof true;
   }

   /**
    * function
    * @returns {"function"}
    * @constructor
    */
   static get Function() {
      return 'function'; // typeof
   }
}