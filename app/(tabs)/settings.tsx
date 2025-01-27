import { StyleSheet, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ui/ThemedText'

export default function SettingsScreen() {
  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: Colors.gray[100] }]}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Settings</ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 16
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 14,
    textTransform: 'uppercase',
    marginBottom: 8,
    color: Colors.gray[500]
  }
})
