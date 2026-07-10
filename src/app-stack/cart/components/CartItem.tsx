import { MinusIcon, PlusIcon, TrashIcon } from 'phosphor-react-native';
import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { Flex } from '~/design-system/custom-components';
import { FONT_WEIGHTS } from '~/design-system/tokens';
import { CartItemType } from '~/utils/types';

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  const { colors } = useAppTheme();

  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.image }}
        resizeMode="cover"
        style={styles.image}
      />

      <Flex style={{ flex: 1 }} gap={12}>
        <Flex justify="space-between" direction="row" align="flex-start">
          <Flex gap={4} style={{ flex: 1 }}>
            <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>

            <Text variant="bodyMedium" numberOfLines={1}>
              {item.author}
            </Text>
          </Flex>

          <IconButton
            icon={({ color, size }) => <TrashIcon color={color} size={size} />}
            onPress={onRemove}
          />
        </Flex>

        <Flex justify="space-between" direction="row" align="center">
          <Text variant="titleMedium" style={styles.price}>
            ${(item.price || 10).toFixed(2)}
          </Text>

          <Flex
            direction="row"
            align="center"
            gap={4}
            style={styles.quantityContainer}
          >
            <IconButton
              size={18}
              icon={({ color, size }) => (
                <MinusIcon color={color} size={size} />
              )}
              onPress={onDecrease}
            />

            <Text variant="titleMedium">{item.quantity}</Text>

            <IconButton
              size={18}
              icon={({ color, size }) => <PlusIcon color={color} size={size} />}
              onPress={onIncrease}
            />
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
};

export default CartItem;

const getStyles = (colors: Record<string, any>) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 12,
      borderRadius: 16,
      gap: 16,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border2,
    },

    image: {
      width: 90,
      aspectRatio: 0.65,
      borderRadius: 12,
      backgroundColor: colors.background,
    },

    title: {
      fontWeight: FONT_WEIGHTS.semiBold,
    },

    price: {
      color: colors.primary,
      fontWeight: FONT_WEIGHTS.bold,
    },

    quantityContainer: {
      borderRadius: 30,
      backgroundColor: colors.background,
      paddingHorizontal: 4,
    },
  });
