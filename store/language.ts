import { create } from 'zustand'
import { type LanguageCode, setStoredLanguage } from '@/i18n'

interface LanguageState {
  currentLanguage: LanguageCode
  setLanguage: (lang: LanguageCode) => Promise<void>
}

export const useLanguageStore = create<LanguageState>(set => ({
  currentLanguage: 'en',
  setLanguage: async (lang: LanguageCode) => {
    await setStoredLanguage(lang)
    set({ currentLanguage: lang })
  }
}))
