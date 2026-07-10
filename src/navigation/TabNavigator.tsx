import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { t } from 'i18next';
import {
  CompassIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from 'phosphor-react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Cart from '~/app-stack/cart/Cart';
import Discovery from '~/app-stack/discovery/Discovery';
import { RootState } from '~/redux/store';
import { navigateToSearch } from '~/utils/externalLinkActions';
import Account from '../app-stack/account/Account';
import Home from '../app-stack/home/Home';
import { screenNames } from '../utils/screenNames';
import { CustomTabBar } from './components/CustomTabBar';
import { ScreenHeader } from './components/ScreenHeader';
import { TabIcon } from './components/TabIcon';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const { items } = useSelector((state: RootState) => state.cartReducer);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={{
        header: (props: any) => <ScreenHeader {...props} />,
        headerRight: () => (
          <Appbar.Action
            icon={({ size, color }) => (
              <MagnifyingGlassIcon size={size} color={color} weight="bold" />
            )}
            onPress={() => navigateToSearch()}
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
          title: t('Home'),
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
        name={screenNames.DISCOVERY}
        component={Discovery}
        options={{
          title: t('Discovery'),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              icon={CompassIcon}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.CART}
        component={Cart}
        options={{
          title: t('Cart ({{count}})', { count: cartItemCount }),
          tabBarBadge: cartItemCount,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              icon={ShoppingCartIcon}
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
