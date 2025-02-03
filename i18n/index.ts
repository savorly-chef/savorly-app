import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Storage from 'expo-sqlite/kv-store'

// Import all language files
import en from './locales/en.json'
// import es from './locales/es.json'
// import fr from './locales/fr.json'
// import ru from './locales/ru.json'
// import de from './locales/de.json'
// import it from './locales/it.json'
// import pt from './locales/pt.json'
// import zh from './locales/zh.json'
// import ja from './locales/ja.json'
// import ko from './locales/ko.json'

export const LANGUAGES = {
  en: { name: 'English', nativeName: 'English' },
  es: { name: 'Spanish', nativeName: 'Español' },
  fr: { name: 'French', nativeName: 'Français' },
  ru: { name: 'Russian', nativeName: 'Русский' },
  de: { name: 'German', nativeName: 'Deutsch' },
  it: { name: 'Italian', nativeName: 'Italiano' },
  pt: { name: 'Portuguese', nativeName: 'Português' },
  zh: { name: 'Chinese', nativeName: '中文' },
  ja: { name: 'Japanese', nativeName: '日本語' },
  ko: { name: 'Korean', nativeName: '한국어' }
} as const

export type LanguageCode = keyof typeof LANGUAGES

const resources = {
  en: { translation: en }
  // es: { translation: es },
  // fr: { translation: fr },
  // ru: { translation: ru },
  // de: { translation: de },
  // it: { translation: it },
  // pt: { translation: pt },
  // zh: { translation: zh },
  // ja: { translation: ja },
  // ko: { translation: ko }
}

export const setStoredLanguage = async (lang: LanguageCode): Promise<void> => {
  await Storage.setItemAsync('userLanguage', lang)
  await i18n.changeLanguage(lang)
}

export const initializeI18n = async () => {
  const storedLang = await Storage.getItemAsync('userLanguage')

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'en',
    lng: storedLang || undefined,
    interpolation: {
      escapeValue: false
    },
    compatibilityJSON: 'v4'
  })

  return i18n
}

export default i18n
