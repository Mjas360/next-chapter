import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { useAppTheme } from '../../design-system/app-theme/useAppTheme';

export function CustomTabBar({ navigation, state, descriptors, insets }: any) {
  const theme = useAppTheme();
  const { colors } = theme;

  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      activeColor={colors.primary}
      inactiveColor={colors.not_black}
      style={{
        backgroundColor: colors.white,
      }}
      activeIndicatorStyle={{
        backgroundColor: colors.background,
        opacity: 0
      }}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
          return;
        }

        // Get real route name from state
        const tab = state.routes.find((r: any) => r.key === route.key);

        if (tab) {
          navigation.navigate(tab.name);
        }
      }}
      renderIcon={({ route, focused, color }) => {
        const { options } = descriptors[route.key];
        return options.tabBarIcon?.({ focused, color, size: 24 });
      }}
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key];

        const tab = state.routes.find((r: any) => r.key === route.key);
        return options.tabBarLabel ?? options.title ?? tab.name;
      }}
    />
  );
}
