import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, statusBarStyle: 'dark' }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}
