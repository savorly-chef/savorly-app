import { View, StyleSheet, Platform, TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import * as AppleAuthentication from 'expo-apple-authentication'
import { useState } from 'react'

import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import LoginTemplate from '@/components/LoginTemplate'
import { ThemedButton } from '@/components/ThemedButton'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useAuthStore } from '@/store/auth'

export default function Login() {
  const router = useRouter()
  const theme = useColorScheme() ?? 'light'
  const backgroundColor = useThemeColor('black')
  const textColor = useThemeColor('white')
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
          <View
            style={[
              styles.buttonContainer,
              {
                borderWidth: theme === 'light' ? 0 : 1,
                backgroundColor: theme === 'light' ? 'black' : 'transparent'
              }
            ]}
          >
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
              style={[
                styles.input,
                {
                  backgroundColor: theme === 'light' ? '#F4F4F5' : '#1F1F1F',
                  color: theme === 'light' ? Colors.light.text : Colors.dark.text
                }
              ]}
              placeholder='Email'
              placeholderTextColor={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
              keyboardType='email-address'
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme === 'light' ? '#F4F4F5' : '#1F1F1F',
                  color: theme === 'light' ? Colors.light.text : Colors.dark.text
                }
              ]}
              placeholder='Password'
              placeholderTextColor={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <ThemedButton
              title={isLoading ? 'Signing in...' : 'Sign In / Up'}
              onPress={handleEmailSignInOrUp}
              disabled={isLoading || !email || !password}
              buttonStyle={{ ...styles.signInButton, backgroundColor }}
              textStyle={{ color: textColor }}
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
    borderRadius: 8,
    padding: 4,
    borderColor: Colors.light.divider
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
