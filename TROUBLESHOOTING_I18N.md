# 🔧 Troubleshooting Multi-Language

## ⚠️ Masalah: Bahasa tidak berubah / Masih campur English-Malaysia

### Solusi 1: Restart Development Server ✅

**PENTING: Setelah setup i18n pertama kali atau update konfigurasi, HARUS restart!**

```bash
# Stop server (Ctrl+C)
# Lalu restart
npm start
# atau
npx expo start -c  # dengan clear cache
```

### Solusi 2: Clear Cache & Restart

Jika masih tidak berubah setelah restart biasa:

```bash
# 1. Stop development server
# 2. Clear cache
npx expo start -c

# Atau kalau pakai npm
rm -rf node_modules/.cache
npm start
```

### Solusi 3: Clear AsyncStorage

Hapus data bahasa yang tersimpan dan reload:

```tsx
// Tambahkan di component atau console
import AsyncStorage from "@react-native-async-storage/async-storage";

// Run once
AsyncStorage.removeItem("@app_language").then(() => {
  console.log("Language storage cleared");
});
```

### Solusi 4: Force Reload App

Di development:
- **iOS Simulator**: Cmd + R
- **Android Emulator**: R R (tekan R dua kali)
- **Physical Device**: Shake device → Reload

## 🐛 Debug Steps

### 1. Check Console Logs

Buka console dan cari log ini:

```
✅ Loaded saved language: ms
✅ i18n initialized with language: ms
```

Jika tidak muncul, ada masalah di initialization.

### 2. Test dengan Component

Tambahkan `LanguageTest` component ke screen:

```tsx
import { LanguageTest } from "../components/LanguageTest";

function MyScreen() {
  return (
    <View>
      <LanguageTest /> {/* Untuk debugging */}
      {/* Rest of your screen */}
    </View>
  );
}
```

### 3. Check Provider Wrapping

Pastikan `LanguageProvider` wrap semua component:

```tsx
// src/app/_layout.tsx
import { LanguageProvider } from '../contexts/LanguageContext';
import '../config/i18n'; // PENTING!

export default function RootLayout() {
  return (
    <LanguageProvider>  {/* <-- Harus ada ini */}
      <TamaguiProvider>
        {/* Rest of app */}
      </TamaguiProvider>
    </LanguageProvider>
  );
}
```

### 4. Verify Translations Usage

Pastikan component menggunakan `t()`:

```tsx
// ❌ SALAH - Tidak pakai translation
<Text>Welcome</Text>

// ✅ BENAR - Pakai translation
import { useLanguage } from "../contexts/LanguageContext";

function MyScreen() {
  const { t } = useLanguage();
  return <Text>{t("common.welcome")}</Text>;
}
```

## 📋 Checklist Debugging

- [ ] Sudah restart development server?
- [ ] `import '../config/i18n'` ada di root layout?
- [ ] `<LanguageProvider>` wrap aplikasi?
- [ ] Component menggunakan `t()` bukan hardcoded text?
- [ ] Console log menunjukkan bahasa yang dipilih?
- [ ] Dependencies sudah terinstall semua?

## 🔍 Verifikasi Dependencies

```bash
npm list i18next react-i18next expo-localization @react-native-async-storage/async-storage
```

Harus semua terinstall. Jika ada yang missing:

```bash
npm install i18next react-i18next
npx expo install expo-localization
npx expo install @react-native-async-storage/async-storage
```

## 🎯 Test Manual

1. **Buka app**
2. **Pilih bahasa** via LanguageSelector
3. **Check console** - harus ada log: "Language saved: ms"
4. **Reload app** (R R atau Cmd+R)
5. **Check console** - harus ada log: "Loaded saved language: ms"
6. **Text harus berubah** sesuai bahasa yang dipilih

## 💡 Tips Debugging

### Enable debug mode di i18n

Tambahkan di `src/config/i18n.ts`:

```typescript
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  debug: true, // <-- Tambahkan ini
  // ...
});
```

Console akan show lebih banyak info.

### Check Current Language

```tsx
import i18n from "../config/i18n";

console.log("Current language:", i18n.language);
console.log("Available languages:", Object.keys(i18n.services.resourceStore.data));
```

### Force Change Language

Untuk testing langsung:

```tsx
import { useLanguage } from "../contexts/LanguageContext";

function TestButton() {
  const { changeLanguage } = useLanguage();

  return (
    <View>
      <Button title="EN" onPress={() => changeLanguage("en")} />
      <Button title="MS" onPress={() => changeLanguage("ms")} />
      <Button title="ZH" onPress={() => changeLanguage("zh")} />
    </View>
  );
}
```

## 🚨 Common Errors

### Error: "Cannot find module '../config/i18n'"

**Fix**: Pastikan path benar. Jika `_layout.tsx` di `src/app/`, path harus `../config/i18n`

### Error: "useLanguage must be used within LanguageProvider"

**Fix**: Pastikan component ada di dalam `<LanguageProvider>`

### Bahasa berubah tapi tidak persist

**Fix**: Check AsyncStorage permission atau install ulang `@react-native-async-storage/async-storage`

### Text masih hardcoded

**Fix**: Ganti semua hardcoded text dengan `t("key")`

```tsx
// Before
<Text>Login</Text>

// After
<Text>{t("common.login")}</Text>
```

## 📞 Still Not Working?

1. Check semua file di `src/locales/` ada dan formatnya benar
2. Check `src/contexts/LanguageContext.tsx` tidak ada error
3. Pastikan tidak ada typo di translation keys
4. Coba rebuild app dari scratch:

```bash
# Full reset
rm -rf node_modules
npm install
npx expo start -c
```

## 🎬 Video Tutorial Troubleshooting

1. Stop server
2. Run: `npx expo start -c`
3. Wait for bundler to load
4. Open app
5. Open LanguageSelector
6. Select language
7. Check console logs
8. Reload app (R R)
9. Verify language persisted

Jika masih tidak work setelah semua step ini, kemungkinan ada conflict dengan library lain atau perlu custom configuration tambahan.
