import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { FONT_WEIGHTS } from '~/design-system/tokens';

import { BookComponentProps } from '../types';

const MAX_LINES = 5;

const BookSummary = ({ book }: BookComponentProps) => {
  const { colors } = useAppTheme();

  const styles = useMemo(() => getStyles(colors), [colors]);

  const [expanded, setExpanded] = useState(false);

  const summary =
    book.summaries?.[0]?.trim() ??
    'No summary is available for this book.';

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.heading}>
        Summary
      </Text>

      <Text
        variant="bodyLarge"
        style={styles.summary}
        numberOfLines={expanded ? undefined : MAX_LINES}
      >
        {summary}
      </Text>

      {book.summaries?.length > 0 && (
        <TouchableRipple
          borderless
          onPress={() => setExpanded(previous => !previous)}
        >
          <Text style={styles.action}>
            {expanded ? 'Show less' : 'Read more'}
          </Text>
        </TouchableRipple>
      )}
    </View>
  );
};

export default BookSummary;

const getStyles = (colors: Record<string, any>) =>
  StyleSheet.create({
    container: {
      gap: 12,
    },
    heading: {
      fontWeight: FONT_WEIGHTS.bold,
    },
    summary: {
      color: colors.onSurfaceVariant,
      lineHeight: 26,
    },
    action: {
      color: colors.primary,
      fontWeight: FONT_WEIGHTS.semiBold,
      alignSelf: 'flex-start',
    },
  });