import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../app-theme/useAppTheme';
import { FONT_WEIGHTS } from '../tokens';

interface InfoRowProps {
  label: string;
  value: string;
  showDivider?: boolean;
}

export const InfoRow = ({ label, value, showDivider = true }: InfoRowProps) => {
  const { colors } = useAppTheme();

  const styles = useMemo(() => getRowStyles(colors), [colors]);

  return (
    <View>
      <View style={styles.row}>
        <Text variant="labelLarge" style={styles.label}>
          {label}
        </Text>

        <Text variant="bodyMedium" style={styles.value}>
          {value}
        </Text>
      </View>

      {showDivider && <View style={styles.divider} />}
    </View>
  );
};

const getRowStyles = (colors: Record<string, any>) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16,
      //   paddingHorizontal: 16,
      paddingVertical: 14,
    },

    label: {
      color: colors.onSurfaceVariant,
      flex: 1,
    },

    value: {
      flex: 2,
      textAlign: 'right',
      fontWeight: FONT_WEIGHTS.medium,
      color: colors.onSurface,
    },

    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.outlineVariant,
      marginHorizontal: 16,
    },
  });
