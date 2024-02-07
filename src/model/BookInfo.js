import {Publisher} from "@/model/Publisher.js";
import {BaseEntity} from "@/model/BaseEntity.js";
import {ParameterType} from "@/constant/type.js";
import {TypeCheck} from "@/utils/Check.js";


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
               TypeCheck.isPositiveInteger("bookInfoId", val);

               internal.bookInfoId = val;
            }, configurable: false
         }, /**
          * 出版社
          */
         publisher: {
            get: () => {
               return internal.publisher;
            }, set: (val) => {
               TypeCheck.classCorrect("publisher", Publisher, val);

            }, configurable: false
         }, /**
          * 出版地
          */
         publishPlace: {
            get: () => {
               return internal.publishPlace;
            }, set: (val) => {
               TypeCheck.typeCorrect("publisher", ParameterType.STRING, val);

               internal.publishPlace = val;
            }, configurable: false
         }, /**
          * 书籍 ISBN
          */
         isbn: {
            get: () => {
               return internal.bookName;
            }, set: (val) => {
               TypeCheck.typeCorrect("isbn", ParameterType.STRING, val);

               internal.isbn = val;
            }, configurable: false
         }, /**
          * 书籍 CIP
          */
         cip: {
            get: () => {
               return internal.cip;
            }, set: (val) => {
               TypeCheck.typeCorrect("cip", ParameterType.STRING, val);

               internal.cip = val;
            }, configurable: false
         }, /**
          * 书籍名称
          */
         bookName: {
            get: () => {
               return internal.bookName;
            }, set: (val) => {
               TypeCheck.typeCorrect(this.bookName, ParameterType.STRING, val);

               internal.bookName = val;
            }, configurable: false
         }, /**
          * 书籍类型
          */
         bookType: {
            get: () => {
               return internal.bookType;
            }, set: (val) => {
               TypeCheck.typeCorrect("bookType", ParameterType.STRING, val);

               internal.bookType = val;
            }, configurable: false
         }, /**
          * 书籍封面图片链接
          */
         cover: {
            get: () => {
               return internal.cover;
            }, set: (val) => {
               TypeCheck.typeCorrect("cover", ParameterType.STRING, val);

               internal.cover = val;
            }, configurable: false
         }, /**
          * 作者
          */
         author: {
            get: () => {
               return internal.author;
            }, set: (val) => {
               TypeCheck.typeCorrect("author", ParameterType.STRING, val);

               internal.author = val;
            }, configurable: false
         }, /**
          * 书籍描述
          */
         describe: {
            get: () => {
               return internal.describe;
            }, set: (val) => {
               TypeCheck.typeCorrect("describe", ParameterType.STRING, val);

               internal.describe = val;
            }, configurable: false
         }, /**
          * 出版时间（yyyy-MM-dd）
          */
         publishDate: {
            get: () => {
               return internal.publishDate;
            }, set: (val) => {
               TypeCheck.classCorrect("publishDate", Date, val);

               internal.publishDate = val;
            }, configurable: false
         }, /**
          * 关键字
          */
         keyword: {
            get: () => {
               return internal.keyword;
            }, set: (val) => {
               TypeCheck.typeCorrect("keyword", ParameterType.STRING, val);

               internal.keyword = val;
            }, configurable: false
         }, /**
          * 正文语种
          */
         lang: {
            get: () => {
               return internal.lang;
            }, set: (val) => {
               TypeCheck.typeCorrect("lang", ParameterType.STRING, val);

               internal.lang = val;
            }, configurable: false
         }, /**
          * 出版价格
          */
         price: {
            get: () => {
               return internal.price;
            }, set: (val) => {
               TypeCheck.isFloatNumber("price", val, () => {
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
               TypeCheck.isPositiveInteger("stock", val);

               internal.stock = val;
            }, configurable: false
         },
      });
   }
}