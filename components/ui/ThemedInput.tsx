import { TextInput, type TextInputProps, StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Colors } from '@/constants/Colors'

export type ThemedInputProps = TextInputProps & {
  lightColor?: string
  darkColor?: string
  type?: 'default' | 'large'
}

export function ThemedInput({ style, lightColor, darkColor, type = 'default', ...rest }: ThemedInputProps) {
  const color = useThemeColor('text')
  const backgroundColor = useThemeColor('background')
  const borderColor = useThemeColor('border')
  const placeholderTextColor = useThemeColor('icon')

  return (
    <TextInput
      style={[
        { color, backgroundColor, borderColor },
        styles.base,
        type === 'large' ? styles.large : styles.default,
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
