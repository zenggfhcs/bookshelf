import {TypeCheck} from "@/utils/Check.js";
import {BaseEntity} from "@/model/BaseEntity.js";
import {ParameterType} from "@/constant/type.js";

export class User extends BaseEntity {
   #id;
   #authenticationString;
   #displayName;
   #userEmail;
   #userPhoneNumber;
   #condition;
   #authority;
   #surname;
   #name;
   #sex;
   #age;
   #lastLoginTime;

   constructor() {
      super();
   }

   get id() {
      return this.#id;
   }

   set id(value) {
      TypeCheck.typeCorrect("userId", ParameterType.NUMBER, value);

      this.#id = value;
   }

   get authenticationString() {
      return this.#authenticationString;
   }

   set authenticationString(value) {
      TypeCheck.typeCorrect("authenticationString", ParameterType.STRING, value);

      this.#authenticationString = value;
   }

   get displayName() {
      return this.#displayName;
   }

   set displayName(value) {
      TypeCheck.typeCorrect("displayName", ParameterType.STRING, value);

      this.#displayName = value;
   }

   get userEmail() {
      return this.#userEmail;
   }

   set userEmail(value) {
      TypeCheck.typeCorrect("userEmail", ParameterType.STRING, value);

      this.#userEmail = value;
   }

   get userPhoneNumber() {
      return this.#userPhoneNumber;
   }

   set userPhoneNumber(value) {
      TypeCheck.typeCorrect("userPhoneNumber", ParameterType.NUMBER, value);

      this.#userPhoneNumber = value;
   }

   get condition() {
      return this.#condition;
   }

   set condition(value) {
      TypeCheck.typeCorrect("condition", ParameterType.NUMBER, value);

      this.#condition = value;
   }

   get authority() {
      return this.#authority;
   }

   set authority(value) {
      TypeCheck.typeCorrect("authority", ParameterType.NUMBER, value);

      this.#authority = value;
   }

   get surname() {
      return this.#surname;
   }

   set surname(value) {
      TypeCheck.typeCorrect("surname", ParameterType.STRING, value);

      this.#surname = value;
   }

   get name() {
      return this.#name;
   }

   set name(value) {
      TypeCheck.typeCorrect("name", ParameterType.STRING, value);

      this.#name = value;
   }

   get sex() {
      return this.#sex;
   }

   set sex(value) {
      TypeCheck.typeCorrect("sex", ParameterType.NUMBER, value);

      this.#sex = value;
   }

   get age() {
      return this.#age;
   }

   set age(value) {
      TypeCheck.typeCorrect("age", ParameterType.NUMBER, value);

      this.#age = value;
   }

   get lastLoginTime() {
      return this.#lastLoginTime;
   }

   set lastLoginTime(value) {
      TypeCheck.typeCorrect("lastLoginTime", Date, value);

      this.#lastLoginTime = value;
   }
}