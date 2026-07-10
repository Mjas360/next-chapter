import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { SCREEN_HORIZONTAL_PADDING } from '~/design-system/tokens';
import { navigate } from '~/services/navigationService';
import BookListing from '~/utility/BookListing';
import { screenNames } from '~/utils/screenNames';
import {
  PaperButton,
  ScreenContent,
} from '../../design-system/custom-components';
import HomeAppbar from './components/HomeAppbar';
import SpotLight from './components/spot-light/SpotLight';

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
          gap: 24,
          marginBottom: 44,
        }}
      >
        <SpotLight />
        <BookListing />

        <PaperButton onPress={() => navigate(screenNames.DISCOVERY)}>
          {t('See all books')}
        </PaperButton>
      </ScreenContent>
    </View>
  );
};

export default Home;
