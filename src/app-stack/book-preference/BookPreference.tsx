import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from 'i18next';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Container,
  PaperButton,
  ScreenContent,
} from '~/design-system/custom-components';
import { SectionHeader } from '~/utility/SectionHeader';
import InterestChip from './components/InterestChip';
import { readingInterests } from './helpers/readingInterests';
import { navigate } from '~/services/navigationService';
import { screenNames } from '~/utils/screenNames';

export const ON_BOARDING_STORAGE_KEY = 'onboarding_completed';

const BookPreference = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelected(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id],
    );
  };

  const handleContinue = async () => {
    // we mock a temporary state asyn storage stse here
    // so we dont show this again on next app launch.
    try {
      await AsyncStorage.setItem(ON_BOARDING_STORAGE_KEY, JSON.stringify(true));

      // Navigate to the home screen
      navigate(screenNames.APP_TAB_STACK, {
        screen: screenNames.HOME,
      });
    } catch (error) {
      console.error('Failed to save cart', error);
    }
  };

  return (
    <ScreenContent applyInsets={false}>
      <Container gap={20} style={{ marginTop: 28, flex: 1, marginBottom: 60 }}>
        <SectionHeader
          title={t('Tell us what you enjoy')}
          subtitle={t(
            'Choose one or more topics to personalize your recommendations.',
          )}
        />

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          {readingInterests.map(item => (
            <InterestChip
              key={item.id}
              title={item.title}
              emoji={item.emoji}
              selected={selected.includes(item.id)}
              onPress={() => toggleInterest(item.id)}
            />
          ))}
        </View>

        <PaperButton
          mode="contained"
          onPress={handleContinue}
          style={{ marginTop: 20 }}
        >
          {t('Continue')}
        </PaperButton>
      </Container>
    </ScreenContent>
  );
};

export default BookPreference;
