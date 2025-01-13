import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { useProtectedRoute } from '@/components/auth/RequireAuth'
import { useThemeStore } from '@/store/theme'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const insets = useSafeAreaInsets()
  const initTheme = useThemeStore(state => state.initTheme)
  useProtectedRoute()

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    const init = async () => {
      try {
        await initTheme()
        if (loaded) {
          await SplashScreen.hideAsync()
        }
      } catch (error) {
        console.error('Failed to initialize:', error)
      }
    }
    init()
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }
        }}
      >
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='login' />
        <Stack.Screen name='+not-found' />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  )
}
