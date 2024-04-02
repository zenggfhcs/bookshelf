//#region file des
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion
import {MyRequest} from "@/api/MyRequest.js";
import {encodeByRSA} from "@/utils/rsa-tools.js";

const ServiceName = {
	BOOK: "books",
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
		this.list = () => MyRequest.get(`/${serviceName}`);
		this.add = (entity) => MyRequest.post(`/${serviceName}`, entity);
		this.get = (id) => MyRequest.get(`/${serviceName}/${id}`);
		this.remove = (id) => MyRequest.delete(`/${serviceName}/${id}/`);
		this.update = (entity) => MyRequest.patch(`/${serviceName}/${entity?.id}`, entity);
	}
}

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region book api
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const Books = new BaseService(ServiceName.BOOK);
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
	return MyRequest.post("/users:login", entity);
};

Users.register = (entity) => {
	const _encryptedEntity = {
		email: encodeByRSA(entity.email),
		authenticationString: encodeByRSA(entity.authenticationString),
	};
	return MyRequest.post("/users:register", _encryptedEntity);
};

Users.verifyEmail = (token) => {
	const _payload = {
		entity: {
			token: token
		}
	}
	return MyRequest.post("/users/email:verify", _payload);
};

Users.resetPassword = (entity) => {
	const _payload = {
		email: encodeByRSA(entity.email),
		authenticationString: encodeByRSA(entity.authenticationString)
	};
	return MyRequest.post("/users/password:reset", _payload);
}

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
	refresh: () => MyRequest.post("/token/refresh", {})
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion


//#region mail
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const Mail = {
	sendCode(entity) {
		return MyRequest.post("/send/code", entity);
	}
}
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
	Mail,
}

export {
	Service,
}