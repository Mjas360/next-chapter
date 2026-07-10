import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { screenNames } from '~/utils/screenNames';
import { navigationRef } from '../services/navigationService';
import { OtherNavigator } from './OtherNavigator';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={screenNames.OTHER_STACK}
          component={OtherNavigator}
        />
        <Stack.Screen
          name={screenNames.APP_TAB_STACK}
          component={TabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
