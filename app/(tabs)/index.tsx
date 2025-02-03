import { StyleSheet, View, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar, StatusBarStyle } from 'expo-status-bar'
import { useRef, useEffect, useState } from 'react'

import { Colors } from '@/constants/Colors'
import IndexHeader from '@/components/singletons/IndexHeader'
import IndexDiscover from '@/components/singletons/IndexDiscover'

const SCROLL_THRESHOLD = 50

export default function HomeScreen(): JSX.Element {
  const scrollY: Animated.Value = useRef(new Animated.Value(0)).current
  const animatedOpacity: Animated.AnimatedValue = useRef(new Animated.Value(0)).current
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>('light')

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      Animated.timing(animatedOpacity, {
        toValue: value > SCROLL_THRESHOLD ? 1 : 0,
        duration: 4,
        useNativeDriver: true
      }).start()

      setStatusBarStyle(value > SCROLL_THRESHOLD ? 'dark' : 'light')
    })

    return () => {
      scrollY.removeAllListeners()
    }
  }, [])

  const backgroundColor = animatedOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.primary, Colors.gray[100]]
  })

  return (
    <Animated.View style={{ flex: 1, backgroundColor }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Colors.gray[100] }}>
          <StatusBar animated style={statusBarStyle} />
          <Animated.ScrollView
            contentContainerStyle={styles.wrapper}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            bounces={false}
            overScrollMode='never'
          >
            <IndexHeader />
            <View style={styles.container}>
              <IndexDiscover />
              {/* <IndexTrending />
              <IndexForYou /> */}
            </View>
          </Animated.ScrollView>
        </View>
      </SafeAreaView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.gray[100],
    minHeight: '100%'
  },

  container: {
    gap: 30,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column'
  }
})
