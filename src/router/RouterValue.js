import Page404 from "@/views/error/404.vue";
import BaseI from "@/views/i/base-i.vue";
import BookInfoManager from "@/views/i/book-info/index.vue";
import BookManager from "@/views/i/book/books.vue";
import DebitManager from "@/views/i/debit/index.vue";
import LogCheck from "@/views/i/log/check.vue";
import LogManager from "@/views/i/log/index.vue";
import Manager from "@/views/i/manager.vue";
import PublisherAdd from "@/views/i/publisher/add.vue";
import PublisherCheck from "@/views/i/publisher/check.vue";
import PublisherManager from "@/views/i/publisher/index.vue";
import UserManager from "@/views/i/user/index.vue";
import BaseJ from "@/views/j/base-j.vue";
import Login from "@/views/login.vue";
import Register from "@/views/register.vue";
import ResetPassword from "@/views/reset-password.vue";
import Verify from "@/views/verify.vue";

//#region g route item
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const gRoute = (c, n, p, ch = undefined, r = undefined, ext = undefined) => {
	const res = {
		component: c,
		name: n,
		path: p,
		children: ch,
		redirect: r === undefined ? ch?.[0] : r,
		hidden: true,
		props: true
	}
	for (const prop in ext) {
		res[prop] = ext[prop];
	}

	return res;
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region route item
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

//#region book
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const MANAGE_BOOK = {
	component: BookManager,
	name: "bookManager",
	path: "/manage/books",
	hidden: true,
	props: true,
}

const BOOK_ADD = null // todo
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

/* ============================ route object ============================ */
const LOGIN = gRoute(Login, "login", "/login");

const REGISTER = gRoute(Register, "register", "/register");

const RESET_PASSWORD = gRoute(ResetPassword, "resetPassword", "/reset-password");


const VERIFY = gRoute(Verify, "verify", "/verify", undefined, undefined, {props: route => ({token: route.query.token})});

//#region Manager
const MANAGE_HOME = gRoute(Manager, "manage-home", "/manage/index")
const MANAGE_DEBIT = gRoute(DebitManager, "debitManager", "/manage/debits");

const MANAGE_BOOK_INFO = gRoute(BookInfoManager, "bookInfoManager", "/manage/bookInfos");

const PUBLISHER_ADD = gRoute(PublisherAdd, "publisherAdd", "/manage/publishers/add");
const PUBLISHER_CHECK = gRoute(PublisherCheck, "publisherCheck", "/manage/publishers/:id");
const MANAGE_PUBLISHER = gRoute(PublisherManager, "publisherManager", "/manage/publishers");
const MANAGE_USER = gRoute(UserManager, "userManager", "/manage/users");

const LOG_CHECK = gRoute(LogCheck, "logCheck", "/manage/logs/:id");
const MANAGE_LOG = gRoute(LogManager, "logManager", "/manage/logs");

const MANAGE = gRoute(BaseI, "manage", "/manage", [
	MANAGE_HOME,
	MANAGE_DEBIT,
	MANAGE_BOOK,
	MANAGE_BOOK_INFO,
	MANAGE_PUBLISHER, PUBLISHER_CHECK, PUBLISHER_ADD,
	MANAGE_USER,
	MANAGE_LOG, LOG_CHECK,
]);
//#endregion

//#region User
const HOME = gRoute(BaseJ, "user", "/", []);
//#endregion

/* ============================ route object ============================ */

//#region error result router
const _404 = gRoute(Page404, "404", "/error/404");
const ERROR = gRoute(Page404, "error", "/error", [_404]);
const UNDEFINED = gRoute(null, "undefined", "/:pathMatch(.*)*", [_404]);
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
	LOG_CHECK,
	PUBLISHER_CHECK, PUBLISHER_ADD,
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
	LOG_CHECK,
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

