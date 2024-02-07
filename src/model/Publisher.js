import {BaseEntity} from "@/model/BaseEntity.js";
import {ParameterType} from "@/constant/type.js";
import {TypeCheck} from "@/utils/Check.js";
import {generateProperties} from "@/utils/generate.js";

/**
 * 出版社-实体
 */
export class Publisher extends BaseEntity {
   #internal = {
      publishId: -1, name: '', remark: ''
   };
   #publishId;
   #name;
   #remark;

   constructor() {
      super();
      this.#init();
   }

   #init() {
      Object.defineProperties(this, {
         /**
          * 出版社 id
          */
         publishId: generateProperties(
            this.#internal,
            'publishId',
            (val) => {
               TypeCheck.typeCorrect("publishId", ParameterType.NUMBER, val);
               TypeCheck.isPositiveInteger("publishId", val);
            }),

         /**
          * 出版社名称
          */
         name: {
            get: () => {
               return internal.name;
            }, set: (val) => {
               TypeCheck.typeCorrect("name", ParameterType.STRING, val);

               internal.name = val;
            }, configurable: false
         },
         /**
          * 备注
          */
         remark: {
            get: () => {
               return internal.remark;
            }, set: (val) => {
               TypeCheck.typeCorrect("remark", ParameterType.STRING, val);

               internal.remark = val;
            }, configurable: false
         },
      });
   }
}
