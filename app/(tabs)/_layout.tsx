import React from 'react'
import { StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { CustomTabBar } from '@/components/ui/CustomTabBar'

export default function TabLayout() {
  return (
    // <ScrollView style={styles.container}>
    <Tabs
      screenOptions={{
        headerShown: false
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Discover',
          tabBarIcon: ({ color }) => <Ionicons size={28} name='flame-outline' color={color} />
        }}
      />
      <Tabs.Screen
        name='my-recipes'
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color }) => <Ionicons size={28} name='book-outline' color={color} />
        }}
      />
      <Tabs.Screen
        name='new-recipe'
        options={{
          title: 'New Recipe',
          tabBarIcon: ({ color }) => <Ionicons size={28} name='add' color={color} />
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons size={28} name='settings-outline' color={color} />
        }}
      />
    </Tabs>
    // </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  }
})
