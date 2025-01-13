import { useState } from 'react'
import { View, StyleSheet, Pressable, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import * as AppleAuthentication from 'expo-apple-authentication'

import { useThemeColor } from '@/hooks/useThemeColor'
import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ThemedText'
import { ThemedInput } from '@/components/ui/ThemedInput'
import { useAuthStore } from '@/store/auth'
import LoginTemplate from '@/components/LoginTemplate'

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

  if (Platform.OS === 'ios') {
    return (
      <LoginTemplate>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.button}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
              })

              console.log('AUTH', JSON.stringify(credential))
            } catch (e: any) {
              if (e.code === 'ERR_REQUEST_CANCELED') {
                // TODO: Send back to index view
                // handle that the user canceled the sign-in flow
              } else {
                // TODO: Display error message
                // handle other errors
              }
            }
          }}
        />
      </LoginTemplate>
    )
  } else {
    return (
      <LoginTemplate>
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
      </LoginTemplate>
    )
  }
}

const styles = StyleSheet.create({
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
