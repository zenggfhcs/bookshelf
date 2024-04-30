import { Service } from "@/api/index.js";
import { Header } from "@/constant/Header.js";
import { NO_TOKEN_PAGE, PredefinedRoutes } from "@/router/route-value.js";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: PredefinedRoutes
});

router.beforeEach(async (to, from) => {
	console.log(to, from);

	// 枚举无 token 界面让其通过
	if (NO_TOKEN_PAGE.has(to.name)) {
	} else {
		// 如果不是登录界面，检查登录情况
		if (to.name !== "login" && !localStorage.getItem(Header.TOKEN)) {
			return { name: "login" };
		}

		// // 如果是管理端，检查用户角色
		// if (to.path.startsWith("/i/")) {
		// 	await Service.Roles.tokenRole()
		// 		.then(tokenInfo => {
		// 			if (tokenInfo?.name !== "root") {
		// 				return false;
		// 			}
		// 		});
		// }
	}

});

export default router;
