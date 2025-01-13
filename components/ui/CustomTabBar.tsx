import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedText } from '../ThemedText'

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const colorScheme = useColorScheme()
  const backgroundColor = useThemeColor('tabBG')
  const isDark = colorScheme === 'dark'

  return (
    <View style={[styles.container, isDark && styles.containerDark, { backgroundColor }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = options.title ?? route.name
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const color = isFocused ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].tabIconDefault

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
          >
            {options.tabBarIcon?.({ focused: isFocused, color, size: 28 })}
            <ThemedText style={[styles.label, { color }]}>{label}</ThemedText>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  blurContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  container: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 12,
    paddingBottom: Platform.select({
      ios: 28, // Extends under home indicator
      android: 16
    })
  },
  containerDark: {
    borderTopColor: 'rgba(255, 255, 255, 0.1)'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 12,
    lineHeight: 24
  }
})
