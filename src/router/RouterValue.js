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
import My from "@/views/i/my/index.vue";
import PublisherAdd from "@/views/i/publisher/add.vue";
import PublisherCheck from "@/views/i/publisher/check.vue";
import PublisherManager from "@/views/i/publisher/index.vue";
import UserCheck from "@/views/i/user/check.vue";
import UserManager from "@/views/i/user/index.vue";
import BaseJ from "@/views/j/base-j.vue";
import Check from "@/views/j/check.vue";
import J from "@/views/j/index.vue";
import Statistics from "@/views/j/statistics.vue";
import Public from "@/views/p/base-p.vue";
import Login from "@/views/p/login.vue";
import Register from "@/views/p/register.vue";
import ResetPassword from "@/views/p/reset-password.vue";
import UserInfo from "@/views/p/user-info.vue";
import Verify from "@/views/p/verify.vue";

//#region route item
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

//#region public
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const LOGIN = {
	component: Login,
	name: "login",
	path: "/login",
	props: true,
	hidden: true,
};

const REGISTER = {
	component: Register,
	name: "register",
	path: "/register",
	props: true,
	hidden: true,
};

const RESET_PASSWORD = {
	component: ResetPassword,
	name: "resetPassword",
	path: "/reset-password",
	props: true,
	hidden: true,
};

const VERIFY = {
	component: Verify,
	name: "verify",
	path: "/verify",
	props: route => ({token: route.query.token}),
	hidden: true,
};

const PUBLIC = {
	component: Public,
	name: "public",
	path: "/p",
	props: true,
	children: [LOGIN, REGISTER, RESET_PASSWORD, VERIFY],
	redirect: LOGIN,
	hidden: true,
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region error
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const _404 = {
	component: Page404,
	name: "404",
	path: "/error/404",
	hidden: true,
}

const ERROR = {
	component: null,
	name: "ERROR",
	path: "/:pathMatch(.*)*",
	props: true,
	children: [_404,],
	redirect: _404,
	hidden: true,
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region j
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const J_HOME = {
	component: J,
	name: "jIndex",
	path: "/j/index",
	props: true,
	hidden: true,
}

const J_USER_INFO = {
	component: UserInfo,
	name: "jUserInfo",
	path: "/j/my-info",
	props: true,
	hidden: true,
}

const J_CHECK = {
	component: Check,
	name: "jCheck",
	path: "/j/check",
	props: true,
	hidden: true,
}

const J_STATISTICS = {
	component: Statistics,
	name: "jStatistics",
	path: "/j/statistics",
	props: true,
	hidden: true,
}

const BASE_J = {
	component: BaseJ,
	name: "j",
	path: "/",
	props: true,
	children: [J_HOME, J_CHECK, J_USER_INFO, J_STATISTICS],
	redirect: J_HOME,
	hidden: true,
}
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
	hidden: true,
};

const BOOK_ADD = {
	component: BookAdd,

	name: "bookAdd",
	path: "/i/books/add",
	props: true,
	hidden: true,
};

const BOOK_CHECK = {
	component: BookCheck,

	name: "bookCheck",
	path: "/i/books/:id",
	props: true,
	hidden: true,
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region book info
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const BOOK_INFO = {
	component: BookInfoManager,

	name: "bookInfoManager",
	path: "/i/bookInfos",
	props: true,
	hidden: true,
};

const BOOK_INFO_ADD = {
	component: BookInfoAdd,

	name: "bookInfoAdd",
	path: "/i/bookInfos/add",
	props: true,
	hidden: true,
};

const BOOK_INFO_CHECK = {
	component: BookInfoCheck,

	name: "bookInfoCheck",
	path: "/i/bookInfos/:id",
	props: true,
	hidden: true,
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
	hidden: true,
};

const DEBIT_CHECK = {
	component: DebitCheck,
	name: "debitCheck",
	path: "/i/debits/:id",
	props: true,
	hidden: true,
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region log
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const LOG = {
	component: LogManager,

	name: "logManager",
	path: "/i/logs",
	props: true,
	hidden: true,
};

const LOG_CHECK = {
	component: LogCheck,

	name: "logCheck",
	path: "/i/logs/:id",
	props: true,
	hidden: true,
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region publisher
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const PUBLISHER = {
	component: PublisherManager,

	name: "publisherManager",
	path: "/i/publishers",
	hidden: true,
};

const PUBLISHER_ADD = {
	component: PublisherAdd,

	name: "publisherAdd",
	path: "/i/publishers/add",
	hidden: true,
};

const PUBLISHER_CHECK = {
	component: PublisherCheck,

	name: "publisherCheck",
	path: "/i/publishers/:id",
	props: true,
	hidden: true,
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region user
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const USER = {
	component: UserManager,
	name: "userManager",
	path: "/i/users",
	hidden: true,
};

const USER_CHECK = {
	component: UserCheck,
	name: "userCheck",
	path: "/i/users/:id",
	props: true,
	hidden: true,
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region my
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const MY = {
	component: My,
	name: "my",
	path: "/i/my",
	props: true,
	hidden: true
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

const I_HOME = {
	component: I,
	name: "iIndex",
	path: "/i/index",
};


const I_USER_INFO = {
	component: UserInfo,
	name: "iUserInfo",
	path: "/i/my-info",
	props: true,
	hidden: true,
}

const BASE_I = {
	children: [
		I_HOME, I_USER_INFO,
		DEBIT, DEBIT_CHECK,
		BOOK, BOOK_CHECK, BOOK_ADD,
		BOOK_INFO, BOOK_INFO_CHECK, BOOK_INFO_ADD,
		PUBLISHER, PUBLISHER_CHECK, PUBLISHER_ADD,
		USER, USER_CHECK,
		LOG, LOG_CHECK,
		MY,
	],
	redirect: I_HOME,
	component: BaseI,
	name: "i",
	path: "/i",

	props: true,
	hidden: true,
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
	USER,
	USER_CHECK,
	BOOK,
	BOOK_CHECK,
	BOOK_ADD,
	BOOK_INFO,
	BOOK_INFO_CHECK,
	BOOK_INFO_ADD,
	PUBLISHER,
	LOG,
	LOG_CHECK,
	PUBLISHER_CHECK,
	PUBLISHER_ADD,
	MY,

	// j
	J_HOME,
	J_CHECK,
	J_USER_INFO,
	J_STATISTICS,
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


//#region export routes
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
export const PredefinedRoutes = [
	PUBLIC,
	BASE_I,
	BASE_J,
	ERROR,
]
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

// todo 添加路由守卫，更换页面title https://www.cnblogs.com/levywang/p/13532079.html
// router.js