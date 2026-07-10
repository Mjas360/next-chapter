import { t } from 'i18next';
import React, { useMemo } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Flex, PaperButton } from '~/design-system/custom-components';
import {
  FONT_WEIGHTS,
  SCREEN_HORIZONTAL_PADDING,
} from '~/design-system/tokens';
import { navigate } from '~/services/navigationService';
import { screenNames } from '~/utils/screenNames';
import { useAppTheme } from '../../design-system/app-theme/useAppTheme';

const { width } = Dimensions.get('window');

const Onboarding = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const styles = useMemo(() => getStyles(colors, insets), [colors, insets]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('@assets/logos/app-icon.png')}
        resizeMode="contain"
      />
      <Image
        style={styles.image}
        source={require('@assets/images/onboarding-image.png')}
        resizeMode="contain"
      />

      <View style={styles.contentWrapper}>
        <Flex gap={8}>
          <Text variant="headlineLarge" style={styles.title}>
            {t('Your next chapter starts here.')}
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            {t(
              "Discover books you'll love, curated around your interests, and have them delivered right to your doorstep.",
            )}
          </Text>
        </Flex>

        <PaperButton
          mode="contained"
          style={{ minWidth: '60%' }}
          onPress={() => navigate(screenNames.BOOK_PREFERENCE)}
        >
          {t('Continue')}
        </PaperButton>
      </View>
    </View>
  );
};

export default Onboarding;

const getStyles = (colors: Record<string, any>, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    },
    logo: {
      width: width * 0.2,
      height: width * 0.2,
      position: 'absolute',
      top: insets.top,
      left: SCREEN_HORIZONTAL_PADDING,
      opacity: 0.8,
    },
    image: {
      width: width,
      height: width,
      maxWidth: 400,
      maxHeight: 400,
    },
    contentWrapper: {
      backgroundColor: colors.white,
      padding: 28,
      borderRadius: 24,
      width: '100%',
      gap: 24,
      alignItems: 'center',
    },
    title: {
      fontWeight: FONT_WEIGHTS.semiBold,
      textAlign: 'center',
    },
    subtitle: {
      color: colors.gray3,
      textAlign: 'center',
    },
  });
