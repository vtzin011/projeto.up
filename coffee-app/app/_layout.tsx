import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#16161F',
          borderTopColor: '#242433',
        },
        tabBarActiveTintColor: '#00FFFF',
        tabBarInactiveTintColor: '#888',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Vitrine',
        }}
      />
      <Tabs.Screen
  name="carrinho"
  options={{
    title: 'Meu Carrinho',
  }}
/>

    </Tabs>
  );
}
