import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { t } from 'i18next';
import type { RootState } from '~/redux/store';
import { HeadsetIcon, ShoppingCartIcon } from 'phosphor-react-native';
import React from 'react';
import { View } from 'react-native';
import { Appbar, Badge } from 'react-native-paper';
import BookDetails from '~/app-stack/book-details/BookDetails';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { openHelpCenter } from '~/utils/externalLinkActions';
import Search from '../app-stack/search/Search';
import Onboarding from '../other-stack/onboarding/Onboarding';
import { screenNames } from '../utils/screenNames';
import { ScreenHeader } from './components/ScreenHeader';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export function OtherNavigator() {
  const { colors } = useAppTheme();
  const { items } = useSelector((state: RootState) => state.cartReducer);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props: any) => (
          <ScreenHeader
            {...props}
            headerStyles={{ backgroundColor: colors.background }}
          />
        ),
        // statusBarStyle: 'dark',
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
          // statusBarStyle: 'light',
        }}
        name={screenNames.ONBOARDING}
        component={Onboarding}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('Search'),
        }}
        name={screenNames.SEARCH}
        component={Search}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('Book Details'),
          headerRight: () => (
            <View>
              <Appbar.Action
                icon={({ size, color }) => (
                  <ShoppingCartIcon size={size} color={color} weight="bold" />
                )}
                onPress={openHelpCenter}
              />

              <Badge
                size={16}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                }}
              >
                {cartItemCount}
              </Badge>
            </View>
          ),
        }}
        name={screenNames.BOOK_DETAILS}
        component={BookDetails}
      />

      {/* <Stack.Screen
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
      /> */}
    </Stack.Navigator>
  );
}
