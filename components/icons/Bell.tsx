import Svg, { Path } from 'react-native-svg'

export default function Bell({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox='0 0 18 18' fill='none'>
      <Path
        d='M14.6249 7.09165V6.50415C14.6249 3.27995 12.1049 0.666595 8.99988 0.666595C5.89485 0.666595 3.37482 3.27995 3.37482 6.50415V7.09165C3.37583 7.79296 3.17569 8.47983 2.79815 9.07084L1.87481 10.5084C1.0323 11.8209 1.67564 13.605 3.14149 14.0201C6.97161 15.1059 11.0281 15.1059 14.8583 14.0201C16.3241 13.605 16.9674 11.8209 16.1249 10.5092L15.2016 9.07167C14.8238 8.48076 14.6233 7.79387 14.6241 7.09249L14.6249 7.09165Z'
        stroke={color}
        stroke-width='1.25001'
      />
      <Path
        d='M5.25 14.8333C5.79584 16.29 7.26835 17.3333 9.00003 17.3333C10.7317 17.3333 12.2042 16.29 12.7501 14.8333'
        stroke={color}
        stroke-width='1.25001'
        stroke-linecap='round'
      />
    </Svg>
  )
}
