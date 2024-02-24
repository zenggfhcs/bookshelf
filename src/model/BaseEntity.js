import {ParameterType} from "@/constant/Type.js";
import {TypeCheck} from "@/utils/Check.js";

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

   get createBy() {
      return this.#createBy;
   }

   set createBy(value) {
      /* ===================== 类型检查 ===================== */
      TypeCheck.typeCorrect("createBy", ParameterType.NUMBER, value);

      this.#createBy = value;
   }

   get updateBy() {
      return this.#updateBy;
   }

   set updateBy(value) {
      /* ===================== 类型检查 ===================== */
      TypeCheck.typeCorrect("updateBy", ParameterType.NUMBER, value);

      this.#updateBy = value;
   }

   get updateTime() {
      return this.#updateTime;
   }

   set updateTime(value) {
      /* ===================== 类型检查 ===================== */
      TypeCheck.typeCorrect("updateTime", Date, value);

      this.#updateTime = value;
   }

   get createTime() {
      return this.#createTime;
   }

   set createTime(value) {
      /* ===================== 类型检查 ===================== */
      TypeCheck.typeCorrect("createTime", Date, value);

      this.#createTime = value;
   }

   get remark() {
      return this.#remark;
   }

   set remark(value) {
      /* ===================== 类型检查 ===================== */
      TypeCheck.typeCorrect("remark", ParameterType.STRING, value);

      this.#remark = value;
   }
}
