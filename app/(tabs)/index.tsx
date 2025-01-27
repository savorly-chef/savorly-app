import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ui/ThemedText'

const discoverMap = ['Spanish', 'Italian', 'Japanese', 'Mexican', 'Egyptian', 'Greek']

export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: Colors.gray[100] }]}>
      <ScrollView contentContainerStyle={styles.container}>
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

        <View style={styles.section}>
          <ThemedText style={{ marginBottom: 8 }} type='title'>
            Trending
          </ThemedText>
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
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    padding: 16
  },

  section: {},

  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10
  },

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
