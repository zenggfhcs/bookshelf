//#region goto
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

import router from "@/router/Router.js";

const goto = (component, params) => {
	router.push({
		name: component.name,
		params: params,
	});
}

export {
	goto
}

