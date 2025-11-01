# Font Configuration - Plus Jakarta Sans

Font **Plus Jakarta Sans** telah dikonfigurasi sebagai default font untuk project ini.

## Apa yang Sudah Dikonfigurasi?

✅ Font Plus Jakarta Sans terinstall via `@expo-google-fonts/plus-jakarta-sans`
✅ Font loading di setup di `src/app/_layout.tsx`
✅ Tamagui dikonfigurasi untuk menggunakan Plus Jakarta Sans sebagai default
✅ Helper constants tersedia di `src/constants/fonts.ts`

## Cara Penggunaan

### 1. Dengan Tamagui Components (Recommended)

Semua Tamagui components secara otomatis menggunakan Plus Jakarta Sans:

```tsx
import { Text, H1, H2, Paragraph } from 'tamagui';

export default function MyScreen() {
  return (
    <>
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <Text>Body text - otomatis pakai Plus Jakarta Sans</Text>
      <Paragraph>Paragraph text</Paragraph>

      {/* Menggunakan font weight berbeda */}
      <Text fontWeight="600">Semi Bold Text</Text>
      <Text fontWeight="700">Bold Text</Text>
    </>
  );
}
```

### 2. Dengan React Native Components

Jika menggunakan React Native `Text` atau `TextInput`, gunakan helper dari constants:

```tsx
import { Text, TextInput } from 'react-native';
import { fontFamily } from '@/constants/fonts';

export default function MyComponent() {
  return (
    <>
      <Text style={{ fontFamily: fontFamily.regular }}>
        Regular Text
      </Text>

      <Text style={{ fontFamily: fontFamily.medium }}>
        Medium Text
      </Text>

      <Text style={{ fontFamily: fontFamily.semiBold }}>
        Semi Bold Text
      </Text>

      <Text style={{ fontFamily: fontFamily.bold }}>
        Bold Text
      </Text>

      <TextInput
        style={{ fontFamily: fontFamily.regular }}
        placeholder="Input text"
      />
    </>
  );
}
```

### 3. Dengan StyleSheet

```tsx
import { StyleSheet, Text } from 'react-native';
import { fontFamily } from '@/constants/fonts';

const styles = StyleSheet.create({
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
});

export default function MyComponent() {
  return (
    <>
      <Text style={styles.title}>Title</Text>
      <Text style={styles.body}>Body text</Text>
    </>
  );
}
```

## Font Weights yang Tersedia

| Weight | Font Family | Helper Constant |
|--------|-------------|-----------------|
| 400 (Regular) | PlusJakartaSans_400Regular | `fontFamily.regular` |
| 500 (Medium) | PlusJakartaSans_500Medium | `fontFamily.medium` |
| 600 (Semi Bold) | PlusJakartaSans_600SemiBold | `fontFamily.semiBold` |
| 700 (Bold) | PlusJakartaSans_700Bold | `fontFamily.bold` |

## Tamagui Font Sizes

Tamagui telah dikonfigurasi dengan size scale berikut:

```tsx
<Text fontSize="$1">Size 12px</Text>  // 12px
<Text fontSize="$2">Size 14px</Text>  // 14px
<Text fontSize="$3">Size 16px</Text>  // 16px
<Text fontSize="$4">Size 18px</Text>  // 18px
<Text fontSize="$5">Size 20px</Text>  // 20px
<Text fontSize="$6">Size 24px</Text>  // 24px
<Text fontSize="$7">Size 28px</Text>  // 28px
<Text fontSize="$8">Size 32px</Text>  // 32px
<Text fontSize="$9">Size 40px</Text>  // 40px
<Text fontSize="$10">Size 48px</Text> // 48px
```

## Line Heights

Line heights sudah dikonfigurasi proporsional dengan font size untuk readability optimal.

## File yang Dimodifikasi

1. **package.json** - Dependencies ditambahkan
2. **src/app/_layout.tsx** - Font loading setup
3. **src/tamagui.config.ts** - Font configuration
4. **src/constants/fonts.ts** - Font helper constants (NEW)
5. **src/constants/index.ts** - Export fonts

## Testing

Untuk memastikan font terload dengan benar:

1. Start development server:
   ```bash
   npm start
   ```

2. Buka app di simulator/device

3. Cek apakah text menggunakan Plus Jakarta Sans (rounded, modern look)

## Troubleshooting

### Font tidak muncul/fallback ke default

1. Pastikan app sudah di-restart sepenuhnya
2. Clear cache: `npm start -- --clear`
3. Cek console untuk error loading font

### TypeScript errors

Run `npx tsc --noEmit` untuk check type errors dan fix jika ada.

## Resources

- [Plus Jakarta Sans on Google Fonts](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- [Expo Google Fonts Documentation](https://github.com/expo/google-fonts)
- [Tamagui Fonts Documentation](https://tamagui.dev/docs/core/configuration#fonts)
