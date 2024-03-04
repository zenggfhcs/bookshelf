import UserManager from "@/views/i/users.vue";
import Login from "@/views/login.vue";
import BaseI from "@/views/i/base-i.vue";
import DebitManager from "@/views/i/debits.vue";
import BaseJ from "@/views/j/base-j.vue";
import Page404 from "@/views/error/404.vue";
import {generateRoute} from "@/utils/generate.js";
import Manager from "@/views/i/manager.vue";
import BookManager from "@/views/i/books.vue";
import BookInfoManager from "@/views/i/book-infos.vue";
import Register from "@/views/register.vue";
import ResetPassword from "@/views/reset-password.vue";
/* ============================ route object ============================ */
const LOGIN = generateRoute(Login, 'login', '/login');

const REGISTER = generateRoute(Register, 'register', '/register');

const RESET_PASSWORD = generateRoute(ResetPassword, 'resetPassword', '/reset-password');

//#region Manager
const MANAGER_HOME = generateRoute(Manager, 'manage-home', '/manage/index')
const MANAGER_DEBIT = generateRoute(DebitManager, 'debitManager', '/manage/debits');
const MANAGER_USER = generateRoute(UserManager, 'userManager', '/manage/users');
const MANAGER_BOOK = generateRoute(BookManager, 'bookManager', '/manage/books');
const MANAGER_BOOK_INFO = generateRoute(BookInfoManager, 'bookInfoManager', '/manage/bookInfos')

const MANAGER = generateRoute(BaseI, 'manage', '/manage', [MANAGER_HOME, MANAGER_DEBIT, MANAGER_USER, MANAGER_BOOK, MANAGER_BOOK_INFO]);
//#endregion

//#region User
const HOME = generateRoute(BaseJ, 'user', '/', []);
//#endregion

/* ============================ route object ============================ */

//#region error result router
const _404 = generateRoute(Page404, '404', '/error/404');
const ERROR = generateRoute(Page404, 'error', '/error', [_404]);
const UNDEFINED = generateRoute(null, 'undefined', '/:pathMatch(.*)*', [_404]);
//#endregion

//#region export route item
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
export {
   LOGIN,
   MANAGER_DEBIT,
   MANAGER_USER,
   MANAGER_BOOK,
   MANAGER_BOOK_INFO,
   HOME
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


//#region export routes
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
export const PredefinedRoutes = [
   LOGIN,
   REGISTER,
   RESET_PASSWORD,
   MANAGER,
   HOME,
   ERROR,
   UNDEFINED,
]
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


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

