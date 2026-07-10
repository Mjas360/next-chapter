import { t } from 'i18next';
import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { INSET_SAFE_MARGIN } from '~/design-system/tokens';
import { useBreathingAnimation } from '~/hooks/useBreathingAnimation';
import { useFadeAnimation } from '~/hooks/useFadeAnimation';
import { RootState } from '~/redux/store';

const AuthLoadingOverlay = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const { isCheckingAuth } = useSelector(
    (state: RootState) => state.userReducer,
  );

  const { animatedStyle: breathAnimatedStyle } = useBreathingAnimation({
    minScale: 0.9,
    autoStart: isCheckingAuth,
  });

  const { shouldRender, animatedStyle: fadeAnimatedStyle } = useFadeAnimation({
    visible: isCheckingAuth || false,
    duration: 350,
  });

  if (!shouldRender) return null;

  return (
    <Portal>
      <StatusBar barStyle="light-content" translucent />

      <Animated.View
        style={[
          styles.wrapper,
          {
            backgroundColor: colors.primary,
          },
          fadeAnimatedStyle,
        ]}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Animated.View style={breathAnimatedStyle}>
            <Image
              source={require('@assets/logos/app-icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          <ActivityIndicator
            size="small"
            color={colors.white}
            style={styles.loader}
          />
        </View>

        <Text
          variant="bodyMedium"
          style={{
            marginBottom: insets.bottom + INSET_SAFE_MARGIN,
            color: colors.white,
            paddingHorizontal: 24,
            textAlign: 'center',
            fontFamily: 'Montserrat-Italic',
          }}
        >
          {t('Your story, one page at a time')}
        </Text>
      </Animated.View>
    </Portal>
  );
};

export default AuthLoadingOverlay;

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 170,
    opacity: 1,
  },
  loader: {
    marginTop: 16,
  },
});
