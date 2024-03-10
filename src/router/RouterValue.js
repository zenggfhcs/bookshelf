import {generateRoute} from "@/utils/generate.js";
import Page404 from "@/views/error/404.vue";
import BaseI from "@/views/i/base-i.vue";
import BookInfoManager from "@/views/i/book-infos.vue";
import BookManager from "@/views/i/books.vue";
import DebitManager from "@/views/i/debits.vue";
import LogManager from "@/views/i/logs.vue";
import Manager from "@/views/i/manager.vue";
import PublisherManager from "@/views/i/publishers.vue";
import UserManager from "@/views/i/users.vue";
import BaseJ from "@/views/j/base-j.vue";
import Login from "@/views/login.vue";
import Register from "@/views/register.vue";
import ResetPassword from "@/views/reset-password.vue";
import Verify from "@/views/verify.vue";
/* ============================ route object ============================ */
const LOGIN = generateRoute(Login, 'login', '/login');

const REGISTER = generateRoute(Register, 'register', '/register');

const RESET_PASSWORD = generateRoute(ResetPassword, 'resetPassword', '/reset-password');


const VERIFY = generateRoute(Verify, 'verify', '/verify', undefined, undefined, {props: route => ({token: route.query.token})});

//#region Manager
const MANAGE_HOME = generateRoute(Manager, 'manage-home', '/manage/index')
const MANAGE_DEBIT = generateRoute(DebitManager, 'debitManager', '/manage/debits');
const MANAGE_BOOK = generateRoute(BookManager, 'bookManager', '/manage/books');
const MANAGE_BOOK_INFO = generateRoute(BookInfoManager, 'bookInfoManager', '/manage/bookInfos');

const MANAGE_PUBLISHER = generateRoute(PublisherManager, 'publisherManager', '/manage/publishers');
const MANAGE_USER = generateRoute(UserManager, 'userManager', '/manage/users');

const MANAGE_LOG = generateRoute(LogManager, 'logManager', '/manage/logs');

const MANAGE = generateRoute(BaseI, 'manage', '/manage', [MANAGE_HOME, MANAGE_DEBIT, MANAGE_BOOK, MANAGE_BOOK_INFO, MANAGE_PUBLISHER, MANAGE_USER, MANAGE_LOG]);
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
	MANAGE_DEBIT,
	MANAGE_USER,
	MANAGE_BOOK,
	MANAGE_BOOK_INFO,
	MANAGE_PUBLISHER,
	MANAGE_LOG,
	HOME
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


//#region export routes
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
export const PredefinedRoutes = [
	LOGIN,
	REGISTER,
	VERIFY,
	RESET_PASSWORD,
	MANAGE,
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

