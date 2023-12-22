import {BaseService} from "@/static/js/service/BaseService.js";
import {User} from "@/static/js/model/User.js";
import {Check} from "@/static/js/utils/tools.js";
import axios from "axios";

class UserService extends BaseService {
   static create(user) {
      Check.classCorrect(user.name, User, user);
      axios.post({
         url: this.baseUrl + "/users"
      }).then((r) => {
      }).catch((e) => {
      }).finally(() => {
      });
   }

   static update(user, id) {
      Check.classCorrect(user.name, User, user);
      axios.patch({
         url: "http://localhost"
      })
   }
}