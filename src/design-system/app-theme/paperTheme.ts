import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { lightTheme, darkTheme } from './theme';

export const paperLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,

    primary: lightTheme.colors.primary,
    background: lightTheme.colors.background,
    surface: lightTheme.colors.white,

    error: lightTheme.colors.danger,

    onSurface: lightTheme.colors.black,
    outline: lightTheme.colors.border,
  },
};

export const paperDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,

    primary: darkTheme.colors.primary,
    background: darkTheme.colors.background,
    surface: darkTheme.colors.black,

    error: darkTheme.colors.danger,

    onSurface: darkTheme.colors.white,
    outline: darkTheme.colors.border,
  },
};
