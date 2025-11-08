# 🌐 Multi-Language Implementation Guide

Aplikasi ekomuniti sudah mendukung 3 bahasa:
- 🇬🇧 **English**
- 🇲🇾 **Bahasa Melayu**
- 🇨🇳 **中文 (Mandarin)**

## 📋 Langkah Setup

### 1. Install Dependencies (Sudah Selesai ✅)

```bash
npm install i18next react-i18next
```

### 2. Setup Provider di Root App

Buka file root aplikasi Anda (kemungkinan `app/_layout.tsx` atau `App.tsx`), lalu wrap dengan `LanguageProvider`:

```tsx
import { LanguageProvider } from "../src/contexts/LanguageContext";
import "../src/config/i18n"; // PENTING: Import i18n config

export default function RootLayout() {
  return (
    <LanguageProvider>
      {/* Your existing layout/components */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </LanguageProvider>
  );
}
```

### 3. Cara Menggunakan di Component

#### Contoh 1: Login Screen

```tsx
import { useLanguage } from "../contexts/LanguageContext";

export default function LoginScreen() {
  const { t } = useLanguage();

  return (
    <View>
      <Text>{t("auth.loginTitle")}</Text>
      <TextInput placeholder={t("auth.emailPlaceholder")} />
      <TextInput placeholder={t("auth.passwordPlaceholder")} />
      <Button title={t("auth.loginButton")} />
    </View>
  );
}
```

#### Contoh 2: Member List Screen

```tsx
import { useLanguage } from "../contexts/LanguageContext";

export default function MembersScreen() {
  const { t } = useLanguage();

  return (
    <View>
      <Text>{t("member.title")}</Text>
      <Button title={t("member.addMember")} />
      <TextInput placeholder={t("member.searchMembers")} />
    </View>
  );
}
```

#### Contoh 3: Profile/Settings Screen dengan Language Selector

```tsx
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSelector } from "../components/LanguageSelector";

export default function ProfileScreen() {
  const { t } = useLanguage();

  return (
    <View>
      <Text>{t("profile.title")}</Text>

      <View style={{ marginTop: 20 }}>
        <Text>{t("common.settings")}</Text>
        <LanguageSelector />
      </View>
    </View>
  );
}
```

## 🎨 Contoh Penggunaan Lengkap

### Error Handling

```tsx
import { useLanguage } from "../contexts/LanguageContext";

function handleError(error: any) {
  const { t } = useLanguage();

  if (error.status === 401) {
    Alert.alert(t("errors.error"), t("errors.unauthorized"));
  } else if (error.status === 500) {
    Alert.alert(t("errors.error"), t("errors.serverError"));
  } else {
    Alert.alert(t("errors.error"), t("errors.unknownError"));
  }
}
```

### Form Validation

```tsx
import { useLanguage } from "../contexts/LanguageContext";

function validateForm(data: any) {
  const { t } = useLanguage();
  const errors: any = {};

  if (!data.email) {
    errors.email = t("validation.required");
  } else if (!isValidEmail(data.email)) {
    errors.email = t("validation.invalidEmail");
  }

  if (!data.password) {
    errors.password = t("validation.required");
  } else if (data.password.length < 8) {
    errors.password = t("validation.minLength", { count: 8 });
  }

  return errors;
}
```

### Success Messages

```tsx
import { useLanguage } from "../contexts/LanguageContext";
import { Alert } from "react-native";

function createMember() {
  const { t } = useLanguage();

  try {
    await MemberService.createMember(data);
    Alert.alert(t("common.success"), t("member.createSuccess"));
  } catch (error) {
    Alert.alert(t("common.error"), t("member.createError"));
  }
}
```

## 📱 Available Translation Keys

### Common
- `common.welcome`
- `common.login` / `common.logout`
- `common.save` / `common.cancel` / `common.delete`
- `common.loading` / `common.error` / `common.success`

### Auth
- `auth.loginTitle` / `auth.loginButton`
- `auth.emailPlaceholder` / `auth.passwordPlaceholder`
- `auth.loginSuccess` / `auth.loginError`
- `auth.sessionExpired`

### Member
- `member.title` / `member.addMember` / `member.editMember`
- `member.name` / `member.icNumber` / `member.phoneNumber`
- `member.createSuccess` / `member.updateSuccess`

### Profile
- `profile.title` / `profile.editProfile`
- `profile.updateSuccess` / `profile.updateError`

### Errors
- `errors.networkError`
- `errors.serverError`
- `errors.unauthorized`
- `errors.validationError`

### Validation
- `validation.required`
- `validation.invalidEmail`
- `validation.minLength` (dengan interpolation)

## 🔧 Update Error Handler

Update `src/utils/errorHandler.ts` untuk support multi-language:

```typescript
import i18n from "../config/i18n";

export function sanitizeErrorMessage(
  message: string,
  statusCode?: number
): string {
  // Jika sensitive, return translated message
  if (containsSensitiveInfo(message)) {
    if (statusCode === 401) return i18n.t("errors.unauthorized");
    if (statusCode === 500) return i18n.t("errors.serverError");
    return i18n.t("errors.unknownError");
  }

  return message;
}
```

## 🚀 Quick Start Checklist

- [ ] 1. Import i18n config di root app: `import "../src/config/i18n"`
- [ ] 2. Wrap app dengan `<LanguageProvider>`
- [ ] 3. Replace hardcoded text dengan `t("key")`
- [ ] 4. Tambahkan `<LanguageSelector />` di settings/profile
- [ ] 5. Test dengan switch bahasa

## 📝 Tips

1. **Selalu gunakan translation keys**, jangan hardcode text
   ```tsx
   // ✅ Good
   <Text>{t("member.title")}</Text>

   // ❌ Bad
   <Text>Members</Text>
   ```

2. **Gunakan LanguageSelector di profile/settings**
   ```tsx
   import { LanguageSelector } from "../components/LanguageSelector";
   <LanguageSelector />
   ```

3. **Test semua bahasa** untuk memastikan layout tidak break

4. **Untuk text panjang**, gunakan multiple lines di translation file:
   ```typescript
   {
     longText: "This is a very long text " +
               "that spans multiple lines " +
               "for better readability"
   }
   ```

## 🐛 Troubleshooting

**Q: Text tidak berubah saat ganti bahasa?**
A: Pastikan sudah import i18n config dan wrap dengan LanguageProvider

**Q: Muncul "translation.key" bukan teks asli?**
A: Key tidak ditemukan. Check spelling dan pastikan key ada di semua file bahasa

**Q: Bahasa tidak persist setelah restart?**
A: Install `@react-native-async-storage/async-storage` jika belum

## 📞 Support

Jika ada pertanyaan atau masalah:
1. Check documentation di `src/locales/README.md`
2. Lihat contoh implementasi di component yang sudah ada
3. Check console untuk error dari i18next
