import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeadsetIcon, XIcon } from 'phosphor-react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import VerifyNumber from '~/auth-stack/verify-number/VerifyNumber';
import { goBackOrReset } from '~/services/navigationService';
import { openHelpCenter } from '~/utils/externalLinkActions';
import Login from '../auth-stack/login/Login';
import Onboarding from '../auth-stack/onboarding/Onboarding';
import Signup from '../auth-stack/signup/Signup';
import { screenNames } from '../utils/screenNames';
import { ScreenHeader } from './components/ScreenHeader';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  const { colors } = useAppTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props: any) => (
          <ScreenHeader
            {...props}
            headerStyles={{ backgroundColor: colors.white }}
          />
        ),
        statusBarStyle: 'dark',
        headerRight: () => (
          <Appbar.Action
            icon={({ size, color }) => (
              <HeadsetIcon size={size} color={color} weight="bold" />
            )}
            onPress={openHelpCenter}
          />
        ),
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          statusBarStyle: 'light',
        }}
        name={screenNames.ONBOARDING}
        component={Onboarding}
      />
      <Stack.Screen
        name={screenNames.LOGIN}
        component={Login}
        options={{
          title: '-',
          headerLeft: () => (
            <Appbar.Action
              onPress={() => goBackOrReset(screenNames.ONBOARDING)}
              icon={({ size, color }) => (
                <XIcon size={size} color={color} weight="bold" />
              )}
            />
          ),
        }}
      />
      <Stack.Screen
        name={screenNames.SIGNUP}
        component={Signup}
        options={{
          title: '-',
          headerLeft: () => (
            <Appbar.Action
              onPress={() => goBackOrReset(screenNames.ONBOARDING)}
              icon={({ size, color }) => (
                <XIcon size={size} color={color} weight="bold" />
              )}
            />
          ),
        }}
      />
      <Stack.Screen
        name={screenNames.VERIFY_PHONE_NUMBER}
        component={VerifyNumber}
        options={{
          title: '-',
        }}
      />
    </Stack.Navigator>
  );
}
