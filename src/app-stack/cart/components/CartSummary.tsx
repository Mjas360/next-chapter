import { t } from 'i18next';
import { TrashIcon } from 'phosphor-react-native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { Flex, PaperButton } from '~/design-system/custom-components';
import { FONT_WEIGHTS } from '~/design-system/tokens';
import openNativeAlert from '~/utility/openNativeAlert';

interface CartSummaryProps {
  subtotal: number;
  total: number;
  onCheckout: () => void;
  onClear: () => void;
}

const CartSummary = ({
  subtotal,
  total,
  onCheckout,
  onClear,
}: CartSummaryProps) => {
  const { colors } = useAppTheme();

  const styles = useMemo(() => getStyles(colors), [colors]);

  const handleClearCart = () => {
    openNativeAlert({
      title: t('Clear Cart'),
      message: t('Are you sure you want to clear the cart?'),
      actions: [
        {
          text: t('Cancel'),
          style: 'cancel',
        },
        {
          text: t('Yes, Clear'),
          style: 'destructive',
          onPress: onClear,
        },
      ],
    });
  };

  const handleCheckout = () => {
    openNativeAlert({
      title: t('Pending Feature'),
      message: t(
        'This action is currently pending and will be implemented in the future.',
      ),
      actions: [
        {
          text: t('Cancel'),
          style: 'cancel',
        },
        {
          text: t('Ok, got it!'),
          style: 'default',
          onPress: onCheckout,
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Flex justify="space-between" direction="row">
        <Text variant="bodyLarge">Subtotal</Text>

        <Text variant="bodyLarge">${subtotal.toFixed(2)}</Text>
      </Flex>

      <Flex justify="space-between" direction="row">
        <Text variant="bodyLarge">{t("Delivery")}</Text>

        <Text variant="bodyLarge">{t("Free")}</Text>
      </Flex>

      <Divider />

      <Flex justify="space-between" direction="row">
        <Text variant="titleMedium" style={styles.total}>
          {t("Total")}
        </Text>

        <Text variant="titleMedium" style={styles.total}>
          ${total.toFixed(2)}
        </Text>
      </Flex>

      <PaperButton mode="contained" onPress={handleCheckout}>
        {t('Proceed to Checkout')}
      </PaperButton>

      <PaperButton
        mode="outlined"
        icon={({ size, color }) => (
          <TrashIcon size={size} color={color} weight="bold" />
        )}
        labelStyle={{ color: colors.danger }}
        onPress={handleClearCart}
      >
        {t('Clear Cart')}
      </PaperButton>
    </View>
  );
};

export default CartSummary;

const getStyles = (colors: Record<string, any>) =>
  StyleSheet.create({
    container: {
      padding: 20,
      borderRadius: 20,
      gap: 16,
      marginTop: 12,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border2,
    },

    total: {
      fontWeight: FONT_WEIGHTS.bold,
      color: colors.primary,
    },
  });
