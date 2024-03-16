//#region goto
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

import router from "@/router/Router.js";

const goto = (component, params = undefined) => {
	router.push({
		name: component.name,
		params: params,
	}).then();
}

export {
	goto
}

