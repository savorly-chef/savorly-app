import { useThemeStore } from '@/store/theme'

export function useColorScheme() {
  const theme = useThemeStore(state => state.theme)
  return theme
}
