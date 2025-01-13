import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { BlurView } from 'expo-blur'

import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { ThemedText } from '../ThemedText'

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.blurContainer}>
      <View style={[styles.container, isDark && styles.containerDark]}>
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
    </BlurView>
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
    paddingBottom: 26,
    paddingTop: 12
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
