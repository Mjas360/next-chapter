import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../../design-system/app-theme/useAppTheme';
import { PaperButton } from '../../design-system/custom-components';
import {
  INSET_SAFE_MARGIN,
  SCREEN_HORIZONTAL_PADDING,
} from '../../design-system/tokens';
import { navigate } from '../../services/navigationService';
import { screenNames } from '../../utils/screenNames';
import { ONBOARDING_DATA } from './helpers/helper';
import { useOnboardingAnimation } from './helpers/useOnboardingAnimation';
import GlassSubtitle from './components/GlassSubtitle';
import Flex from '~/design-system/custom-components/Flex';
import { LockKeyIcon } from 'phosphor-react-native';
import { t } from 'i18next';

const { width } = Dimensions.get('window');

const Onboarding = () => {
  const insets = useSafeAreaInsets();
  const { scrollX, getFadeAnimation } = useOnboardingAnimation();
  const { colors } = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Logo */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + INSET_SAFE_MARGIN,
          left: SCREEN_HORIZONTAL_PADDING,
          zIndex: 1,
        }}
      >
        <Image
          source={require('@assets/logos/logo-white.png')}
          style={{ width: 148 }}
          resizeMode="contain"
        />
      </View>

      {/* Slides */}
      <Animated.FlatList
        data={ONBOARDING_DATA}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        renderItem={({ item }) => {
          return (
            <View style={{ width }}>
              <ImageBackground
                source={{ uri: item.image }}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  padding: SCREEN_HORIZONTAL_PADDING,
                }}
              />
            </View>
          );
        }}
      />

      {/* Actions */}
      <View
        style={{
          position: 'absolute',
          bottom: insets.bottom + INSET_SAFE_MARGIN,
          width: '100%',
          paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
        }}
      >
        {/* Indicators */}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginBottom: 16,
          }}
        >
          {ONBOARDING_DATA.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={i}
                style={{
                  height: 3,
                  width: 26,
                  borderRadius: 4,
                  backgroundColor: colors.white,
                  marginRight: 8,
                  opacity,
                  // transform: [{ scale }],
                }}
              />
            );
          })}
        </View>

        {/* Text Info */}
        <View style={{ minHeight: 200, height: 'auto' }}>
          {ONBOARDING_DATA.map((item, i) => (
            <Animated.View
              key={item.id}
              style={[
                {
                  position: 'absolute',
                  width: '100%',
                },
                getFadeAnimation(i),
              ]}
            >
              <Text
                variant="headlineLarge"
                style={{
                  fontWeight: 'bold',
                  color: colors.white,
                  marginBottom: 14,
                }}
              >
                {item.title}
              </Text>

              <GlassSubtitle text={item.subtitle} srcs={item.miniImages} />
            </Animated.View>
          ))}
        </View>

        <Flex gap={16}>
          <PaperButton
            mode="contained"
            onPress={() => navigate(screenNames.LOGIN)}
          >
            {t('Login')}
          </PaperButton>

          <PaperButton
            mode="outlined"
            textColor={colors.white}
            onPress={() => navigate(screenNames.SIGNUP)}
          >
            {t('Sign Up')}
          </PaperButton>

          <Flex direction="row" gap={8} align="center" justify="center">
            <LockKeyIcon size={16} weight="bold" color={colors.success} />
            <Text
              style={{
                color: colors.gray2,
                textAlign: 'center',
              }}
            >
              {t('Your money stays yours')}
            </Text>
          </Flex>
        </Flex>
      </View>
    </View>
  );
};

export default Onboarding;
