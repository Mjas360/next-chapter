import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleProp, ViewProps } from 'react-native';
import { Appbar } from 'react-native-paper';

type Props = NativeStackHeaderProps & {
  rightActions?: React.ReactNode;
  leftIcon?: string;
  headerStyles?: StyleProp<ViewProps>;
};

export function ScreenHeader({
  navigation,
  route,
  options,
  back,
  rightActions,
  headerStyles,
}: Props) {
  const title = options.title == '-' ? '' : options.title || route.name;

  const canGoBack = back != null;
  const HeaderRight = options.headerRight;

  return (
    <Appbar.Header style={{ backgroundColor: 'none', ...headerStyles }}>
      {canGoBack ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        options.headerLeft?.({}) ?? null
      )}

      {/* TITLE */}
      <Appbar.Content
        title={title}
        titleStyle={{
          fontSize: 20,
          fontWeight: '500',
        }}
        style={{
          alignItems: 'flex-start',
        }}
      />

      {HeaderRight ? <HeaderRight /> : rightActions}
    </Appbar.Header>
  );
}
