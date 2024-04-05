//#region goto
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

import router from "@/router/index.js";

function goto(component, params = undefined) {
	router
		.push({
			name: component.name,
			params: params,
		})
		.then();
}

export { goto };
