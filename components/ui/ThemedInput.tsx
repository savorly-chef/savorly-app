import { TextInput, type TextInputProps, StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Colors } from '@/constants/Colors'

export type ThemedInputProps = TextInputProps & {
  lightColor?: string
  darkColor?: string
  type?: 'default' | 'large'
}

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  type = 'default',
  placeholderTextColor,
  ...rest
}: ThemedInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background')
  const borderColor = useThemeColor({ light: Colors.light.icon, dark: Colors.dark.icon }, 'icon')

  return (
    <TextInput
      style={[
        { color, backgroundColor, borderColor },
        styles.base,
        type === 'default' ? styles.default : undefined,
        type === 'large' ? styles.large : undefined,
        style
      ]}
      placeholderTextColor={placeholderTextColor || borderColor}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16
  },
  default: {
    height: 48,
    fontSize: 16
  },
  large: {
    height: 56,
    fontSize: 18
  }
})
