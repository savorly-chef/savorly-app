import { View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'

export default function NewRecipeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ThemedText>Add New Recipe</ThemedText>
    </View>
  )
}
