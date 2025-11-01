/**
 * Global Image Assets Helper
 * Import dan gunakan di mana saja dalam aplikasi
 *
 * Contoh penggunaan:
 * import { images } from '@/constants/images';
 * <Image source={images.logo} />
 */

export const images = {
  // App Icons
  icon: require('../assets/images/icon.png'),
  favicon: require('../assets/images/favicon.png'),
  splashIcon: require('../assets/images/splash-icon.png'),

  // Logos
  logo: require('../assets/images/logo.jpeg'),
  reactLogo: require('../assets/images/react-logo.png'),
  reactLogo2x: require('../assets/images/react-logo@2x.png'),
  reactLogo3x: require('../assets/images/react-logo@3x.png'),
  partialReactLogo: require('../assets/images/partial-react-logo.png'),

  // Android Icons
  androidIconBackground: require('../assets/images/android-icon-background.png'),
  androidIconForeground: require('../assets/images/android-icon-foreground.png'),
  androidIconMonochrome: require('../assets/images/android-icon-monochrome.png'),

  // Illustrations
  ilCommunity: require('../assets/illustration/ilCommunity.png'),
} as const;

// Export type untuk autocomplete yang lebih baik
export type ImageKeys = keyof typeof images;

// Helper function untuk mendapatkan image berdasarkan key (opsional)
export const getImage = (key: ImageKeys) => images[key];
