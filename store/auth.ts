import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  user: {
    id: string
    email: string
  } | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    // TODO: Implement actual authentication logic
    // This is a mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000))
    set({
      isAuthenticated: true,
      user: {
        id: '1',
        email: email
      }
    })
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null
    })
  }
}))
