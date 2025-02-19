import { View, StyleSheet, Modal, Pressable } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedButton } from '@/components/ui/ThemedButton'
import Logo from '@/components/icons/Logo'

type DialogType = 'terms' | 'privacy' | null

export default function LoginTemplate({ children }: { children: React.ReactNode }) {
  const [dialogType, setDialogType] = useState<DialogType>(null)

  const handleCloseDialog = () => setDialogType(null)

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Logo color={Colors.white} />
            <ThemedText style={styles.subtitle}>Sign in to discover, create and share amazing recipes</ThemedText>
          </View>
        </View>

        <View style={styles.bottomSection}>
          {children}
          <ThemedText style={styles.footerText}>
            By continuing, you agree to our{' '}
            <ThemedText type='link' onPress={() => setDialogType('terms')}>
              Terms of Service
            </ThemedText>{' '}
            and{' '}
            <ThemedText type='link' onPress={() => setDialogType('privacy')}>
              Privacy Policy
            </ThemedText>
          </ThemedText>
        </View>

        <Modal visible={dialogType !== null} transparent animationType='slide' onRequestClose={handleCloseDialog}>
          <Pressable style={styles.modalOverlay} onPress={handleCloseDialog}>
            <View style={[styles.modalContent, { backgroundColor: Colors.gray['00'] }]}>
              <View style={styles.modalHandle} />
              <View style={styles.modalBody}>
                <ThemedText style={styles.modalTitle}>
                  {dialogType === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
                </ThemedText>
                <ThemedText style={styles.modalText}>
                  {dialogType === 'terms'
                    ? 'These Terms of Service ("Terms") govern your access to and use of the Savorly application. By using our services, you agree to be bound by these Terms.'
                    : 'This Privacy Policy describes how we collect, use, and handle your personal information when you use our services.'}
                </ThemedText>
              </View>
              <ThemedButton title='Close' onPress={handleCloseDialog} buttonStyle={styles.closeButton} />
            </View>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    backgroundColor: Colors.black
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
    color: Colors.gray[500],
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
    color: Colors.gray[500],
    textAlign: 'center'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  modalContent: {
    width: '100%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 14,
    gap: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.gray[300],
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: 24
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24
  },
  closeButton: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
    width: '85%'
  }
})
