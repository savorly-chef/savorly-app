import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { CustomTabBar } from '@/components/ui/CustomTabBar'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={props => <CustomTabBar {...props} />}>
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
  )
}
