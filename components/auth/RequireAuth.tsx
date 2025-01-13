import { useEffect } from 'react'
import { useRouter, useSegments } from 'expo-router'
import { useAuthStore } from '@/store/auth'

export function useProtectedRoute() {
  const segments = useSegments()
  const router = useRouter()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)'
    const isProtectedRoute = segments[1] === 'new-recipe' || segments[1] === 'my-recipes'

    if (isProtectedRoute && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, segments])
}
