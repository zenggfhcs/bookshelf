import {Bookinfo} from "./Bookinfo.js";
import {Check} from "@/static/js/utils/tools.js";

export class Book {
   constructor() {
      const internal = {
         bookId: 1, bookDamageLevel: 0, borrowable: false, bookInfo: new Bookinfo(),
      }
      Object.defineProperties(this, {
         /**
          * book id
          */
         bookId: {
            get: () => {
               return internal.bookId;
            }, set: (val) => {
               Check.isPositiveInteger(this.bookId.name, val);

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
               Check.isPositiveInteger(this.bookDamageLevel.name, val);

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
               Check.isBoolean(this.borrowable.name, val);

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
               Check.classCorrect(this.bookInfo.name, Bookinfo, val);

               internal.bookInfo = val;
            }, configurable: false
         },
      })
   }
}