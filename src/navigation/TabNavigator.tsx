import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { t } from 'i18next';
import {
  HeadsetIcon,
  HouseIcon,
  SquaresFourIcon,
  UserIcon,
} from 'phosphor-react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { openHelpCenter } from '~/utils/externalLinkActions';
import Account from '../app-stack/account/Account';
import Home from '../app-stack/home/Home';
import Services from '../app-stack/services/Services';
import { screenNames } from '../utils/screenNames';
import { CustomTabBar } from './components/CustomTabBar';
import { ScreenHeader } from './components/ScreenHeader';
import { TabIcon } from './components/TabIcon';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: (props: any) => <ScreenHeader {...props} />,
        headerRight: () => (
          <Appbar.Action
            icon={({ size, color }) => (
              <HeadsetIcon size={size} color={color} weight="bold" />
            )}
            onPress={openHelpCenter}
          />
        ),
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name={screenNames.HOME}
        component={Home}
        options={{
          headerShown: false,
          title: t('Hone'),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              icon={HouseIcon}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.SERVICES}
        component={Services}
        options={{
          title: t('Services'),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              icon={SquaresFourIcon}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.ACCOUNT}
        component={Account}
        options={{
          title: t('Account'),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              icon={UserIcon}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
