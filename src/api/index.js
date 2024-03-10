import {MyRequest} from "@/api/MyRequest.js";
import {Urls} from "@/api/UrlProvider.js"
import {encodeByRSA} from "@/utils/RSATools.js";

//#region publisher api
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const Publishers = {
	list: (entity, filter) => {
		const _payload = {entity, filter};
		return MyRequest.post(Urls.PUBLISHER("list").R, _payload);
	},
	add: (entity) => {
		const _payload = {entity}
		return MyRequest.post(Urls.PUBLISHER("list").C, _payload);
	},
	remove: (id) => {
		return MyRequest.post(Urls.PUBLISHER(id).D, {});
	},
	getToUpdate: (id) => {
		return MyRequest.post(Urls.PUBLISHER(id).R, {});
	},
	update: (entity) => {
		return MyRequest.post(Urls.PUBLISHER(entity.id).U, {entity});
	}
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

//#region user api
/* === === === === === === === === === === === === === === === === === === === === === === === === === === */
const Users = {
	login: (entity) => {
		const _payload = {entity: entity};
		return MyRequest.post(Urls.LOGIN, _payload);
	},
	register: (entity) => {
		const _payload = {
			entity: {
				email: encodeByRSA(entity.email),
				authenticationString: encodeByRSA(entity.authenticationString),
			}
		};
		return MyRequest.post(Urls.REGISTER, _payload);
	},
	verifyRegister: (token) => {
		const _payload = {
			entity: {
				token: token
			}
		}
		return MyRequest.post(Urls.VERIFY, _payload);
	},
	list: (entity, filter) => {
		const _payload = {entity: entity, filter: filter};
		return MyRequest.post(Urls.USER("list").R, _payload);
	},
	detail: () => {

	},
	add: () => {

	},
	remove: () => {

	},
	borrowing: () => {

	},
	return: () => {

	}
}
/* === === === === === === === === === === === === === === === === === === === === === === === === === === */
//#endregion

//#region debit api
/* === === === === === === === === === === === === === === === === === === === === === === === === === === */
const Debits = {
	list: (entity, filter) => {
		const _payload = {entity: entity, filter: filter};

		return MyRequest.post(Urls.DEBIT("list").R, _payload);
	}
}

/* === === === === === === === === === === === === === === === === === === === === === === === === === === */
//#endregion

//#region log api
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
const Logs = {
	list: (entity, filter) => {
		return MyRequest.post(Urls.LOG("list").R, {entity, filter});
	}
}
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

const Service = {
	Publishers,
	Users,
	Debits,
	Logs,
}


export {
	Service
}


const gPayload = (entity = undefined, filter = undefined, pre = undefined) => {
	const _payload = {};
	if (entity)
		_payload["entity"] = entity;
	if (filter)
		_payload["filter"] = filter;
	return _payload;
}


