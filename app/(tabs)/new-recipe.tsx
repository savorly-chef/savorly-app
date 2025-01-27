import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ui/ThemedText'

export default function NewRecipeScreen() {
  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: Colors.gray[100] }]}>
      <View style={styles.container}>
        <ThemedText>Add New Recipe</ThemedText>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  }
})
