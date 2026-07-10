import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { t } from 'i18next';
import { HeadsetIcon, ShoppingCartIcon } from 'phosphor-react-native';
import React from 'react';
import { View } from 'react-native';
import { Appbar, Badge } from 'react-native-paper';
import { useSelector } from 'react-redux';
import BookDetails from '~/app-stack/book-details/BookDetails';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import type { RootState } from '~/redux/store';
import { navigateToCart, openHelpCenter } from '~/utils/externalLinkActions';
import Onboarding from '../app-stack/onboarding/Onboarding';
import Search from '../app-stack/search/Search';
import { screenNames } from '../utils/screenNames';
import { ScreenHeader } from './components/ScreenHeader';
import BookPreference from '~/app-stack/book-preference/BookPreference';

const Stack = createNativeStackNavigator();

export function OtherNavigator() {
  const { colors } = useAppTheme();
  const { items } = useSelector((state: RootState) => state.cartReducer);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const renderCartIconWithBadge = () => {
    return (
      <View>
        <Appbar.Action
          icon={({ size, color }) => (
            <ShoppingCartIcon size={size} color={color} weight="bold" />
          )}
          onPress={navigateToCart}
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
    );
  };

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
          // headerShown: false,
          title: "-"
        }}
        name={screenNames.BOOK_PREFERENCE}
        component={BookPreference}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          title: t('Search'),
          headerRight: () => renderCartIconWithBadge(),
        }}
        name={screenNames.SEARCH}
        component={Search}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          title: t('Book Details'),
          headerRight: () => renderCartIconWithBadge(),
        }}
        name={screenNames.BOOK_DETAILS}
        component={BookDetails}
      />
    </Stack.Navigator>
  );
}
