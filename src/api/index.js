//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion
import { instance } from "@/api/instance.js";
import { encodeByRSA } from "@/utils/rsa-tools.js";

//#region pre defined request
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const request = {
	post: (url, entity) => {
		return instance.post(url, entity);
	},
	get: (url) => {
		return instance.get(url);
	},
	patch: (url, entity) => {
		return instance.patch(url, entity);
	},
	delete: (url) => {
		return instance.delete(url);
	}
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region service name
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const ServiceName = {
	BOOK: "books",
	BOOK_INFO: "bookInfos",
	PUBLISHER: "publishers",
	USER: "users",
	DEBIT: "debits",
	LOG: "logs",
	ROLE: "roles",
	CLC_INDEX: "clcIndexes",
	PERMISSION: "permissions"
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region base api
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
class BaseService {
	constructor(serviceName) {
		this.list = () => request.get(`/${serviceName}`);
		this.add = (entity) => request.post(`/${serviceName}`, entity);
		this.get = (id) => request.get(`/${serviceName}/${id}`);
		this.remove = (id) => request.delete(`/${serviceName}/${id}`);
		this.update = (entity) =>
			request.patch(`/${serviceName}/${entity?.id}`, entity);
		this.filteredList = (filterPayload) =>
			request.post(`/${serviceName}/list:filter`, filterPayload);
	}
}

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region book api
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const Books = new BaseService(ServiceName.BOOK);

Books.getDamageLevels = () => {
	return request.get(`/books/damageLevels`);
};

Books.getByInfoId = (id) => {
	return request.get(`/books/bookInfoId/${id}`);
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region book info api
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const BookInfos = new BaseService(ServiceName.BOOK_INFO);

BookInfos.getFirstLevelType = () => {
	return request.post(`/bookInfos/bookType:firstLevel`);
};

BookInfos.quickQuery = (filterPayload) =>
	request.post(`/bookInfos/list:quick-query`, filterPayload);

BookInfos.getByKeyword = (keyword) => {
	return request.get(`/bookInfos/keyword/${keyword}`);
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region publisher api
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const Publishers = new BaseService(ServiceName.PUBLISHER);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region user api
/* === === === === === === === === === === === === === === === === === === === === === === === === === === */
const Users = new BaseService(ServiceName.USER);

Users.login = (entity) => {
	return request.post("/users:login", entity);
};

Users.register = (entity) => {
	const _encryptedEntity = {
		email: encodeByRSA(entity.email),
		authenticationString: encodeByRSA(entity.authenticationString)
	};
	return request.post("/users:register", _encryptedEntity);
};

Users.verifyEmail = (token) => {
	const _entity = {
		token: token
	};
	return request.post("/users/email:verify", _entity); // todo test this fuc
};

Users.resetPassword = (entity) => {
	const _payload = {
		email: encodeByRSA(entity.email),
		authenticationString: encodeByRSA(entity.authenticationString),
		revision: entity.revision,
		remark: entity.remark
	};
	return request.post("/users/password:reset", _payload);
};

Users.sendMailForResetPassword = (entity) => {
	return request.post("/users/password:reset/email:sendResetLink", entity);
};

Users.tokenUser = () => {
	return request.get("/users/tokenUser");
};

Users.borrowing = null;

Users.return = null;
/* === === === === === === === === === === === === === === === === === === === === === === === === === === */
//#endregion

//#region debit api
/* === === === === === === === === === === === === === === === === === === === === === === === === === === */
const Debits = new BaseService(ServiceName.DEBIT);
/* === === === === === === === === === === === === === === === === === === === === === === === === === === */
//#endregion

//#region log api
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const Logs = new BaseService(ServiceName.LOG);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region token
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const Token = {
	refresh: () => request.post("/token:refresh", {}),
	verify: (token) => request.post("/token:verify", { token })
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region clc index
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const ClcIndexes = new BaseService(ServiceName.CLC_INDEX);

ClcIndexes.firstLevel = () => {
	return request.get(`/clcIndexes/firstLevel`);
};

ClcIndexes.getByKeyword = (key) => {
	return request.get(`/clcIndexes/${key}:startWith`);
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region role
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const Roles = new BaseService(ServiceName.ROLE);

Roles.tokenRole = () => {
	return request.get("/roles/tokenRole");
};
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region permission
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const Permissions = new BaseService(ServiceName.PERMISSION);
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

const Service = {
	Publishers,
	Users,
	Debits,
	BookInfos,
	Books,
	Logs,
	Token,
	Roles,
	ClcIndexes,
	Permissions
};

export { Service };
