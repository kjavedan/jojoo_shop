import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "element-plus/theme-chalk/src/message.scss";
import './assets/scss/main.scss'
import './styles/index.scss'
import Vue3TouchEvents from "vue3-touch-events";
import 'maz-ui/css/main.css'



import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const app = createApp(App)


app.use(createPinia())
app.use(Vue3TouchEvents)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
