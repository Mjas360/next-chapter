import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { FONT_WEIGHTS } from '~/design-system/tokens';
import { BookTileProps } from '../type';
import AddtoFavorite from './AddtoFavorite';

interface ListTileProps extends Omit<BookTileProps, 'type'> {}

const ListTile = (props: ListTileProps) => {
  const { colors } = useAppTheme();

  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={props.onPress}
      style={styles.container}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={props.imageSource}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.content}>
        <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
          {props.title}
        </Text>

        <Text variant="bodyMedium" style={styles.description} numberOfLines={1}>
          {props.description}
        </Text>

        <Text variant="titleMedium" style={styles.price}>
          {props.price}
        </Text>
      </View>

      {props.onAddToFavoritePress && (
        <View style={styles.favorite}>
          <AddtoFavorite
            favorite={props.favorite}
            onAddToFavoritePress={props.onAddToFavoritePress}
          />
        </View>
      )}
    </Pressable>
  );
};

export default ListTile;

const getStyles = (colors: Record<string, any>) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingVertical: 12,
    },
    imageWrapper: {
      width: 90,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: colors.background,
    },
    image: {
      width: '100%',
      aspectRatio: 0.78,
      borderWidth: 1,
      borderColor: colors.border,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      gap: 6,
    },
    title: {
      fontWeight: FONT_WEIGHTS.semiBold,
    },
    description: {
      color: colors.onSurfaceVariant,
    },
    price: {
      marginTop: 4,
      fontWeight: FONT_WEIGHTS.semiBold,
      color: colors.primary,
    },
    favorite: {
      alignSelf: 'flex-start',
    },
  });
