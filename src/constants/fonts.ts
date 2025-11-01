/**
 * Global Font Helper
 * Import dan gunakan di mana saja dalam aplikasi
 *
 * Contoh penggunaan:
 * import { fontFamily } from '@/constants/fonts';
 * <Text style={{ fontFamily: fontFamily.regular }}>Hello</Text>
 */

export const fontFamily = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;

// Export type untuk autocomplete
export type FontFamily = keyof typeof fontFamily;
export type FontWeight = keyof typeof fontWeight;
