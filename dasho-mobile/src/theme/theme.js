import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { lightColors, darkColors } from './colors';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: lightColors.primary,
    primaryContainer: lightColors.primaryDark,
    secondary: lightColors.secondary,
    background: lightColors.background,
    surface: lightColors.surface,
    error: lightColors.error,
    text: lightColors.text,
    onSurface: lightColors.text,
    onBackground: lightColors.text,
    outline: lightColors.border,
  },
  custom: lightColors,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: darkColors.primary,
    primaryContainer: darkColors.primaryDark,
    secondary: darkColors.secondary,
    background: darkColors.background,
    surface: darkColors.surface,
    error: darkColors.error,
    text: darkColors.text,
    onSurface: darkColors.text,
    onBackground: darkColors.text,
    outline: darkColors.border,
  },
  custom: darkColors,
};
