//#region goto
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

import router from "@/router/index.js";

function goto(component, params = undefined) {
	router
		.push({
			name: component.name,
			params: params
		}).then(console.log);
}

export { goto };

function goto_(path) {
	router.push(path).then(console.log);
}

export { goto_ };
