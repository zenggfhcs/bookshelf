import {Publisher} from "@/static/js/model/Publisher.js";
import {BaseEntity} from "@/static/js/model/BaseEntity.js";
import {Check, Type} from "@/static/js/utils/tools.js";


export class BookInfo extends BaseEntity {
   constructor() {
      super();
      const internal = {
         bookInfoId: -1,
         publisher: new Publisher(),
         publishPlace: '',
         isbn: '',
         cip: '',
         bookName: '',
         bookType: '',
         cover: '',
         author: '',
         describe: '',
         publishDate: new Date(),
         keyword: '',
         lang: '',
         price: 0.0,
         stock: 0,
      };
      //
      Object.defineProperties(this, {
         /**
          * 书籍信息id
          */
         bookInfoId: {
            get: () => {
               return internal.bookInfoId;
            }, set: (val) => {
               Check.isPositiveInteger("bookInfoId", val);

               internal.bookInfoId = val;
            }, configurable: false
         }, /**
          * 出版社
          */
         publisher: {
            get: () => {
               return internal.publisher;
            }, set: (val) => {
               Check.classCorrect("publisher", Publisher, val);

            }, configurable: false
         }, /**
          * 出版地
          */
         publishPlace: {
            get: () => {
               return internal.publishPlace;
            }, set: (val) => {
               Check.typeCorrect("publisher", Type.String, val);

               internal.publishPlace = val;
            }, configurable: false
         }, /**
          * 书籍 ISBN
          */
         isbn: {
            get: () => {
               return internal.bookName;
            }, set: (val) => {
               Check.typeCorrect("isbn", Type.String, val);

               internal.isbn = val;
            }, configurable: false
         }, /**
          * 书籍 CIP
          */
         cip: {
            get: () => {
               return internal.cip;
            }, set: (val) => {
               Check.typeCorrect("cip", Type.String, val);

               internal.cip = val;
            }, configurable: false
         }, /**
          * 书籍名称
          */
         bookName: {
            get: () => {
               return internal.bookName;
            }, set: (val) => {
               Check.typeCorrect(this.bookName, Type.String, val);

               internal.bookName = val;
            }, configurable: false
         }, /**
          * 书籍类型
          */
         bookType: {
            get: () => {
               return internal.bookType;
            }, set: (val) => {
               Check.typeCorrect("bookType", Type.String, val);

               internal.bookType = val;
            }, configurable: false
         }, /**
          * 书籍封面图片链接
          */
         cover: {
            get: () => {
               return internal.cover;
            }, set: (val) => {
               Check.typeCorrect("cover", Type.String, val);

               internal.cover = val;
            }, configurable: false
         }, /**
          * 作者
          */
         author: {
            get: () => {
               return internal.author;
            }, set: (val) => {
               Check.typeCorrect("author", Type.String, val);

               internal.author = val;
            }, configurable: false
         }, /**
          * 书籍描述
          */
         describe: {
            get: () => {
               return internal.describe;
            }, set: (val) => {
               Check.typeCorrect("describe", Type.String, val);

               internal.describe = val;
            }, configurable: false
         }, /**
          * 出版时间（yyyy-MM-dd）
          */
         publishDate: {
            get: () => {
               return internal.publishDate;
            }, set: (val) => {
               Check.classCorrect("publishDate", Date, val);

               internal.publishDate = val;
            }, configurable: false
         }, /**
          * 关键字
          */
         keyword: {
            get: () => {
               return internal.keyword;
            }, set: (val) => {
               Check.typeCorrect("keyword", Type.String, val);

               internal.keyword = val;
            }, configurable: false
         }, /**
          * 正文语种
          */
         lang: {
            get: () => {
               return internal.lang;
            }, set: (val) => {
               Check.typeCorrect("lang", Type.String, val);

               internal.lang = val;
            }, configurable: false
         }, /**
          * 出版价格
          */
         price: {
            get: () => {
               return internal.price;
            }, set: (val) => {
               Check.isFloatNumber("price", val, () => {
                  return val > 0
               });

               internal.price = val;
            }, configurable: false
         }, /**
          * 库存量
          */
         stock: {
            get: () => {
               return internal.stock;
            }, set: (val) => {
               Check.isPositiveInteger("stock", val);

               internal.stock = val;
            }, configurable: false
         },
      });
   }
}