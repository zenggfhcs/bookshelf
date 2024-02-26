import {createRouter, createWebHistory} from 'vue-router';
import {PredefinedRoutes} from "@/router/RouterValue.js";

const router = createRouter({
   history: createWebHistory(),
   routes: PredefinedRoutes,
});

export default router;
