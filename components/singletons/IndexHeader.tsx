import { StyleSheet, View } from 'react-native'

import { Colors } from '@/constants/Colors'

export default function IndexHeader() {
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 20,
    backgroundColor: Colors.black
  }
})
