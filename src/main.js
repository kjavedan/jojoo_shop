import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "element-plus/theme-chalk/src/message.scss";
import './assets/scss/main.scss'
import './styles/index.scss'
import Vue3TouchEvents from "vue3-touch-events";
import 'maz-ui/css/main.css'
import i18n from './i18n'
import en from 'element-plus/dist/locale/en'
import zhCn from 'element-plus/dist/locale/zh-cn'
import ar from 'element-plus/dist/locale/ar'
import fa from 'element-plus/dist/locale/fa'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Retrieve the user's preferred locale from localStorage
const userLocale = localStorage.getItem('user-locale')

const localeMap = {
    zh: zhCn,
    ar: ar,
    fa: fa,
    en: en,
  }
  
const app = createApp(App)

// Set the ElementPlus locale based on user's preference
if (userLocale && localeMap[userLocale]) {
    app.use(ElementPlus, { locale: localeMap[userLocale] })
} else {
    // Fallback to a default locale if user-locale is not set or invalid
    app.use(ElementPlus, { locale: en }) 
}

app.use(i18n)
app.use(createPinia())
app.use(Vue3TouchEvents)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
