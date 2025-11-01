# CustomHeader Component

Komponen header yang dinamis dan dapat disesuaikan untuk berbagai kebutuhan.

## Varian

### 1. Default Header (dengan Title dan Back Button)
```tsx
<CustomHeader
  title="Community"
  showBackButton={true}
  showNotification={true}
/>
```

### 2. Header dengan Avatar
```tsx
<CustomHeader
  variant="withAvatar"
  subtitle="Welcome Back"
  userName="Wade Warren"
  avatarUrl="https://example.com/avatar.jpg"
  showNotification={true}
/>
```

## Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `variant` | `"default" \| "withAvatar"` | `"default"` | Tipe header yang akan ditampilkan |
| `title` | `string` | `"Community"` | Judul header (untuk variant default) |
| `subtitle` | `string` | - | Subtitle/greeting (untuk variant withAvatar) |
| `userName` | `string` | - | Nama user (untuk variant withAvatar) |
| `avatarUrl` | `string` | - | URL avatar user |
| `showBackButton` | `boolean` | `false` | Tampilkan tombol back |
| `showNotification` | `boolean` | `true` | Tampilkan ikon notifikasi |
| `onBackPress` | `() => void` | `router.back()` | Custom handler untuk back button |
| `onNotificationPress` | `() => void` | - | Custom handler untuk notification button |

## Contoh Penggunaan Lengkap

```tsx
import CustomHeader from "@/components/CustomHeader";

// Untuk halaman Home dengan avatar
export default function HomeScreen() {
  return (
    <>
      <CustomHeader
        variant="withAvatar"
        subtitle="Welcome Back"
        userName="Wade Warren"
        avatarUrl="https://api.dicebear.com/7.x/avataaars/png?seed=Wade"
        onNotificationPress={() => router.push("/notifications")}
      />
      {/* Your content */}
    </>
  );
}

// Untuk halaman detail dengan back button
export default function CommunityScreen() {
  return (
    <>
      <CustomHeader
        title="Community"
        showBackButton={true}
        onBackPress={() => router.back()}
      />
      {/* Your content */}
    </>
  );
}

// Header sederhana tanpa back button
export default function SettingsScreen() {
  return (
    <>
      <CustomHeader
        title="Settings"
        showBackButton={false}
      />
      {/* Your content */}
    </>
  );
}
```

## Styling

Header menggunakan background color `#F5F5F5` secara default. Anda bisa memodifikasi styles di `src/components/CustomHeader.tsx:117`.
