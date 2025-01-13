import { View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ThemedText'

export default function LoginTemplate({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name='restaurant-outline' size={64} color={Colors.light.tint} />
        <ThemedText style={styles.title}>Welcome to Savorly</ThemedText>
      </View>

      <View style={styles.content}>{children}</View>
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
  }
})
