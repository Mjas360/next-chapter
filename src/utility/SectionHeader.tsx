import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '~/design-system/app-theme/useAppTheme';

type SectionHeaderProps = {
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  align?: 'left' | 'center';
  gap?: number;
};

export const SectionHeader = ({
  title,
  subtitle,
  align = 'left',
  gap = 8,
}: SectionHeaderProps) => {
  const { colors } = useAppTheme();
  const textAlign = align === 'center' ? 'center' : 'left';

  if (!title && !subtitle) return null;

  return (
    <View>
      {typeof title === 'string' ? (
        <Text
          variant="headlineMedium"
          style={{ textAlign, fontWeight: '700', color: colors.not_black }}
        >
          {title}
        </Text>
      ) : (
        title
      )}
      {typeof subtitle === 'string' ? (
        <Text
          variant="titleMedium"
          style={{
            textAlign,
            color: colors.gray2,
            marginTop: gap,
          }}
        >
          {subtitle}
        </Text>
      ) : (
        subtitle
      )}
    </View>
  );
};
