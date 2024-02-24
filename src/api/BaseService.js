import axios from "axios";
import {PostType} from "@/constant/Type.js";
import {BASE_URL} from "@/config/config.js";

export class BaseService {
   /**
    * 基础资源 url
    */
   #baseUrl;

   constructor(resourceName) {
      this.#baseUrl = `${BASE_URL}/${resourceName}/`;
   }

   create(payload, resource) {
      return this.#base(payload, resource, PostType.CREATE);
   }

   update(payload, resource) {
      return this.#base(payload, resource, PostType.UPDATE);
   }

   select(payload, resource) {
      return this.#base(payload, resource, PostType.SELECT);
   }

   delete(payload, resource) {
      return this.#base(payload, resource, PostType.DELETE);
   }


   /**
    * base request
    * @param payload 载体
    * @param resource 资源id | list
    * @param postType 后缀
    */
   #base(payload, resource, postType) {
      /* ============================ 请求 ============================ */
      return axios.post({
         headers: {},
         methods: 'post',                 // 默认请求方式
         baseURL: this.#baseUrl,          // 基础 url
         url: `${resource}/${postType}`,  // 具体资源
         data: payload,                   // 请求载体：组装请求数据
      });
   }
}