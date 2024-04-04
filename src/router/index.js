import { PredefinedRoutes } from "@/router/RouterValue.js";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: PredefinedRoutes,
});

export default router;
