import UserManager from "@/views/i/user-manager.vue";
import Login from "@/views/login.vue";
import BaseI from "@/views/i/base-i.vue";
import DebitManager from "@/views/i/debit-manager.vue";
import BaseJ from "@/views/j/base-j.vue";
import {generateRoute} from "@/utils/generate.js"; 
/* ============================ route object ============================ */
const LOGIN = generateRoute(Login, 'login', '/login');

const REGISTER = generateRoute(Login, 'register', '/register');

//#region Manager
const MANAGER_DEBIT = generateRoute(DebitManager, 'debitManager', '/manager/debitManager');
const MANAGER_USER = generateRoute(UserManager, 'userManager', '/manager/userManager');

const MANAGER = generateRoute(BaseI, 'manager', '/manager', [MANAGER_DEBIT, MANAGER_USER], MANAGER_DEBIT);
//#endregion

//#region User
const HOME = generateRoute(BaseJ, 'user', '/', []);
//#endregion

/* ============================ route object ============================ */

/* ============================ export route item ============================ */
export {
   LOGIN,
   MANAGER_DEBIT,
   MANAGER_USER,
   HOME
}
/* ============================ export route item ============================ */


/* ============================ export route ============================ */
export const PredefinedRoutes = [
   LOGIN,
   REGISTER,
   MANAGER,
   HOME
]

/* ============================ export route ============================ */


// /**
//  * route 预定义类
//  */
// class RouteItem {
//
//    #component;
//    #name;
//    #path;
//    #children;
//
//    // #
//
//    /**
//     *
//     * @param component
//     * @param name
//     * @param path
//     */
//    constructor(component, name, path = `/${name}`) {
//       this.#component = component;
//       this.#name = name;
//       this.#path = path;
//       this.#children = [];
//    }
//
//    get name() {
//       return this.#name;
//    }
//
//    get path() {
//       return this.#path;
//    }
//
//    get component() {
//       return this.#component;
//    }
//
//    addChildren(val) {
//       this.#children.push(val);
//    }
// }

