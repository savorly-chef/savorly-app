import { View, StyleSheet, Platform, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import * as AppleAuthentication from 'expo-apple-authentication'
import { Ionicons } from '@expo/vector-icons'

import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ThemedText'
import { useColorScheme } from '@/hooks/useColorScheme'
import LoginTemplate from '@/components/LoginTemplate'

export default function Login() {
  const router = useRouter()
  const theme = useColorScheme() ?? 'light'

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
          <Pressable
            style={[styles.socialButton, { backgroundColor: '#4285F4' }]}
            onPress={() => console.log('Google Sign In - To be implemented')}
          >
            <Ionicons name='logo-google' size={24} color='#fff' style={styles.socialIcon} />
            <ThemedText style={styles.socialButtonText}>Continue with Google</ThemedText>
          </Pressable>
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

  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.light.tint
  },

  socialIcon: {
    marginRight: 12
  },

  socialButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
})
