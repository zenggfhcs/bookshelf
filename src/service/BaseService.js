import axios from "axios";
import {RequestBody} from "@/model/RequestBody.js";
import {ParameterType, PostType} from "@/constant/type.js";
import {TypeCheck} from "@/utils/Check.js";

export class BaseService {
   /**
    * 资源名称
    */
   #resourceName;

   constructor(resourceName) {
      this.#resourceName = resourceName;
   }

   /**
    * 创建
    * @param entity 实体
    * @param filter 过滤类
    * @param resource 后缀
    * @param iThen then
    * @param iCatch catch
    * @param iFinally finally
    */
   cr8(entity, filter, resource, iThen, iCatch, iFinally) {
      this.#base(entity, filter, resource, PostType.CREATE, iThen, iCatch, iFinally);
   }

   /**
    * 更新
    * @param entity 实体
    * @param filter 过滤类
    * @param resource 后缀
    * @param iThen then
    * @param iCatch catch
    * @param iFinally finally
    */
   upd(entity, filter, resource, iThen, iCatch, iFinally) {
      this.#base(entity, filter, resource, PostType.UPDATE, iThen, iCatch, iFinally);
   }

   /**
    * 获取
    * @param entity 实体
    * @param filter 过滤类
    * @param resource 后缀
    * @param iThen then
    * @param iCatch catch
    * @param iFinally finally
    */
   sel(entity, filter, resource, iThen, iCatch, iFinally) {
      this.#base(entity, filter, resource, PostType.SELECT, iThen, iCatch, iFinally);
   }

   /**
    * 删除
    * @param entity 实体
    * @param filter 过滤类
    * @param resource 后缀
    * @param iThen then
    * @param iCatch catch
    * @param iFinally finally
    */
   del(entity, filter, resource, iThen, iCatch, iFinally) {
      this.#base(entity, filter, resource, PostType.DELETE, iThen, iCatch, iFinally);
   }

   /**
    * base request
    * @param entity 实体
    * @param filter 过滤类
    * @param resource 后缀
    * @param postType post type
    * @param iThen then
    * @param iCatch catch
    * @param iFinally finally
    */
   #base(entity, filter, resource, postType, iThen = undefined, iCatch = undefined, iFinally = undefined) {
      /* ============================ 请求前校验 ============================ */
      this.#checkTypeBeforeRequest(iThen, iCatch, iFinally);

      /* ============================ 请求 ============================ */
      axios({
         methods: 'post',                                            // 默认请求方式
         baseURL: `http://localhost/${this.#resourceName}/`,         // 基础 url
         url: `${resource}/${postType}`,                             // 具体资源
         data: new RequestBody(entity, filter),                      // 请求载体：组装请求数据
      }).then(iThen)                                                // diy then
         .catch(iCatch)                                             // diy catch
         .finally(iFinally);                                        // diy finally
   }

   /**
    * 参数校验
    * @param iThen then
    * @param iCatch catch
    * @param iFinally finally
    */
   #checkTypeBeforeRequest(iThen, iCatch, iFinally) {
      TypeCheck.typeCorrect('iThen', ParameterType.FUNCTION, iThen);
      TypeCheck.typeCorrect('iCatch', ParameterType.FUNCTION, iCatch);
      TypeCheck.typeCorrect('iFinally', ParameterType.FUNCTION, iFinally);
   }
}