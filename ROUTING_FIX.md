# Routing Fix - Redirect to Login Screen

## Masalah
App masih mengarah ke home screen (tabs) padahal harusnya ke login screen.

## Penyebab
`_layout.tsx` tidak mendefinisikan auth screens (login, register, welcome), sehingga expo-router tidak recognize routes tersebut.

## Solusi

### 1. Update _layout.tsx ✅
File sudah diupdate untuk include semua screens:
- index
- welcome
- login
- register
- (tabs)

### 2. Clear Cache & Restart

Jalankan command berikut untuk clear cache:

```bash
# Stop the running metro bundler first (Ctrl+C)

# Clear expo cache
npx expo start -c

# Or clear all caches
npm start -- --clear
```

### 3. Alternative: Reset Metro Cache

Jika masih tidak berhasil:

```bash
# Clear watchman
watchman watch-del-all

# Clear metro cache
rm -rf node_modules/.cache

# Clear expo cache
rm -rf .expo

# Restart
npx expo start -c
```

## Routing Flow yang Benar

```
src/app/
├── index.tsx          → Redirect to /login
├── login.tsx          → Login screen
├── register.tsx       → Register screen
├── welcome.tsx        → Welcome screen
└── (tabs)/
    └── index.tsx      → Home screen (after login)
```

**Expected behavior:**
1. App starts
2. Load `index.tsx`
3. Check authentication (currently false)
4. Redirect to `/login`
5. User sees login screen

## Verification

Setelah restart, check console log untuk memastikan routing:
- Should see: "Redirecting to /login"
- Should NOT immediately load tabs

## Jika Masih Bermasalah

1. **Check file location:**
   - Pastikan `login.tsx`, `register.tsx`, `welcome.tsx` ada di `src/app/` (bukan di subfolder)

2. **Check import paths:**
   - Pastikan tidak ada circular imports

3. **Check navigation:**
   - Pastikan `router.replace("/(tabs)")` tidak dipanggil di tempat lain

4. **Force reload:**
   - Press `r` di metro bundler untuk reload
   - Atau press `Shift+R` untuk full reload

## Testing Steps

1. Stop app completely
2. Run: `npx expo start -c`
3. Press `i` for iOS atau `a` for Android
4. App should load login screen
5. Input dummy credentials:
   - Email: user@example.com
   - Password: 123
6. Should redirect to home screen after successful login

## Debug Mode

Tambahkan console.log untuk debug di `index.tsx`:

```tsx
export default function Index() {
  console.log("=== Index.tsx loaded ===");

  const isAuthenticated = false;
  console.log("Is authenticated:", isAuthenticated);

  if (isAuthenticated) {
    console.log("Redirecting to /(tabs)");
    return <Redirect href="/(tabs)" />;
  }

  console.log("Redirecting to /login");
  return <Redirect href="/login" />;
}
```

Check metro bundler console untuk lihat log ini.
