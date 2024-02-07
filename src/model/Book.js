import {BookInfo} from "./BookInfo.js";
import {TypeCheck} from "@/utils/Check.js";
import {BaseEntity} from "@/model/BaseEntity.js";

export class Book extends BaseEntity {
   constructor() {
      super();
      const internal = {
         bookId: 1, bookDamageLevel: 0, borrowable: false, bookInfo: new BookInfo(),
      }
      Object.defineProperties(this, {
         /**
          * book id
          */
         bookId: {
            get: () => {
               return internal.bookId;
            }, set: (val) => {
               TypeCheck.isPositiveInteger("bookId", val);

               internal.bookId = val;
            }, configurable: false
         },
         /**
          * 书籍损坏级别
          */
         bookDamageLevel: {
            get: () => {
               return internal.bookDamageLevel;
            }, set: (val) => {
               TypeCheck.isPositiveInteger("bookDamageLevel", val);

               internal.bookDamageLevel = val;
            }, configurable: false
         },
         /**
          * 可借的
          */
         borrowable: {
            get: () => {
               return internal.borrowable;
            }, set: (val) => {
               TypeCheck.isBoolean("borrowable", val);

               internal.borrowable = val;
            }, configurable: false
         },
         /**
          * 书籍信息
          */
         bookInfo: {
            get: () => {
               return internal.bookInfo
            }, set: (val) => {
               TypeCheck.classCorrect("bookInfo", BookInfo, val);

               internal.bookInfo = val;
            }, configurable: false
         },
      })
   }
}