import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import { EvilIcons } from '@expo/vector-icons'
import { useMemo } from 'react'

import { getTimeBasedGreeting } from '@/utils'
import { ThemedText } from '@/components/ui/ThemedText'
import { Colors } from '@/constants/Colors'
import Bell from '@/components/icons/Bell'

export default function IndexHeader(): JSX.Element {
  const greeting = useMemo(() => {
    const hours = new Date().getHours()
    return getTimeBasedGreeting(hours)
  }, [])

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <View style={styles.heroTextContainer}>
          <ThemedText style={styles.heroGreeting} type='default'>
            {greeting}, Andrew
          </ThemedText>
          <ThemedText style={styles.heroText} type='title'>
            What are you craving today?
          </ThemedText>
        </View>
        <TouchableOpacity style={styles.bellContainer}>
          <Bell size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <EvilIcons name='search' size={38} color={Colors.gray[400]} />
        <TextInput style={styles.searchInput} placeholder='Search for recipes' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: Colors.primary,
    gap: 20
  },

  heroContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },

  heroTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    maxWidth: '84%'
  },

  bellContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.gray[400]
  },

  heroGreeting: {
    color: Colors.gray[400],
    fontSize: 15,
    fontWeight: 400
  },

  heroText: {
    fontSize: 32,
    fontWeight: 600,
    color: Colors.white,
    lineHeight: 38
  },

  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 12
  },

  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 22,
    fontWeight: 300,
    fontFamily: 'PlusJakartaSans'
  }
})
