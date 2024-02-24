import {TypeCheck} from "@/utils/Check.js";
import {ParameterType} from "@/constant/Type.js";


/* ============================ property ============================ */
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
/* ============================ property ============================ */


/* ============================ to ============================ */
/**
 * menu 路由生成
 * @param name 对应 router 配置里面的 name
 * @returns {{to: {name: string, params: {lang: string}}}}
 */
const generateProps = (name) => {
   return {
      to: {
         name: `${name}`
      }
   };
};

export {
   generateProps,
}
/* ============================ to ============================ */