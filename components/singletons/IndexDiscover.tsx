import { ScrollView, StyleSheet, View } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'

const discoverMap = ['Spanish', 'Italian', 'Japanese', 'Mexican', 'Egyptian', 'Greek']

export default function IndexDiscover() {
  return (
    <View style={styles.section}>
      <ThemedText style={{ marginBottom: 8 }} type='title'>
        Discover
      </ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.iconScroll}
        contentContainerStyle={styles.iconContainer}
      >
        {discoverMap.map((button, index) => (
          <View key={index} style={styles.iconWrapper}>
            <ThemedText style={{ fontSize: 13 }}>{button}</ThemedText>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {},

  iconScroll: {
    flexGrow: 0
  },

  iconContainer: {
    gap: 20
  },

  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
