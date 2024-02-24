import {TypeCheck} from "@/utils/Check.js";
import {BaseEntity} from "@/model/BaseEntity.js";
import {Filter} from "@/model/Filter.js";

export class Payload {

   #entity;

   #filter;

   constructor() {
   }

   get entity() {
      return this.#entity;
   }

   set entity(value) {
      TypeCheck.typeCorrect("entity", BaseEntity, value);
      this.#entity = value;
   }

   get filter() {
      return this.#filter;
   }

   set filter(value) {
      TypeCheck.typeCorrect("filter", Filter, value);
      this.#filter = value;
   }

   toString() {
      return JSON.stringify(this.toJSON());
   }

   toJSON() {
      return {
         entity: this.entity,
         filter: this.filter
      };
   }
}