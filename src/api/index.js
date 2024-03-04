import {MyRequest} from "@/api/MyRequest.js";
import {Urls} from "@/api/UrlProvider.js"
import {encodeByRSA} from "@/utils/RSATools.js";

//#region user api
const Users = {
   login: (entity) => {
      const _payload = {entity: entity};
      return MyRequest.post(Urls.LOGIN, _payload);
   },
   register: (entity) => {
      const _payload = {
         entity: {
            email: encodeByRSA(entity.email),
            authenticationString: encodeByRSA(entity.authenticationString),
         }
      };
      return MyRequest.post(Urls.REGISTER, _payload);
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
//#endregion

//#region debit api
/* === === === === === === === === === === === === === */
const Debits = {
   list: (entity, filter) => {
      const _payload = {entity: entity, filter: filter};
      console.log(_payload);
      return MyRequest.post(Urls.DEBIT('list').R, _payload);
   }
}
/* === === === === === === === === === === === === === */
//#endregion

const Service = {
   Users: Users,
   Debits: Debits
}


export {
   Service
}





