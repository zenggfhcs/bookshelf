import axios from "axios";
import {Check, Type} from "@/utils/tools.js";
import {RequestBody} from "@/model/RequestBody.js";
import {Url} from "@/service/Url.js";

export class BaseService {
   /**
    * 创建
    * @param entity 实体
    * @param filter 过滤类
    * @param url 请求路径
    * @param id 后缀
    * @param myThen then
    * @param myCatch catch
    * @param myFinally finally
    */
   static create(entity, filter, url, id, myThen = undefined, myCatch = undefined, myFinally = undefined) {
      this.base('post', entity, filter, url, id, myThen, myCatch, myFinally);
   }

   /**
    * 更新
    * @param entity 实体
    * @param filter 过滤类
    * @param url 请求路径
    * @param id 后缀
    * @param myThen then
    * @param myCatch catch
    * @param myFinally finally
    */
   static update(entity, filter, url, id, myThen, myCatch, myFinally) {
      this.base('patch', entity, filter, url, id, myThen, myCatch, myFinally);
   }

   /**
    * 获取
    * @param entity 实体
    * @param filter 过滤类
    * @param url 请求路径
    * @param id 后缀
    * @param myThen then
    * @param myCatch catch
    * @param myFinally finally
    */
   static select(entity, filter, url, id, myThen, myCatch, myFinally) {
      this.base('get', entity, filter, url, id, myThen, myCatch, myFinally);
   }

   /**
    * 删除
    * @param entity 实体
    * @param filter 过滤类
    * @param url 请求路径
    * @param id 后缀
    * @param myThen then
    * @param myCatch catch
    * @param myFinally finally
    */
   static delete(entity, filter, url, id, myThen = undefined, myCatch = undefined, myFinally = undefined) {
      this.base('delete', entity, filter, url, id, myThen, myCatch, myFinally);
   }

   /**
    * base request
    * @param method 请求方式
    * @param entity 实体
    * @param filter 过滤类
    * @param url 请求路径
    * @param id 后缀
    * @param myThen then
    * @param myCatch catch
    * @param myFinally finally
    */
   static base(method, entity, filter, url, id, myThen = undefined, myCatch = undefined, myFinally = undefined) {
      /* ======= 请求前校验 ======= */
      this.before(entity, filter, myThen, myCatch, myFinally);
      /* ======= 请求前校验 ======= */

      /* ======= 组装请求数据 ======= */
      let body = new RequestBody(entity, filter);
      /* ======= 组装请求数据 ======= */

      /* ======= 请求 ======= */
      axios({
         methods: method, url: Url.baseUrl + url + id, data: body
      }).then(myThen)
         .catch(myCatch)
         .finally(myFinally);
      /* ======= 请求 ======= */
   }

   /**
    * 数据校验
    * @param myThen then
    * @param myCatch catch
    * @param myFinally finally
    */
   static before(myThen, myCatch, myFinally) {
      Check.typeCorrect('myThen', Type.Function, myThen);
      Check.typeCorrect('myCatch', Type.Function, myCatch);
      Check.typeCorrect('myFinally', Type.Function, myFinally);
   }
}