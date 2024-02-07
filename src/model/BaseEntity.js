import {ParameterType} from "@/constant/type.js";
import {TypeCheck} from "@/utils/Check.js";
import {generateProperties} from "@/utils/generate.js";

export class BaseEntity {
   /**
    * 创建人
    */
   #createBy;
   /**
    * 更新人
    */
   #updateBy;
   /**
    * 更新时间
    */
   #updateTime;
   /**
    * 创建时间
    */
   #createTime;
   /**
    * 备注
    */
   #remark;

   constructor() {
      this.#init();
   }

   #init() {
      Object.defineProperties(this, {
         createBy: generateProperties(
            this.#createBy,
            'createBy',
            (val) => {
               TypeCheck.typeCorrect("createBy", ParameterType.NUMBER, val);
               TypeCheck.isPositiveInteger("createBy", val);
            }),
         updateBy: generateProperties(
            this.#updateBy,
            'updateBy',
            (val) => {
               TypeCheck.typeCorrect("updateBy", ParameterType.NUMBER, val);
               TypeCheck.isPositiveInteger("updateBy", val);
            }
         ),
         updateTime: generateProperties(
            this.#updateTime,
            'updateTime',
            (val) => {
               TypeCheck.classCorrect("updateTime", Date, val);
            }
         ),
         createTime: generateProperties(
            this.#createTime,
            'createTime',
            (val) => {
               TypeCheck.classCorrect("createTime", Date, val);
            }
         ),
         remark: generateProperties(
            this.#remark,
            'remark',
            (val) => {
               TypeCheck.typeCorrect('remark', ParameterType.STRING, val);
            }
         )
      });
   }
}
