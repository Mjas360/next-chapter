import { Icon } from 'phosphor-react-native';
import React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '../../design-system/app-theme/useAppTheme';

type Props = {
  icon: Icon;
  size: number;
  color: string;
  focused?: boolean;
};

export function TabIcon({ icon, size, color, focused }: Props) {
  const theme = useAppTheme();
  const { colors } = theme;

  const Icon = icon;

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: focused ? colors.background2 : 'transparent',
        borderRadius: 9999,
        paddingVertical: size * 0.18,
        paddingHorizontal: size * 0.8,
      }}
    >
      <Icon size={size} color={color} weight={focused ? 'fill' : 'regular'} />
    </View>
  );
}
