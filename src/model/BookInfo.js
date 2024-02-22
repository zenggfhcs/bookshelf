import {Publisher} from "@/model/Publisher.js";
import {BaseEntity} from "@/model/BaseEntity.js";
import {ParameterType} from "@/constant/type.js";
import {TypeCheck} from "@/utils/Check.js";


export class BookInfo extends BaseEntity {
   /**
    * 书籍信息id
    */
   #id;
   /**
    * 出版社
    */
   #publisher;
   /**
    * 出版地
    */
   #publishPlace;
   /**
    * 书籍 ISBN
    */
   #isbn;
   /**
    * 书籍 CIP
    */
   #cip;
   /**
    * 书籍名称
    */
   #bookName;
   /**
    * 书籍类型
    */
   #bookType;
   /**
    * 书籍封面图片链接
    */
   #cover;
   /**
    * 作者
    */
   #author;
   /**
    * 书籍描述
    */
   #describe;
   /**
    * 出版时间（yyyy-MM-dd）
    */
   #publishDate;
   /**
    * 关键字
    */
   #keyword;
   /**
    * 正文语种
    */
   #lang;
   /**
    * 出版价格
    */
   #price;
   /**
    * 库存量
    */
   #stock;

   constructor() {
      super();
   }

   get id() {
      return this.#id;
   }

   set id(value) {
      TypeCheck.typeCorrect("id", ParameterType.NUMBER, value);

      this.#id = value;
   }

   get publisher() {
      return this.#publisher;
   }

   set publisher(value) {
      TypeCheck.typeCorrect("publisher", Publisher, value);

      this.#publisher = value;
   }

   get publishPlace() {
      return this.#publishPlace;
   }

   set publishPlace(value) {
      TypeCheck.typeCorrect("publishPlace", ParameterType.NUMBER, value);
      this.#publishPlace = value;
   }

   get isbn() {
      return this.#isbn;
   }

   set isbn(value) {
      TypeCheck.typeCorrect("isbn", ParameterType.STRING, value);
      this.#isbn = value;
   }

   get cip() {
      return this.#cip;
   }

   set cip(value) {
      TypeCheck.typeCorrect("cip", ParameterType.STRING, value);
      this.#cip = value;
   }

   get bookName() {
      return this.#bookName;
   }

   set bookName(value) {
      TypeCheck.typeCorrect("bookName", ParameterType.STRING, value);
      this.#bookName = value;
   }

   get bookType() {
      return this.#bookType;
   }

   set bookType(value) {
      TypeCheck.typeCorrect("bookType", ParameterType.STRING, value);
      this.#bookType = value;
   }

   get cover() {
      return this.#cover;
   }

   set cover(value) {
      TypeCheck.typeCorrect("cover", ParameterType.STRING, value);
      this.#cover = value;
   }

   get author() {
      return this.#author;
   }

   set author(value) {
      TypeCheck.typeCorrect("author", ParameterType.STRING, value);
      this.#author = value;
   }

   get describe() {
      return this.#describe;
   }

   set describe(value) {
      TypeCheck.typeCorrect("describe", ParameterType.STRING, value);
      this.#describe = value;
   }

   get publishDate() {
      return this.#publishDate;
   }

   set publishDate(value) {
      TypeCheck.typeCorrect("publishDate", Date, value);
      this.#publishDate = value;
   }

   get keyword() {
      return this.#keyword;
   }

   set keyword(value) {
      TypeCheck.typeCorrect("keyword", ParameterType.STRING, value);
      this.#keyword = value;
   }

   get lang() {
      return this.#lang;
   }

   set lang(value) {
      TypeCheck.typeCorrect("lang", ParameterType.STRING, value);
      this.#lang = value;
   }

   get price() {
      return this.#price;
   }

   set price(value) {
      TypeCheck.typeCorrect("price", ParameterType.NUMBER, value);
      this.#price = value;
   }

   get stock() {
      return this.#stock;
   }

   set stock(value) {
      TypeCheck.typeCorrect("stock", ParameterType.NUMBER, value);
      this.#stock = value;
   }
}