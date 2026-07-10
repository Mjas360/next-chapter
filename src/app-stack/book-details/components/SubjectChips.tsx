import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { FONT_WEIGHTS } from '~/design-system/tokens';

interface SubjectChipsProps {
  title: string;
  items?: string[];
  maxItems?: number;
}

const SubjectChips = ({
  title,
  items = [],
  maxItems = 10,
}: SubjectChipsProps) => {
  const { colors } = useAppTheme();

  const styles = useMemo(() => getStyles(colors), [colors]);

  if (!items.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.heading}>
        {title}
      </Text>

      <View style={styles.itemContainer}>
        {items.slice(0, maxItems).map(item => (
          <Text key={item} variant="labelLarge" style={styles.label}>
            {item}
          </Text>
        ))}
      </View>

      {items.length > maxItems && (
        <Text variant="bodySmall" style={styles.moreText}>
          +{items.length - maxItems} more
        </Text>
      )}
    </View>
  );
};

export default SubjectChips;

const getStyles = (colors: Record<string, any>) =>
  StyleSheet.create({
    container: {
      gap: 12,
    },
    heading: {
      fontWeight: FONT_WEIGHTS.bold,
    },
    itemContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    label: {
      color: colors.onSurfaceVariant,
      flex: 1,
      minWidth: '60%',
    },

    chipText: {
      color: colors.onSurface,
    },
    moreText: {
      color: colors.primary,
      fontWeight: FONT_WEIGHTS.medium,
    },
  });
