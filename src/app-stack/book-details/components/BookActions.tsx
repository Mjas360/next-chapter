import {
  BookOpenIcon,
  DownloadSimpleIcon,
  ShoppingCartIcon,
} from 'phosphor-react-native';
import React, { useMemo } from 'react';
import { Linking, StyleSheet, View } from 'react-native';

import { useAppTheme } from '~/design-system/app-theme/useAppTheme';

import { t } from 'i18next';
import { Flex, PaperButton } from '~/design-system/custom-components';
import { BookComponentProps } from '../types';

const BookActions = ({ book, onAddToCart }: BookComponentProps) => {
  const { colors } = useAppTheme();

  const styles = useMemo(() => getStyles(colors), [colors]);

  const readUrl =
    book.formats['text/html'] ??
    book.formats['text/html; charset=utf-8'] ??
    book.formats['text/html; charset=us-ascii'];

  const epubUrl = book.formats['application/epub+zip'];

  const openUrl = async (url?: string) => {
    if (!url) {
      return;
    }

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <PaperButton
        mode="contained"
        icon={({ color, size }) => (
          <ShoppingCartIcon color={color} size={size} weight="bold" />
        )}
        onPress={onAddToCart}
      >
        {t('Add to cart')}
      </PaperButton>

      <Flex direction="row" gap={8}>
        {readUrl && (
          <PaperButton
            mode="outlined"
            contentStyle={{
              paddingHorizontal: 0,
              backgroundColor: colors.border2,
            }}
            style={{ flex: 1 }}
            icon={({ color, size }) => (
              <BookOpenIcon color={color} size={size} />
            )}
            onPress={() => openUrl(readUrl)}
          >
            {t('Read online')}
          </PaperButton>
        )}

        {epubUrl && (
          <PaperButton
            mode="outlined"
            contentStyle={{
              paddingHorizontal: 0,
              backgroundColor: colors.border2,
            }}
            style={{ flex: 1 }}
            icon={({ color, size }) => (
              <DownloadSimpleIcon color={color} size={size} />
            )}
            onPress={() => openUrl(epubUrl)}
          >
            {t('Download EPUB')}
          </PaperButton>
        )}
      </Flex>
    </View>
  );
};

export default BookActions;

const getStyles = (colors: Record<string, any>) =>
  StyleSheet.create({
    container: {
      gap: 12,
    },
  });
