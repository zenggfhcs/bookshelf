import {BaseEntity} from "@/static/js/model/BaseEntity.js";
import {Check, Type} from "@/static/js/utils/tools.js";

/**
 * 出版社-实体
 */
export class Publisher extends BaseEntity {
   constructor() {
      super();
      const internal = {
         publishId: -1, name: '', remark: ''
      };
      Object.defineProperties(this, {
         /**
          * 出版社 id
          */
         publishId: {
            get: () => {
               return internal.publishId;
            }, set: (val) => {
               Check.typeCorrect("publishId", Type.Number, val);
               Check.isPositiveInteger("publishId", val);

               internal.publishId = val;
            }, configurable: false
         },
         /**
          * 出版社名称
          */
         name: {
            get: () => {
               return internal.name;
            }, set: (val) => {
               Check.typeCorrect("name", Type.String, val);

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
               Check.typeCorrect("remark", Type.String, val);

               internal.remark = val;
            }, configurable: false
         },
      });
   }
}
