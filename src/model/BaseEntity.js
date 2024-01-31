import {Check, Type} from "@/utils/tools.js";

export class BaseEntity {
   constructor() {
      const internal = {
         createBy: -1, updateBy: -1, createTime: new Date(), updateTime: new Date(),
      };
      Object.defineProperties(this, {
         /**
          * 创建人
          */
         createBy: {
            get: () => {
               return internal.createBy;
            }, set: (val) => {
               Check.typeCorrect("createBy", Type.Number, val);
               Check.isPositiveInteger("createBy", val);

               internal.createBy = val;
            }, configurable: false
         },
         /**
          * 更新人
          */
         updateBy: {
            get: () => {
               return internal.updateBy;
            }, set: (val) => {
               Check.typeCorrect("updateBy", Type.Number, val);
               Check.isPositiveInteger("updateBy", val);

               internal.updateBy = val;
            }, configurable: false
         },
         /**
          * 更新时间
          */
         updateTime: {
            get: () => {
               return internal.updateTime;
            }, set: (val) => {
               Check.classCorrect("updateTime", Date, val);

               internal.updateTime = val;
            }, configurable: false
         },
         /**
          * 创建时间
          */
         createTime: {
            get: () => {
               return internal.createTime;
            }, set: (val) => {
               Check.classCorrect("createTime", Date, val);

               internal.createTime = val;
            }, configurable: false
         },
      });
   }
}
