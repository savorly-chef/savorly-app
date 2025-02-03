import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import 'react-native-reanimated'

import { useProtectedRoute } from '@/components/auth/RequireAuth'
import { Colors } from '@/constants/Colors'
import { initializeI18n } from '@/i18n'

SplashScreen.preventAutoHideAsync()
SplashScreen.setOptions({
  duration: 1000,
  fade: true
})

export default function RootLayout() {
  useProtectedRoute()
  const [i18n, setI18n] = useState<any>(null)

  useEffect(() => {
    const init = async () => {
      const i18nInstance = await initializeI18n()
      setI18n(i18nInstance)
      SplashScreen.hide()
    }
    init()
  }, [])

  if (!i18n) return null

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: Colors.black }
            }}
          >
            <Stack.Screen name='(tabs)' />
            <Stack.Screen name='login' />
            <Stack.Screen name='+not-found' />
          </Stack>
        </ThemeProvider>
      </SafeAreaProvider>
    </I18nextProvider>
  )
}
