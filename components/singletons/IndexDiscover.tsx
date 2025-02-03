import { useState } from 'react'
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'

import { ThemedText } from '@/components/ui/ThemedText'
import { Colors } from '@/constants/Colors'

const discoverMap = [
  'forYou',
  'american',
  'italian',
  'japanese',
  'mexican',
  'french',
  'greek',
  'chinese',
  'thai',
  'indian',
  'vietnamese',
  'korean'
] as const

export default function IndexDiscover() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<(typeof discoverMap)[number]>('forYou')

  return (
    <View style={styles.section}>
      <ThemedText style={{ marginBottom: 8, paddingHorizontal: 20 }} type='title'>
        {t('common.discover')}
      </ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.iconScroll}
        contentContainerStyle={styles.iconContainer}
      >
        {discoverMap.map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelected(button)}
            style={[styles.button, selected === button && styles.buttonActive]}
          >
            <ThemedText style={selected === button && { color: Colors.white, fontWeight: 600 }}>
              {button === 'forYou' ? t('common.forYou') : t(`cuisines.${button}`)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    gap: 6
  },

  iconScroll: {
    flexGrow: 0
  },

  iconContainer: {
    gap: 12,
    paddingHorizontal: 20
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 12,
    borderColor: Colors.gray[300],
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 8
  },

  buttonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary
  }
})
