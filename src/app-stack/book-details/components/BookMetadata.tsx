import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { FONT_WEIGHTS } from '~/design-system/tokens';

import { InfoRow } from '~/design-system/custom-components';
import { BookComponentProps } from '../types';
import { t } from 'i18next';

const languageMap: Record<string, string> = {
  en: 'English',
  fr: 'French',
  de: 'German',
  es: 'Spanish',
  it: 'Italian',
  pt: 'Portuguese',
};

const BookMetadata = ({ book }: BookComponentProps) => {
  const { colors } = useAppTheme();

  const styles = useMemo(() => getStyles(colors), [colors]);

  const metadata = [
    {
      label: t('Language'),
      value:
        languageMap[book.languages?.[0]] ??
        book.languages?.[0]?.toUpperCase() ??
        '-',
    },
    {
      label: t('Downloads'),
      value: `${book.download_count.toLocaleString()} readers`,
    },
    {
      label: t('Media Type'),
      value: book.media_type,
    },
    {
      label: t('Copyright'),
      value: book.copyright ? 'Protected' : 'Public Domain',
    },
    {
      label: t('Authors'),
      value: book.authors.map(author => author.name).join(', '),
    },
  ];

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.heading}>
        Book Details
      </Text>

      <View style={styles.card}>
        {metadata.map((item, index) => (
          <InfoRow
            key={item.label}
            label={item.label}
            value={item.value}
            showDivider={index !== metadata.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

export default BookMetadata;

const getStyles = (colors: Record<string, any>) =>
  StyleSheet.create({
    container: {
      gap: 12,
    },

    heading: {
      fontWeight: FONT_WEIGHTS.bold,
    },

    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      overflow: 'hidden',
    },
  });
