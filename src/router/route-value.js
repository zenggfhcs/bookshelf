import BaseI from "@/layouts/base-i.vue";
import BaseJ from "@/layouts/base-j.vue";
import Public from "@/layouts/base-p.vue";
import Page404 from "@/views/error/404.vue";
import BookInfoAdd from "@/views/i/book-info/add.vue";
import BookInfoCheck from "@/views/i/book-info/check.vue";
import BookInfoManager from "@/views/i/book-info/index.vue";
import BookAdd from "@/views/i/book/add.vue";
import BookCheck from "@/views/i/book/check.vue";

import BookManager from "@/views/i/book/index.vue";

import ClcIndexManager from "@/views/i/clc-index/index.vue";
import DebitCheck from "@/views/i/debit/check.vue";
import DebitManager from "@/views/i/debit/index.vue";
import I from "@/views/i/index.vue";
import LogCheck from "@/views/i/log/check.vue";
import LogManager from "@/views/i/log/index.vue";
import My from "@/views/i/my/index.vue";
import UserCheck from "@/views/i/user/check.vue";
import UserManager from "@/views/i/user/index.vue";
import PermissionManager from "@/views/i/user/permission/index.vue";
import RoleCheck from "@/views/i/user/role/check.vue";
import RoleManager from "@/views/i/user/role/index.vue";
import Route from "@/views/i/user/route/index.vue";
import JBookDetail from "@/views/j/book-detail.vue";
import J from "@/views/j/index.vue";
import JMy from "@/views/j/my/index.vue";
import JQUERY from "@/views/j/query/index.vue";
import ReaderGuide from "@/views/j/reader-guide/index.vue";
import Login from "@/views/p/login.vue";
import Register from "@/views/p/register.vue";
import ResetPassword from "@/views/p/reset-password.vue";
import UserInfo from "@/views/p/user-info.vue";
import Verify from "@/views/p/verify.vue";

import WORKBENCH from "@/views/i/workbench/index.vue";

//#region route item
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

//#region public
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const LOGIN = {
	component: Login,
	name: "login",
	path: "/login",
	props: true,
	hidden: true
};

const REGISTER = {
	component: Register,
	name: "register",
	path: "/register",
	props: true,
	hidden: true
};

const RESET_PASSWORD = {
	component: ResetPassword,
	name: "resetPassword",
	path: "/reset-password",
	props: (route) => ({ token: route.query.token }),
	hidden: true
};

const VERIFY = {
	component: Verify,
	name: "verify",
	path: "/verify",
	props: (route) => ({ token: route.query.token }),
	hidden: true
};

const PUBLIC = {
	component: Public,
	name: "public",
	path: "/p",
	props: true,
	children: [LOGIN, REGISTER, RESET_PASSWORD, VERIFY],
	redirect: LOGIN,
	hidden: true
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region error
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const _404 = {
	component: Page404,
	name: "404",
	path: "/error/404",
	hidden: true
};

const ERROR = {
	component: null,
	name: "ERROR",
	path: "/:pathMatch(.*)*",
	props: true,
	children: [_404],
	redirect: _404,
	hidden: true
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region j
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const J_HOME = {
	component: J,
	name: "home",
	path: "/home",
	props: true,
	hidden: true
};

const J_QUERY = {
	component: JQUERY,
	name: "query",
	path: "/query",
	props: (route) => ({ keyword: route.query.keyword, tab: route.query.tab }),
	hidden: true
};

// const J_QUERY_QUICK = {
// 	component: QuickQuery,
// 	name: "jQueryQuick",
// 	path: "/j/query/quick",
// 	props: (route) => ({ keyword: route.query.keyword }),
// 	hidden: true
// };
//
// const J_QUERY_ADVANCED = {
// 	component: AdvancedQuery,
// 	name: "jQueryAdvanced",
// 	path: "/j/query/advanced",
// 	props: true,
// 	hidden: true
// };
//
// const J_QUERY_TYPE = {
// 	component: TypeQuery,
// 	name: "jQueryType",
// 	path: "/j/query/type",
// 	props: true,
// 	hidden: true
// };
//

const J_READER_GUIDE = {
	component: ReaderGuide,
	name: "readerGuide",
	path: "/readerGuide",
	props: true,
	hidden: true
};

const J_MY_LIB = {
	component: JMy,
	name: "myLib",
	path: "/myLib",
	props: true,
	hidden: true
};

const J_BOOK_DETAIL = {
	component: JBookDetail,
	name: "bookDetail",
	path: "/bookDetail:id",
	props: true,
	hidden: true
};

const BASE_J = {
	component: BaseJ,
	name: "j",
	path: "/",
	props: true,
	children: [J_HOME, J_QUERY, /*J_QUERY_QUICK, J_QUERY_ADVANCED, J_QUERY_TYPE, J_READER_GUIDE,*/J_READER_GUIDE, J_MY_LIB, J_BOOK_DETAIL],
	redirect: J_HOME,
	hidden: true
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region i
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

//#region book
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const BOOK = {
	component: BookManager,

	name: "bookManager",
	path: "/i/books",
	props: true,
	hidden: true
};

const BOOK_ADD = {
	component: BookAdd,

	name: "bookAdd",
	path: "/i/books/add",
	props: true,
	hidden: true
};

const BOOK_CHECK = {
	component: BookCheck,

	name: "bookCheck",
	path: "/i/books/:id",
	props: true,
	hidden: true
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region clc index
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const CLC_INDEX = {
	component: ClcIndexManager,
	name: "classifyInfo",
	path: "/i/clcIndexes",
	props: true,
	hidden: true
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region book info
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const BOOK_INFO = {
	component: BookInfoManager,
	name: "bookInfo",
	path: "/i/bookInfos",
	props: true,
	hidden: true
};

const BOOK_INFO_ADD = {
	component: BookInfoAdd,

	name: "bookInfoAdd",
	path: "/i/bookInfos/add",
	props: true,
	hidden: true
};

const BOOK_INFO_CHECK = {
	component: BookInfoCheck,
	name: "bookInfoCheck",
	path: "/i/bookInfos/:id",
	props: true,
	hidden: true
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region debit
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const DEBIT = {
	component: DebitManager,
	name: "debitManager",
	path: "/i/debits",
	props: true,
	hidden: true
};

const DEBIT_CHECK = {
	component: DebitCheck,
	name: "debitCheck",
	path: "/i/debits/:id",
	props: true,
	hidden: true
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region log
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const LOG = {
	component: LogManager,
	name: "logInfo",
	path: "/i/logs",
	props: true,
	hidden: true
};

const LOG_CHECK = {
	component: LogCheck,

	name: "logCheck",
	path: "/i/logs/:id",
	props: true,
	hidden: true
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region sys router
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const SYS_ROUTER = {
	component: Route,
	name: "routeInfo",
	path: "/i/users/routeInfo",
	props: true,
	hidden: true
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region publisher
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
// const PUBLISHER = {
// 	component: PublisherManager,
//
// 	name: "publisherManager",
// 	path: "/i/publishers",
// 	hidden: true,
// };
//
// const PUBLISHER_ADD = {
// 	component: PublisherAdd,
//
// 	name: "publisherAdd",
// 	path: "/i/publishers/add",
// 	hidden: true,
// };
//
// const PUBLISHER_CHECK = {
// 	component: PublisherCheck,
//
// 	name: "publisherCheck",
// 	path: "/i/publishers/:id",
// 	props: true,
// 	hidden: true,
// };
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region user
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const USER = {
	component: UserManager,
	name: "userInfo",
	path: "/i/users",
	hidden: true
};

const USER_CHECK = {
	component: UserCheck,
	name: "userCheck",
	path: "/i/users/:id",
	props: true,
	hidden: true
};

//#region role
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const ROLE = {
	component: RoleManager,
	name: "roleInfo",
	path: "/i/users/roles",
	hidden: true
};

const ROLE_CHECK = {
	component: RoleCheck,
	name: "roleCheck",
	path: "/i/users/roles/:id",
	props: true,
	hidden: true
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region permission
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const PERMISSION = {
	component: PermissionManager,
	name: "permissionInfo",
	path: "/i/users/permissions",
	hidden: true
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region my
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const I_MY = {
	component: My,
	name: "selfInfo",
	path: "/i/myInfo",
	props: true,
	hidden: true
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

const I_HOME = {
	component: I,
	name: "IHome",
	path: "/i/index"
};

const I_WORKBENCH = {
	component: WORKBENCH,
	name: "workbench",
	path: "/i/workbench"
}

const I_USER_INFO = {
	component: UserInfo,
	name: "iUserInfo",
	path: "/i/my-info",
	props: true,
	hidden: true
};

const BASE_I = {
	children: [
		I_HOME,
		I_WORKBENCH,
		I_USER_INFO,
		DEBIT,
		DEBIT_CHECK,
		BOOK,
		BOOK_CHECK,
		BOOK_ADD,
		BOOK_INFO,
		BOOK_INFO_CHECK,
		BOOK_INFO_ADD,
		CLC_INDEX,
		USER,
		USER_CHECK,
		ROLE, ROLE_CHECK, PERMISSION,
		LOG,
		LOG_CHECK, SYS_ROUTER,
		I_MY
	],
	redirect: I_HOME,
	component: BaseI,
	name: "i",
	path: "/i",

	props: true,
	hidden: true
};
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
	I_HOME,
	I_USER_INFO,
	DEBIT,
	DEBIT_CHECK,
	BOOK,
	BOOK_CHECK,
	BOOK_ADD,
	BOOK_INFO,
	BOOK_INFO_CHECK,
	BOOK_INFO_ADD,
	CLC_INDEX,
	USER,
	USER_CHECK,
	ROLE,
	ROLE_CHECK,
	PERMISSION,
	LOG,
	LOG_CHECK, SYS_ROUTER,
	I_MY,

	// j
	BASE_J,
	J_HOME, J_QUERY,
	J_READER_GUIDE,
	// J_QUERY_TYPE, J_QUERY_QUICK, J_QUERY_ADVANCED, J_READER_GUIDE,
	J_BOOK_DETAIL,
	J_MY_LIB
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region export routes
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
export const PredefinedRoutes = [PUBLIC, BASE_I, BASE_J, ERROR];
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


const NO_TOKEN_PAGE = new Set();
{
	NO_TOKEN_PAGE.add("home");
	NO_TOKEN_PAGE.add("jIndex");
	NO_TOKEN_PAGE.add("login");
	NO_TOKEN_PAGE.add("register");
	NO_TOKEN_PAGE.add("resetPassword");
	NO_TOKEN_PAGE.add("verify");
}

export {
	NO_TOKEN_PAGE
};

