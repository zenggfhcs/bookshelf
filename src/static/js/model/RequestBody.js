import {Check} from "@/static/js/utils/tools.js";
import {BaseEntity} from "@/static/js/model/BaseEntity.js";
import {Filter} from "@/static/js/model/Filter.js";

export class RequestBody {
   constructor(entity, filter) {
      Check.classCorrect(entity.name, BaseEntity, entity);
      const internal = {
         entity: entity,
         filter: filter ? filter : new Filter()
      }
      Object.defineProperties(this, {
         entity: {
            get: () => {
               return internal.entity;
            }, set: (val) => {
               Check.classCorrect("entity", BaseEntity, val);

               internal.entity = val;
            }, configurable: false
         },
         filter: {
             get: () => {
                 return internal.filter;
             }, set: (val) => {
               Check.classCorrect("filter", Filter, val);

                 internal.filter = val;
             }, configurable: false
         },
      })
   }
}