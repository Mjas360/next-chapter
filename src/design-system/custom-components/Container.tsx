import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SCREEN_HORIZONTAL_PADDING } from '../tokens';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  center?: boolean;
  row?: boolean;
  noPadding?: boolean;
  gap?: number;
  backgroundColor?: string;
}

export const Container = ({
  children,
  style,
  center = false,
  row = false,
  noPadding = false,
  gap,
  backgroundColor,
}: ContainerProps) => {
  return (
    <View
      style={[
        styles.base,
        row && styles.row,
        center && styles.center,
        !noPadding && styles.padding,
        backgroundColor && { backgroundColor },
        gap != null && { gap },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
  padding: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
