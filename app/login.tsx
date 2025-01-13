import { useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { useThemeColor } from '@/hooks/useThemeColor'
import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ThemedText'
import { ThemedInput } from '@/components/ui/ThemedInput'
import { useAuthStore } from '@/store/auth'

export default function Login() {
  const router = useRouter()
  const login = useAuthStore(state => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      await login(email, password)
      router.replace('/(tabs)')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name='restaurant-outline' size={64} color={Colors.light.tint} />
        <ThemedText style={styles.title}>Welcome to Savorly</ThemedText>
      </View>

      <View style={styles.content}>
        <ThemedInput
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
          style={styles.input}
        />
        <ThemedInput
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <View style={[styles.divider, { backgroundColor: useThemeColor('icon') }]}></View>
        <Pressable
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <ThemedText style={styles.buttonText}>{isLoading ? 'Logging in...' : 'Login'}</ThemedText>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  header: {
    alignItems: 'center',
    marginBottom: 48
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16
  },
  content: {
    alignItems: 'center'
  },
  input: {
    marginTop: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    height: 52
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonDisabled: {
    opacity: 0.7
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  divider: {
    width: '40%',
    height: 1,
    marginVertical: 28
  }
})
