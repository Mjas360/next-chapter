import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { navigationRef } from '../services/navigationService';
import { AppTabNavigator } from './AppTabNavigator';
import { OtherNavigator } from './OtherNavigator';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={OtherNavigator} />
        <Stack.Screen name="App" component={AppTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
