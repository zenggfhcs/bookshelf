import UserManager from "@/views/i/user-manager.vue";
import DataShow from "@/views/i/data-show.vue";
import Test from '@/views/test.vue';

/**
 * route 预定义类
 */
class RouteItem {

   #component;
   #name;
   #path;

   // #

   /**
    *
    * @param component
    * @param name
    * @param path
    */
   constructor(component, name, path = `/${name}`) {
      this.#component = component;
      this.#name = name;
      this.#path = path;
   }

   get name() {
      return this.#name;
   }

   get path() {
      return this.#path;
   }

   get component() {
      return this.#component;
   }
}

/* ============================ route object ============================ */
const HOME = new RouteItem(Test, '');
const MANAGER_USER = new RouteItem(UserManager, 'userManager');

const MANAGER_DEBIT = new RouteItem(DataShow, 'debitManager');
/* ============================ route object ============================ */


/* ============================ export route ============================ */
export const PredefinedRoutes = [
   HOME,
   MANAGER_DEBIT,
   MANAGER_USER,
]
/* ============================ export route ============================ */

