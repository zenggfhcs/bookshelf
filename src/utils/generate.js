import {TypeCheck} from "@/utils/Check.js";
import {ParameterType} from "@/constant/Type.js";
import {h} from "vue";
import {NIcon} from "naive-ui";


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
//#endregion

//#region generate route item
const generateRoute = (c, n, p, ch = undefined, r = undefined) => {
   return {
      component: c,
      name: n,
      path: p,
      children: ch,
      redirect: r === undefined ? ch?.[0] : r,
      hidden: true,
      props: true
   }
}

export {
   generateRoute
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
   expandIcon
}
//#endregion

//#region g col item
const gCol = (t, k, ext) => {
   const res = {
      title: t,
      key: k,
      //#region default
      // 可拖动
      resizable: true,
      // 溢出省略
      ellipsis: true,
      minWidth: 50,
      //#endregion
   }
   for (const prop in ext) {
      // console.log(prop)
      res[prop] = ext[prop];
   }
   return res;
}

export {
   gCol
}
//#endregion
