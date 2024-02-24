import {BaseEntity} from "@/model/BaseEntity.js";
import {TypeCheck} from "@/utils/Check.js";
import {ParameterType} from "@/constant/Type.js";

/**
 * 出版社-实体
 */
export class Publisher extends BaseEntity {
   #id;
   #name;
   #remark;

   constructor() {
      super();
   }

   get id() {
      return this.#id;
   }

   set id(value) {
      TypeCheck.typeCorrect('id', ParameterType.NUMBER, value);

      this.#id = value;
   }

   get name() {
      return this.#name;
   }

   set name(value) {
      TypeCheck.typeCorrect('name', ParameterType.STRING, value);

      this.#name = value;
   }

   get remark() {
      return this.#remark;
   }

   set remark(value) {
      TypeCheck.typeCorrect('remark', ParameterType.STRING, value);

      this.#remark = value;
   }
}
