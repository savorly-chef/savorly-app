import { Pressable, StyleSheet, type PressableProps, type ViewStyle, type TextStyle } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedText } from './ThemedText'

export type ThemedButtonProps = Omit<PressableProps, 'style'> & {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  title: string
  buttonStyle?: ViewStyle
  textStyle?: TextStyle
}

export function ThemedButton({
  buttonStyle,
  textStyle,
  variant = 'primary',
  size = 'medium',
  title,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor('tintColorLight')
  const textColor = useThemeColor('white')

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor,
          borderWidth: 0
        }
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0
        }
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: backgroundColor
        }
    }
  }

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return styles.small
      case 'medium':
        return styles.medium
      case 'large':
        return styles.large
    }
  }

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return textColor
      case 'secondary':
      case 'outline':
        return backgroundColor
    }
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        getVariantStyle(),
        getSizeStyle(),
        pressed && styles.pressed,
        buttonStyle
      ]}
      {...rest}
    >
      <ThemedText style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</ThemedText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  pressed: {
    opacity: 0.7
  },

  text: {
    fontWeight: '600'
  },

  small: {
    paddingHorizontal: 12,
    paddingVertical: 6
  },

  medium: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },

  large: {
    paddingHorizontal: 20,
    paddingVertical: 12
  }
})
