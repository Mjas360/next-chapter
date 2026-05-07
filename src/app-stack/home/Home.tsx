import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { SCREEN_HORIZONTAL_PADDING } from '~/design-system/tokens';
import LinkedWallets from '~/utility/linked-wallets/LinkedWallets';
import {
  ScreenContent
} from '../../design-system/custom-components';
import HomeAppbar from './components/HomeAppbar';

const Home = () => {
  const { colors } = useAppTheme();
  return (
    <View
      style={{
        minHeight: '100%',
        backgroundColor: colors.background,
      }}
    >
      <HomeAppbar />
      <ScreenContent
        applyInsets={false}
        styles={{
          paddingTop: 12,
          paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
          gap: 16,
        }}
      >
        <LinkedWallets />
        <Text>Qick Services</Text>
        <Text>Verify your email - dynamic</Text>
        <Text>Transactions</Text>
      </ScreenContent>
    </View>
  );
};

export default Home;
