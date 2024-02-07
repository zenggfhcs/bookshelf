import {TypeCheck} from "@/utils/Check.js";
import {BaseEntity} from "@/model/BaseEntity.js";
import {Filter} from "@/model/Filter.js";

export class RequestBody {
   constructor(entity, filter) {
      TypeCheck.classCorrect(entity.name, BaseEntity, entity);
      const internal = {
         entity: entity,
         filter: filter ? filter : new Filter()
      }
      Object.defineProperties(this, {
         entity: {
            get: () => {
               return internal.entity;
            }, set: (val) => {
               TypeCheck.classCorrect("entity", BaseEntity, val);

               internal.entity = val;
            }, configurable: false
         },
         filter: {
            get: () => {
               return internal.filter;
            }, set: (val) => {
               TypeCheck.classCorrect("filter", Filter, val);

               internal.filter = val;
            }, configurable: false
         },
      })
   }
}