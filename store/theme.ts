import { create } from 'zustand'
import { ColorSchemeName } from 'react-native'
import Storage from 'expo-sqlite/kv-store'

interface ThemeState {
  theme: ColorSchemeName
  toggleTheme: () => Promise<void>
  setTheme: (theme: ColorSchemeName) => Promise<void>
  initTheme: () => Promise<void>
}

export const useThemeStore = create<ThemeState>(set => ({
  theme: 'light',
  initTheme: async () => {
    try {
      const savedTheme = await Storage.getItem('theme')
      if (savedTheme) {
        set({ theme: savedTheme as ColorSchemeName })
      }
    } catch (error) {
      console.error('Failed to load theme:', error)
    }
  },
  toggleTheme: async () => {
    try {
      const currentTheme = await Storage.getItem('theme')
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
      await Storage.setItem('theme', newTheme)
      set({ theme: newTheme as ColorSchemeName })
    } catch (error) {
      console.error('Failed to toggle theme:', error)
    }
  },
  setTheme: async theme => {
    try {
      await Storage.setItem('theme', theme || 'light')
      set({ theme })
    } catch (error) {
      console.error('Failed to set theme:', error)
    }
  }
}))
