# Global Image Assets Helper

Helper untuk mengelola semua image assets di aplikasi secara terpusat.

## Cara Penggunaan

### Import

```typescript
import { images } from '@/constants/images';
// atau
import { images } from '@/constants';
```

### Penggunaan di Component

```typescript
import { Image } from 'react-native';
import { images } from '@/constants/images';

export default function MyComponent() {
  return (
    <Image
      source={images.logo}
      style={{ width: 100, height: 100 }}
    />
  );
}
```

### Dengan Tamagui Image

```typescript
import { Image } from 'tamagui';
import { images } from '@/constants/images';

export default function MyComponent() {
  return (
    <Image
      source={images.ilCommunity}
      width={200}
      height={200}
    />
  );
}
```

### Menggunakan Helper Function

```typescript
import { getImage } from '@/constants/images';

const myImage = getImage('logo');
```

## Available Images

### App Icons
- `icon`
- `favicon`
- `splashIcon`

### Logos
- `logo`
- `reactLogo`
- `reactLogo2x`
- `reactLogo3x`
- `partialReactLogo`

### Android Icons
- `androidIconBackground`
- `androidIconForeground`
- `androidIconMonochrome`

### Illustrations
- `ilCommunity`

## Menambah Image Baru

1. Letakkan file image di folder yang sesuai:
   - `/src/assets/images/` untuk icon, logo, dll
   - `/src/assets/illustration/` untuk ilustrasi

2. Tambahkan ke `src/constants/images.ts`:

```typescript
export const images = {
  // ... existing images
  namaImageBaru: require('../assets/images/nama-file.png'),
} as const;
```

3. Image sudah bisa digunakan di seluruh aplikasi dengan autocomplete!

## Keuntungan

- ✅ Type-safe dengan TypeScript
- ✅ Autocomplete di IDE
- ✅ Satu tempat untuk manage semua image
- ✅ Mudah refactor dan maintain
- ✅ Import path yang konsisten
