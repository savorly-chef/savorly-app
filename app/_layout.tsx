import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import 'react-native-reanimated'

import { useProtectedRoute } from '@/components/auth/RequireAuth'
import { Colors } from '@/constants/Colors'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useProtectedRoute()

  const [loaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto-VariableFont_wdth,wght.ttf')
  })

  useEffect(() => {
    const init = async () => {
      try {
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
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.gray['00'] }
          }}
        >
          <Stack.Screen name='(tabs)' />
          <Stack.Screen name='login' />
          <Stack.Screen name='+not-found' />
        </Stack>
        {/* <StatusBar style='dark' /> */}
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
