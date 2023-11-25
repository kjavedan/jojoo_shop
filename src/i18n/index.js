import { createI18n } from 'vue-i18n'

// This object contains the app full text in 3 languages: Chinese, Thai, and Vietnamese 
const messages = {
  en: {
    language: 'language',
    settings: 'settings',
  },
  zh: {
    language: 'zh'
  },
  ar: {
 language: 'ar'
  },
  fa: {
    language: 'fa'
  },

}

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  messages,
  globalInjection: true
})
