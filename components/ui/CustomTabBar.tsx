import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Colors } from '@/constants/Colors'
import { ThemedText } from '../ui/ThemedText'

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={[styles.container, shadow, { backgroundColor: Colors.gray['00'] }]}>
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

        const color = isFocused ? Colors.primary : Colors.gray[500]

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

const shadow = {
  shadowColor: Colors.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 5
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: Platform.select({
      ios: 28,
      android: 16
    })
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
