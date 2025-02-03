import { StyleSheet, View } from 'react-native'

import { ThemedText } from '@/components/ui/ThemedText'

export default function IndexForYou() {
  return (
    <View style={styles.section}>
      <ThemedText style={{ marginBottom: 8 }} type='title'>
        For You
      </ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {}
})
