import Page404 from "@/views/error/404.vue";
import BaseI from "@/views/i/base-i.vue";
import BookInfoAdd from "@/views/i/book-info/add.vue";
import BookInfoCheck from "@/views/i/book-info/check.vue";
import BookInfoManager from "@/views/i/book-info/index.vue";
import BookAdd from "@/views/i/book/add.vue";
import BookCheck from "@/views/i/book/check.vue";
import BookManager from "@/views/i/book/index.vue";
import DebitCheck from "@/views/i/debit/check.vue";
import DebitManager from "@/views/i/debit/index.vue";
import I from "@/views/i/index.vue";
import LogCheck from "@/views/i/log/check.vue";
import LogManager from "@/views/i/log/index.vue";
import PublisherAdd from "@/views/i/publisher/add.vue";
import PublisherCheck from "@/views/i/publisher/check.vue";
import PublisherManager from "@/views/i/publisher/index.vue";
import UserCheck from "@/views/i/user/check.vue";
import UserManager from "@/views/i/user/index.vue";
import BaseJ from "@/views/j/base-j.vue";
import J from "@/views/j/home.vue";
import Public from "@/views/p/base-p.vue";
import Login from "@/views/p/login.vue";
import Register from "@/views/p/register.vue";
import ResetPassword from "@/views/p/reset-password.vue";
import Verify from "@/views/p/verify.vue";


//#region g route item
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const g = (component, name, path, props = undefined, ch = undefined, r = undefined) => {
	return {
		component: component,
		name: name,
		path: path,
		props: props,
		children: ch,
		redirect: r,
		hidden: true,
	};
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region route item
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

//#region public
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const LOGIN = g(Login, "login", "/login", true);

const REGISTER = g(Register, "register", "/register", true);

const RESET_PASSWORD = g(ResetPassword, "resetPassword", "/reset-password", true);

const VERIFY = g(Verify, "verify", "/verify", route => ({token: route.query.token}));

const PUBLIC = g(Public, "public", "/p", true, [LOGIN, REGISTER, RESET_PASSWORD, VERIFY], LOGIN);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region error
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const _404 = g(Page404, "404", "/error/404");

const ERROR = g(Page404, "error", "/error", true, [_404], _404);

const UNDEFINED = g(null, "undefined", "/:pathMatch(.*)*", true, [ERROR], ERROR);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region j
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const J_HOME = g(J, "jIndex", "/j/index", true);

const BASE_J = g(BaseJ, "j", "/", true,
	[
		J_HOME
	],
	J_HOME
);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region i
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

//#region book
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const BOOK = g(BookManager, "bookManager", "/i/books", true);

const BOOK_ADD = g(BookAdd, "bookAdd", "/i/books/add", true);

const BOOK_CHECK = g(BookCheck, "bookCheck", "/i/books/:id", true);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region book info
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const BOOK_INFO = g(BookInfoManager, "bookInfoManager", "/i/bookInfos", true);

const BOOK_INFO_ADD = g(BookInfoAdd, "bookInfoAdd", "/i/bookInfos/add", true);

const BOOK_INFO_CHECK = g(BookInfoCheck, "bookInfoCheck", "/i/bookInfos/:id", true);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region debit
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const DEBIT = g(DebitManager, "debitManager", "/i/debits", true);

const DEBIT_CHECK = g(DebitCheck, "debitCheck", "/i/debits/:id", true);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region log
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const LOG = g(LogManager, "logManager", "/i/logs", true);

const LOG_CHECK = g(LogCheck, "logCheck", "/i/logs/:id", true);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region publisher
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const PUBLISHER_ADD = g(PublisherAdd, "publisherAdd", "/i/publishers/add");

const PUBLISHER_CHECK = g(PublisherCheck, "publisherCheck", "/i/publishers/:id", true);

const PUBLISHER = g(PublisherManager, "publisherManager", "/i/publishers");
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region user
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const USER = g(UserManager, "userManager", "/i/users");

const USER_CHECK = g(UserCheck, "userCheck", "/i/users/:id", true);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

const I_HOME = g(I, "iIndex", "/i/index")

const BASE_I = g(BaseI, "i", "/i", true,
	[
		I_HOME,
		DEBIT, DEBIT_CHECK,
		BOOK, BOOK_CHECK, BOOK_ADD,
		BOOK_INFO, BOOK_INFO_CHECK, BOOK_INFO_ADD,
		PUBLISHER, PUBLISHER_CHECK, PUBLISHER_ADD,
		USER, USER_CHECK,
		LOG, LOG_CHECK,
	],
	I_HOME
);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


//#region export route item
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
export {
	// common
	LOGIN,
	REGISTER,
	RESET_PASSWORD,
	VERIFY,

	// i
	BASE_I,
	DEBIT, DEBIT_CHECK,
	USER, USER_CHECK,
	BOOK,
	BOOK_INFO, BOOK_INFO_CHECK, BOOK_INFO_ADD,
	PUBLISHER,
	LOG, LOG_CHECK,
	PUBLISHER_CHECK, PUBLISHER_ADD,

	// j
	J_HOME
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


//#region export routes
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
export const PredefinedRoutes = [
	PUBLIC,
	BASE_I,
	BASE_J,
	UNDEFINED,
]
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


