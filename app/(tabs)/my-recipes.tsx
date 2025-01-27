import { StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'

export default function MyRecipesScreen() {
  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: Colors.gray[100] }]}>
      <ScrollView contentContainerStyle={styles.container} />
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
  }
})
