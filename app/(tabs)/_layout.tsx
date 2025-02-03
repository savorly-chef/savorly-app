import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { CustomTabBar } from '@/components/ui/CustomTabBar'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={props => <CustomTabBar {...props} />}>
      <Tabs.Screen
        name='index'
        options={{
          tabBarIcon: ({ color }) => <Ionicons size={28} name='flame-outline' color={color} />
        }}
      />
      <Tabs.Screen
        name='my-recipes'
        options={{
          tabBarIcon: ({ color }) => <Ionicons size={28} name='book-outline' color={color} />
        }}
      />
      <Tabs.Screen
        name='new-recipe'
        options={{
          tabBarIcon: ({ color }) => <Ionicons size={28} name='add' color={color} />
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          tabBarIcon: ({ color }) => <Ionicons size={28} name='settings-outline' color={color} />
        }}
      />
    </Tabs>
  )
}
