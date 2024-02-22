import {BaseEntity} from "@/model/BaseEntity.js";

export class Book extends BaseEntity {
   /**
    * book id
    */
   #id;
   /**
    * 书籍损坏级别
    */
   #bookDamageLevel;
   /**
    * 可借的
    */
   #borrowable;
   /**
    * 书籍信息
    */
   #bookInfo;

   constructor() {
      super();
   }

   get id() {
      return this.#id;
   }

   set id(value) {
      this.#id = value;
   }

   get bookDamageLevel() {
      return this.#bookDamageLevel;
   }

   set bookDamageLevel(value) {
      this.#bookDamageLevel = value;
   }

   get borrowable() {
      return this.#borrowable;
   }

   set borrowable(value) {
      this.#borrowable = value;
   }

   get bookInfo() {
      return this.#bookInfo;
   }

   set bookInfo(value) {
      this.#bookInfo = value;
   }
}