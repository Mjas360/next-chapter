import { HeartIcon } from 'phosphor-react-native';
import React from 'react';
import { Pressable } from 'react-native';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { BookTileProps } from '../type';

type BlockTileProps = Pick<BookTileProps, 'favorite' | 'onAddToFavoritePress'>;

const AddtoFavorite = (props: BlockTileProps) => {
  const { colors } = useAppTheme();
  return (
    <Pressable
      onPress={() => props.onAddToFavoritePress?.()}
      accessibilityRole="button"
      style={{
        padding: 12,
        borderRadius: 999,
        backgroundColor: colors.white,
      }}
    >
      <HeartIcon
        weight={props.favorite ? 'fill' : 'regular'}
        color={props.favorite ? colors.danger : colors.not_black}
      />
    </Pressable>
  );
};

export default AddtoFavorite;
