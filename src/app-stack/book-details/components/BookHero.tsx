import {
    DownloadSimpleIcon,
    TranslateIcon
} from 'phosphor-react-native';
import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';

import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { FONT_WEIGHTS } from '~/design-system/tokens';

import AddtoFavorite from '~/design-system/custom-components/book-tile/components/AddtoFavorite';
import { BookComponentProps } from '../types';

const languageMap: Record<string, string> = {
  en: 'English',
  fr: 'French',
  de: 'German',
  es: 'Spanish',
  it: 'Italian',
  pt: 'Portuguese',
};

const BookHero = ({ book, ref: bookRef }: BookComponentProps) => {
  const { colors } = useAppTheme();

  const styles = useMemo(() => getStyles(colors), [colors]);

  const authorNames = book.authors?.map(author => author.name).join(', ');

  const language =
    languageMap[book.languages?.[0]] ?? book.languages?.[0]?.toUpperCase();

  return (
    <View style={styles.container} ref={bookRef}>
      <View style={styles.coverWrapper}>
        <Image
          source={{
            uri: book.formats['image/jpeg'],
          }}
          resizeMode="cover"
          style={styles.cover}
        />
        <View style={styles.favoriteButton}>
          <AddtoFavorite
            onAddToFavoritePress={() => {
              console.log('TODO: Add to favorite functionality');
            }}
          />
        </View>
      </View>

      <Text variant="headlineMedium" style={styles.title}>
        {book.title}
      </Text>

      <Text variant="titleMedium" style={styles.author}>
        {authorNames}
      </Text>

      <View style={styles.infoRow}>
        <Chip
          compact
          icon={({ size, color }) => (
            <TranslateIcon size={size} color={color} />
          )}
        >
          {language}
        </Chip>

        <Chip
          compact
          icon={({ size, color }) => (
            <DownloadSimpleIcon size={size} color={color} />
          )}
        >
          {book.download_count.toLocaleString()} readers
        </Chip>
      </View>
    </View>
  );
};

export default BookHero;

const getStyles = (colors: Record<string, any>) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 16,
    },

    coverWrapper: {
      position: 'relative',
      alignSelf: 'center',
    },

    cover: {
      width: 220,
      aspectRatio: 0.65,
      borderRadius: 20,
      backgroundColor: colors.surfaceVariant,
    },

    favoriteButton: {
      position: 'absolute',
      top: 12,
      right: 12,
      margin: 0,
    },

    title: {
      textAlign: 'center',
      fontWeight: FONT_WEIGHTS.bold,
    },

    author: {
      color: colors.onSurfaceVariant,
      textAlign: 'center',
    },

    infoRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 12,
    },
  });
