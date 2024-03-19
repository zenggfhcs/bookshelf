import router from '@/router/Router.js'
import store from "@/store";
import {createApp} from 'vue'
import App from './App.vue'
import 'virtual:uno.css'

// todo 使用 vuex，保留表格状态

const app = createApp(App)

app.use(router)

app.use(store)

// main.ts
app.config.errorHandler = (err, vm, info) => {
	console.log('[全局异常]', err, vm, info)
}

app.mount('#app')