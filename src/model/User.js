import {TypeCheck} from "@/utils/Check.js";
import {BaseEntity} from "@/model/BaseEntity.js";
import {ParameterType} from "@/constant/type.js";

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
               TypeCheck.isPositiveInteger("userId", val);

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
               TypeCheck.typeCorrect("authenticationString", ParameterType.STRING, val);

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
               TypeCheck.typeCorrect("displayName", ParameterType.STRING, val);

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
               TypeCheck.typeCorrect("userEmail", ParameterType.STRING, val);

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
               TypeCheck.typeCorrect("userPhoneNumber", ParameterType.STRING, val);

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
               TypeCheck.isPositiveInteger("condition", val);

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
               TypeCheck.isPositiveInteger("authority", val);

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
               TypeCheck.typeCorrect("surname", ParameterType.STRING, val);

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
               TypeCheck.typeCorrect("name", ParameterType.STRING, val);

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
               TypeCheck.isPositiveInteger("sex", val, () => {
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
               TypeCheck.isPositiveInteger("age", val);

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
               TypeCheck.classCorrect("lastLoginTime", Date, val);

               internal.lastLoginTime = val;
            }, configurable: false
         },
      });
   }
}