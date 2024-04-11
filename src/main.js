import router from "@/router/index.js";
import { createPinia } from "pinia";
import { createApp } from "vue";
import "virtual:uno.css";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.config.errorHandler = (err, vm, info) => {
	console.log("[全局异常]", err, vm, info);
};

app.mount("#app");
