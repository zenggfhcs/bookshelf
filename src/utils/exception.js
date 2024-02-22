/**
 * 异常
 */
export class Exception {
   static typeError(attribute, type, val) {
      throw new Error(`属性 ${attribute} 应当是一个 ${type}；而你的赋值为：'${val}'`);
   }
}