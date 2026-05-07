import { t } from 'i18next';
import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { INSET_SAFE_MARGIN } from '~/design-system/tokens';
import { useBreathingAnimation } from '~/hooks/useBreathingAnimation';
import { RootState } from '~/redux/store';

const AuthLoadingOverlay = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const { isCheckingAuth } = useSelector(
    (state: RootState) => state.userReducer,
  );

  const { animatedStyle } = useBreathingAnimation({
    minScale: 0.9,
    autoStart: isCheckingAuth,
  });

  if (!isCheckingAuth) return null;

  return (
    <Portal>
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor: colors.primary,
          },
        ]}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Animated.View style={animatedStyle}>
            <Image
              source={require('@assets/logos/logo-white.png')}
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
          {t('Send money and pay bills without the stress')}
        </Text>
      </View>
    </Portal>
  );
};

export default AuthLoadingOverlay;

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
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
