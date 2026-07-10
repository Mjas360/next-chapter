import React, { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';
import { FONT_WEIGHTS } from '~/design-system/tokens';

interface InterestChipProps {
  title: string;
  emoji?: string;
  selected?: boolean;
  onPress?: () => void;
}

const InterestChip = ({
  title,
  emoji,
  selected = false,
  onPress,
}: InterestChipProps) => {
  const { colors } = useAppTheme();

  const styles = useMemo(() => getStyles(colors, selected), [colors, selected]);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      {!!emoji && (
        <Text variant="headlineSmall" style={styles.emoji}>
          {emoji}
        </Text>
      )}

      <Text variant="bodyMedium" style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
};

export default InterestChip;

const getStyles = (colors: Record<string, any>, selected: boolean) =>
  StyleSheet.create({
    container: {
      width: '48%',
      minHeight: 100,

      borderRadius: 18,

      borderWidth: 1.5,
      borderColor: selected ? colors.primary : colors.border2,

      backgroundColor: selected ? colors.primaryContainer : colors.surface,

      alignItems: 'center',
      justifyContent: 'center',

      paddingHorizontal: 12,
      paddingVertical: 18,

      gap: 10,
    },

    pressed: {
      opacity: 0.8,
      transform: [{ scale: 0.98 }],
    },

    emoji: {
      fontSize: 30,
    },

    title: {
      textAlign: 'center',
      fontWeight: FONT_WEIGHTS.medium,
      color: selected ? colors.primary : colors.onSurface,
    },
  });
