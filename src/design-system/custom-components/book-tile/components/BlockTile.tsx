import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { FONT_WEIGHTS } from '~/design-system/tokens';
import { BookTileProps } from '../type';
import AddtoFavorite from './AddtoFavorite';

interface BlockTileProps extends Omit<BookTileProps, 'type'> {}

const BlockTile = (props: BlockTileProps) => {
  const { colors } = useAppTheme();

  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={props.onPress}
      style={styles.container}
    >
      <View style={styles.imageWrapper}>
        {props.onAddToFavoritePress && (
          <View style={styles.favoriteButtonWrapper}>
            <AddtoFavorite
              favorite={props.favorite}
              onAddToFavoritePress={props.onAddToFavoritePress}
            />
          </View>
        )}
        <Image
          source={props.imageSource}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View>
        <Text variant="bodyLarge" style={styles.title} numberOfLines={2}>
          {props.title}
        </Text>

        <Text variant="bodyMedium" numberOfLines={1}>
          {props.description}
        </Text>

        <Text variant="bodyLarge" style={styles.price} numberOfLines={2}>
          {props.price}
        </Text>
      </View>
    </Pressable>
  );
};

export default BlockTile;

const getStyles = (colors: Record<string, any>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      maxWidth: '50%',
      gap: 16,
    },
    imageWrapper: {
      position: 'relative',
      width: '100%',
      padding: 20,
      overflow: 'hidden',
      borderRadius: 12,
    },
    favoriteButtonWrapper: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
    },
    image: {
      maxWidth: 150,
      flex: 1,
      aspectRatio: 0.6,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: {
      fontWeight: FONT_WEIGHTS.semiBold,
    },
    price: {
      fontWeight: FONT_WEIGHTS.semiBold,
      marginTop: 6,
    },
  });
