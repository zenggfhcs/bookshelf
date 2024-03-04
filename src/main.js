import {createApp} from 'vue'
import App from './App.vue'
import router from '@/router/Router.js'
import 'virtual:uno.css'

const app = createApp(App)
app.use(router)

app.mount('#app')