import { t } from 'i18next';
import { WarningCircleIcon } from 'phosphor-react-native';
import React, { ReactNode } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';

type Props = {
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;

  error?: Error | any;

  loadingMessage?: string;

  onRetry?: () => void;

  style?: StyleProp<ViewStyle>;

  children: ReactNode;
};

const QueryState = ({
  isLoading = false,
  isError = false,
  isFetching = false,
  error,
  loadingMessage = t('Loading...'),
  onRetry,
  style,
  children,
}: Props) => {
  const { colors } = useAppTheme();

  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator size="large" color={colors.primary} />

        <Text
          variant="bodyLarge"
          style={{
            color: colors.gray3,
            textAlign: 'center',
          }}
        >
          {loadingMessage}
        </Text>
      </View>
    );
  }

  if (isError) {
    const message =
      typeof error === 'string'
        ? error
        : error instanceof Error
        ? error.message
        : t('Something went wrong.');

    return (
      <View style={[styles.container, style]}>
        <WarningCircleIcon size={40} color={colors.danger} weight="fill" />

        <Text
          variant="bodyLarge"
          style={{
            color: colors.danger,
            textAlign: 'center',
            maxWidth: 280,
          }}
        >
          {message}
        </Text>

        {!!onRetry && (
          <Button mode="outlined" loading={isFetching} onPress={onRetry}>
            {t('Retry')}
          </Button>
        )}
      </View>
    );
  }

  return <>{children}</>;
};

export default QueryState;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
  },
});
