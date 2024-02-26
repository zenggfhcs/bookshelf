import {REG_EMAIL, REG_USER_ID} from "@/constant/RegularExpression.js";

const LOGIN_FORM = {
   name: [
      {
         required: true,               // 字段必填
         validator(rule, value) {      // 自定义检查
            if (value === null || value.length === 0) {
               return new Error("请输入邮箱");
            } else if (!REG_EMAIL.test(value.trim())) {
               return new Error("邮箱格式错误");
            }
         },
      }
   ],
   password: [
      {
         required: true,
         validator(rule, value) {
            if (value === null || value.length === 0) {
               return new Error("请输入密码");
            } else if (value.length < length.min) {
               return new Error("password 长度应为 7-17")
            }
         },
      }
   ]
};

export {
   LOGIN_FORM
}
