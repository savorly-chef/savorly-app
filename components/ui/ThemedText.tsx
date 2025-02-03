import { Text, type TextProps, StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'
}

export function ThemedText({ style, type = 'default', ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: Colors.primary },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        { fontFamily: 'PlusJakartaSans' },
        style
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24
  },

  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 600
  },

  title: {
    fontSize: 26,
    fontWeight: 500,
    lineHeight: 32
  },

  subtitle: {
    fontSize: 20,
    fontWeight: 600
  },

  link: {
    lineHeight: 30,
    fontSize: 16,
    color: Colors.link
  }
})
