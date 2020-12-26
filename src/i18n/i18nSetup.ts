import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

export const LOCAL_STORAGE_LANGUAGE_KEY = 'scarabeus.language'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) || '',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
    keySeparator: '.',
  })

export default i18n
