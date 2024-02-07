import {TypeCheck} from "@/utils/Check.js";
import {ParameterType} from "@/constant/type.js";

/**
 *
 * @param internal
 * @param property
 * @param check
 * @returns {{set: *, get: (function(): *), configurable: boolean}}
 */
const generateProperties = (internal, property, check) => {
   generateProperties_check(internal, property, check);
   return {
      get: () => {
         return internal[property];
      }, set: (val) => {
         check(val);
         internal[property] = val;
      }, configurable: false,
   }
}

const generateProperties_check = (internal, property, check) => {
   TypeCheck.typeCorrect('internal', ParameterType.OBJECT, internal);
   TypeCheck.typeCorrect('property', ParameterType.STRING, property);
   TypeCheck.typeCorrect('check', ParameterType.FUNCTION, check);
}

export {
   generateProperties,
}