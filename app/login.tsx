import { View, StyleSheet, Platform, TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import * as AppleAuthentication from 'expo-apple-authentication'
import { useState } from 'react'

import { Colors } from '@/constants/Colors'
import LoginTemplate from '@/components/LoginTemplate'
import { ThemedButton } from '@/components/ui/ThemedButton'
import { useAuthStore } from '@/store/auth'

export default function Login() {
  const router = useRouter()
  const login = useAuthStore(state => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      })
      // TODO: Handle successful sign in
      console.log('AUTH', JSON.stringify(credential))
      router.replace('/(tabs)')
    } catch (e: any) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // TODO: Send back to login screen if not already there
        console.log('Sign in canceled')
      } else {
        // Do nothing
      }
    }
  }

  const handleEmailSignInOrUp = async () => {
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
    <LoginTemplate>
      <View style={styles.buttonGroup}>
        {Platform.OS === 'ios' ? (
          <View style={[styles.buttonContainer, { backgroundColor: Colors.black }]}>
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={8}
              style={styles.button}
              onPress={handleAppleSignIn}
            />
          </View>
        ) : (
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, { backgroundColor: Colors.gray[100], color: Colors.gray[900] }]}
              placeholder='Email'
              placeholderTextColor={Colors.gray[500]}
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
              keyboardType='email-address'
            />
            <TextInput
              style={[styles.input, { backgroundColor: Colors.gray[100], color: Colors.gray[900] }]}
              placeholder='Password'
              placeholderTextColor={Colors.gray[500]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <ThemedButton
              title={isLoading ? 'Signing in...' : 'Sign In / Up'}
              onPress={handleEmailSignInOrUp}
              disabled={isLoading || !email || !password}
              buttonStyle={{ ...styles.signInButton }}
            />
          </View>
        )}
      </View>
    </LoginTemplate>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    width: '100%',
    gap: 16
  },

  buttonContainer: {
    width: '100%',
    borderRadius: 10,
    padding: 6,
    borderColor: Colors.gray[700],
    borderWidth: 1
  },

  button: {
    width: '100%',
    height: 48
  },

  formContainer: {
    width: '100%',
    gap: 12
  },

  input: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16
  },

  signInButton: {
    width: '100%',
    marginTop: 4,
    height: 50
  }
})
