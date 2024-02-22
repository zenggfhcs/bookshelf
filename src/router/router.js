import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/components/home.vue';
import IUserManager from "@/views/i/i-user-manager.vue";
import IDataShow from "@/views/i/i-data-show.vue";

const routes = [
   {
      path: '/',
      name: 'index',
      component: IDataShow
   }, {
      path: '/home',
      name: 'home',
      component: Home
   }, {
      path: '/userManager',
      name: 'userManager',
      component: IUserManager
   }
];

const router = createRouter({
   history: createWebHistory(), routes
});

export default router;
