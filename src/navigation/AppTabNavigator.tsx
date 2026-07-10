import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator();

export function AppTabNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}
