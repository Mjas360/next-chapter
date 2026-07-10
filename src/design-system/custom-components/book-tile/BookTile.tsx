import React from 'react';
import { Text, View } from 'react-native';
import BlockTile from './components/BlockTile';
import { BookTileProps } from './type';
import ListTile from './components/ListTile';

export const BookTile = ({
  type,
  onPress,
  favorite,
  onAddToFavoritePress,
  imageSource,
  title,
  description,
  price,
  style,
}: BookTileProps) => {
  if (type === 'block') {
    return (
      <BlockTile
        onPress={onPress}
        favorite={favorite}
        onAddToFavoritePress={onAddToFavoritePress}
        imageSource={imageSource}
        title={title}
        description={description}
        price={price}
        style={style}
      />
    );
  }

  return (
    <ListTile
      onPress={onPress}
      favorite={favorite}
      onAddToFavoritePress={onAddToFavoritePress}
      imageSource={imageSource}
      title={title}
      description={description}
      price={price}
      style={style}
    />
  );
};
