import { t } from 'i18next';
import { WarningCircleIcon } from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Config } from 'react-native-config';
import { MD3Colors, Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { PaperButton } from '~/design-system/custom-components';

type AppErrorFallbackProps = {
  error?: Error | any;
  onRetry: () => void;
};

const AppErrorFallback = ({ error, onRetry }: AppErrorFallbackProps) => {
  const { colors } = useAppTheme();

  const isDevelopment = __DEV__ || Config.ENV !== 'production';

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconWrapper,
          {
            backgroundColor: MD3Colors.error95,
          },
        ]}
      >
        <WarningCircleIcon size={44} weight="fill" color={colors.danger} />
      </View>

      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>
          {t('Something went wrong')}
        </Text>

        <Text
          variant="bodyLarge"
          style={[
            styles.description,
            {
              color: colors.gray3,
            },
          ]}
        >
          {t(
            'We ran into an unexpected problem while loading this screen. Please try again.',
          )}
        </Text>
      </View>

      {isDevelopment && error instanceof Error && (
        <Text
          variant="bodyMedium"
          style={{
            color: colors.danger,
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          {error.message}
        </Text>
      )}

      <PaperButton
        mode="contained"
        onPress={onRetry} // TODO: Add hot reload app logic here (Stallion relaod)
        buttonColor={colors.primary}
        style={styles.button}
      >
        {t('Try again')}
      </PaperButton>
    </View>
  );
};

export default AppErrorFallback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },

  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    alignItems: 'center',
    gap: 8,
  },

  title: {
    textAlign: 'center',
  },

  description: {
    textAlign: 'center',
    maxWidth: 320,
  },

  button: {
    minWidth: 180,
  },
});
