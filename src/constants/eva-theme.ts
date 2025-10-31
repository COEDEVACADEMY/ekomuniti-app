import * as eva from '@eva-design/eva';
import { Colors } from './theme';
import customTheme from '../theme.json'; 

const { light: lightColors, dark: darkColors } = Colors;

const baseLightTheme = eva.light;
const baseDarkTheme = eva.dark;

export const lightTheme = {
  ...baseLightTheme,
  ...customTheme,
  colors: {
    ...baseLightTheme.colors,
    'background-basic-color-1': lightColors.background,
    'text-basic-color': lightColors.text,
    'color-primary-500': lightColors.tint,
  },
};

export const darkTheme = {
  ...baseDarkTheme,
  ...customTheme,
  colors: {
    ...baseDarkTheme.colors,
    'background-basic-color-1': darkColors.background,
    'text-basic-color': darkColors.text,
    'color-primary-500': darkColors.tint,
  },
};
