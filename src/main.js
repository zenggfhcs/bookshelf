import router from '@/router/Router.js'
import {createPinia} from 'pinia'
import {createApp} from 'vue'
import 'virtual:uno.css'
import App from './App.vue'

const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)


app.config.errorHandler = (err, vm, info) => {
	console.log('[全局异常]', err, vm, info)
}

app.mount('#app')