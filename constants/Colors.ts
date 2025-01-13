const tintColorLight = '#D2353A'
const tintColorDark = '#fff'

const defaultColors = {
  white: '#fff',
  black: '#000',
  tintColorLight: '#D2353A'
}

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#E0E0E0',
    divider: '#687076',
    tabBG: '#fff',
    ...defaultColors
  },
  dark: {
    text: '#ECEDEE',
    background: '#131415',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#131415',
    divider: '#303030',
    tabBG: '#131415',
    ...defaultColors
  }
}
