import { StyleSheet, View, ScrollView, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ThemedText } from '@/components/ThemedText'
import { useThemeStore } from '@/store/theme'
import { Colors } from '@/constants/Colors'

export default function SettingsScreen() {
  const { theme, toggleTheme } = useThemeStore()
  const [isToggling, setIsToggling] = useState(false)
  const isDark = theme === 'dark'
  const insets = useSafeAreaInsets()

  const handleThemeToggle = async () => {
    try {
      setIsToggling(true)
      await toggleTheme()
    } catch (error) {
      console.error('Failed to toggle theme:', error)
    } finally {
      setIsToggling(false)
    }
  }

  return (
    <ScrollView style={[styles.container, { top: insets.top - 6 }]}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Appearance</ThemedText>

        <Pressable style={styles.setting} onPress={handleThemeToggle} disabled={isToggling}>
          <View style={styles.settingInfo}>
            <Ionicons name={isDark ? 'moon' : 'sunny'} size={24} color={Colors.light.icon} />
            <ThemedText style={styles.settingText}>Dark Mode</ThemedText>
          </View>
          <View style={[styles.toggle, isDark && styles.toggleActive]}>
            <View style={[styles.toggleKnob, isDark && styles.toggleKnobActive]} />
          </View>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
    color: Colors.light.icon
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  settingText: {
    fontSize: 16
  },
  toggle: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    backgroundColor: Colors.light.icon,
    padding: 2
  },
  toggleActive: {
    backgroundColor: Colors.light.tint
  },
  toggleKnob: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: '#fff',
    transform: [{ translateX: 0 }]
  },
  toggleKnobActive: {
    transform: [{ translateX: 20 }]
  }
})
