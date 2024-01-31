import {Check, Type} from "@/utils/tools.js";
import {BaseEntity} from "@/model/BaseEntity.js";

export class User extends BaseEntity {
   constructor() {
      super();
      const internal = {
         userId: -1,
         authenticationString: '',
         displayName: '',
         userEmail: '',
         userPhoneNumber: '',
         condition: 0,
         authority: 0,
         surname: '',
         name: '',
         sex: 0,
         age: 0,
         lastLoginTime: new Date(),
      };
      Object.defineProperties(this, {
         /**
          * 用户id
          */
         userId: {
            get: () => {
               return internal.userId;
            }, set: (val) => {
               Check.isPositiveInteger("userId", val);

               internal.userId = val;
            }, configurable: false
         },
         /**
          * 用户验证字符串
          */
         authenticationString: {
            get: () => {
               return internal.authenticationString;
            }, set: (val) => {
               Check.typeCorrect("authenticationString", Type.String, val);

               internal.authenticationString = val;
            }, configurable: false
         },
         /**
          * 用户名
          */
         displayName: {
            get: () => {
               return internal.displayName;
            }, set: (val) => {
               Check.typeCorrect("displayName", Type.String, val);

               internal.displayName = val;
            }, configurable: false
         },
         /**
          * 用户邮箱
          */
         userEmail: {
            get: () => {
               return internal.userEmail;
            }, set: (val) => {
               Check.typeCorrect("userEmail", Type.String, val);

               internal.userEmail = val;
            }, configurable: false
         },
         /**
          * 用户电话号码
          */
         userPhoneNumber: {
            get: () => {
               return internal.userPhoneNumber;
            }, set: (val) => {
               Check.typeCorrect("userPhoneNumber", Type.String, val);

               internal.userPhoneNumber = val;
            }, configurable: false
         },
         /**
          * 状态
          */
         condition: {
            get: () => {
               return internal.condition;
            }, set: (val) => {
               Check.isPositiveInteger("condition", val);

               internal.condition = val;
            }, configurable: false
         },
         /**
          * 权限
          */
         authority: {
            get: () => {
               return internal.authority;
            }, set: (val) => {
               Check.isPositiveInteger("authority", val);

               internal.authority = val;
            }, configurable: false
         },
         /**
          * 姓
          */
         surname: {
            get: () => {
               return internal.surname;
            }, set: (val) => {
               Check.typeCorrect("surname", Type.String, val);

               internal.surname = val;
            }, configurable: false
         },
         /**
          * 名
          */
         name: {
            get: () => {
               return internal.name;
            }, set: (val) => {
               Check.typeCorrect("name", Type.String, val);

               internal.name = val;
            }, configurable: false
         },
         /**
          * 用户性别
          */
         sex: {
            get: () => {
               return internal.sex;
            }, set: (val) => {
               Check.isPositiveInteger("sex", val, () => {
                  return true
               });

               internal.sex = val;
            }, configurable: false
         },
         /**
          * 用户年龄
          */
         age: {
            get: () => {
               return internal.age;
            }, set: (val) => {
               Check.isPositiveInteger("age", val);

               internal.age = val;
            }, configurable: false
         },
         /**
          * 用户最后登陆的时间
          */
         lastLoginTime: {
            get: () => {
               return internal.lastLoginTime;
            }, set: (val) => {
               Check.classCorrect("lastLoginTime", Date, val);

               internal.lastLoginTime = val;
            }, configurable: false
         },
      });
   }

   login() {

   }
}