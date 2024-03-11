//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion
import {MyRequest} from "@/api/MyRequest.js";
import {encodeByRSA} from "@/utils/rsa-tools.js";

const ServiceName = {
	BOOK_INFO: "bookInfos",
	PUBLISHER: "publishers",
	USER: "users",
	DEBIT: "debits",
	LOG: "logs",
}

//#region base api
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
class BaseService {
	constructor(serviceName) {
		this.list = (entity, filter) => MyRequest.post(`/${serviceName}/list/select`, {entity, filter});
		this.add = (entity) => MyRequest.post(`/${serviceName}/list/create`, {entity});
		this.get = (id) => MyRequest.post(`/${serviceName}/${id}/select`, {});
		this.remove = (id) => MyRequest.post(`/${serviceName}/${id}/delete`, {});
		this.update = (entity) => MyRequest.post(`/${serviceName}/${entity?.id}/update`, {entity});
	}
}

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region book info api
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const BookInfos = new BaseService(ServiceName.BOOK_INFO);
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
	return MyRequest.post("/login", {entity});
};

Users.register = (entity) => {
	const _payload = {
		entity: {
			email: encodeByRSA(entity.email),
			authenticationString: encodeByRSA(entity.authenticationString),
		}
	};
	return MyRequest.post("/register", _payload);
};

Users.verifyRegister = (token) => {
	const _payload = {
		entity: {
			token: token
		}
	}
	return MyRequest.post("/verify", _payload);
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

const Service = {
	Publishers,
	Users,
	Debits,
	BookInfos,
	Logs,
}

export {
	Service
}