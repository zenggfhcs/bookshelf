import {MyRequest} from "@/api/MyRequest.js";
import {Urls} from "@/api/UrlProvider.js"

/* ============================ user api ============================ */
const Users = {
   login: (entity) => {
      const _payload = {entity: entity};
      return MyRequest.post(Urls.LOGIN, _payload);
   },
   list: (entity, filter) => {
      const _payload = {entity: entity, filter: filter};
      return MyRequest.post(Urls.USER('list').R, _payload);
   },
   detail: () => {

   },
   add: () => {

   },
   remove: () => {

   },
   borrowing: () => {

   },
   return: () => {

   }
}
/* ============================ user api ============================ */
const Service = {
   Users: Users
}


export {
   Service
}





