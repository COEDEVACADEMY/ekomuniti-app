import { createTamagui, createTokens, createFont } from 'tamagui';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createMedia } from '@tamagui/react-native-media-driver';

// Create Plus Jakarta Sans font configuration
const plusJakartaSansFont = createFont({
  family: 'PlusJakartaSans_400Regular',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 40,
    10: 48,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
    4: 28,
    5: 32,
    6: 36,
    7: 40,
    8: 48,
    9: 56,
    10: 64,
  },
  weight: {
    1: '400',
    2: '400',
    3: '500',
    4: '500',
    5: '600',
    6: '600',
    7: '700',
    8: '700',
  },
  letterSpacing: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  },
  face: {
    400: { normal: 'PlusJakartaSans_400Regular' },
    500: { normal: 'PlusJakartaSans_500Medium' },
    600: { normal: 'PlusJakartaSans_600SemiBold' },
    700: { normal: 'PlusJakartaSans_700Bold' },
  },
});

const tamaguiTokens = createTokens({
  ...tokens,
});

export const config = createTamagui({
  tokens: tamaguiTokens,
  themes,
  fonts: {
    body: plusJakartaSansFont,
    heading: plusJakartaSansFont,
  },
  defaultFont: 'body',
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
  shorthands,
});

export default config;

export type AppConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
