import { View, StyleSheet } from 'react-native'

import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ThemedText'
import { useColorScheme } from '@/hooks/useColorScheme'
import Logo from '@/components/Logo'

export default function LoginTemplate({ children }: { children: React.ReactNode }) {
  const theme = useColorScheme() ?? 'light'

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Logo color={theme === 'light' ? 'black' : 'white'} />
          <ThemedText style={styles.subtitle}>Sign in to discover and share amazing recipes</ThemedText>
        </View>
      </View>

      <View style={styles.bottomSection}>
        {children}
        <ThemedText style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </ThemedText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 48,
    justifyContent: 'space-between'
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  header: {
    alignItems: 'center'
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    paddingTop: 10,
    textAlign: 'center'
  },

  subtitle: {
    fontSize: 16,
    color: Colors.light.icon,
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 32
  },

  bottomSection: {
    gap: 12,
    alignItems: 'center'
  },

  footerText: {
    fontSize: 12,
    color: Colors.light.icon,
    textAlign: 'center'
  }
})
