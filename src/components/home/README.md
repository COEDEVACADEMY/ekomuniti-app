# Home Screen Components

Komponen-komponen reusable untuk Home Screen eKomuniti App.

## Komponen yang Tersedia

### 1. StatCard
Komponen untuk menampilkan statistik/metrik komuniti.

**Props:**
- `icon`: LucideIcon - Icon untuk statistik
- `iconColor`: string - Warna icon
- `label`: string - Label statistik
- `value`: string - Nilai statistik
- `trend?`: string - Teks trend (optional)
- `trendColor?`: string - Warna trend (optional)
- `TrendIcon?`: LucideIcon - Icon trend (optional)

**Contoh Penggunaan:**
```tsx
<StatCard
  icon={Users}
  iconColor="#4A90E2"
  label="Total Members"
  value="1,234"
  trend="+12 this month"
  trendColor="#34C759"
  TrendIcon={TrendingUp}
/>
```

---

### 2. QuickActionCard
Komponen untuk quick action buttons dengan icon.

**Props:**
- `icon`: LucideIcon - Icon untuk action
- `iconColor`: string - Warna icon
- `label`: string - Label action
- `onPress`: () => void - Handler ketika di-press

**Contoh Penggunaan:**
```tsx
<QuickActionCard
  icon={Users}
  iconColor="#4A90E2"
  label="Members"
  onPress={() => router.push("/(tabs)/members")}
/>
```

---

### 3. AnnouncementItem
Komponen untuk menampilkan item announcement.

**Props:**
- `icon`: LucideIcon - Icon announcement
- `iconColor`: string - Warna background icon
- `title`: string - Judul announcement
- `description`: string - Deskripsi announcement
- `time`: string - Waktu posting
- `onPress?`: () => void - Handler ketika di-press (optional)

**Contoh Penggunaan:**
```tsx
<AnnouncementItem
  icon={Bell}
  iconColor="#4A90E2"
  title="Annual General Meeting 2024"
  description="Join us for our AGM on March 15th..."
  time="2 hours ago"
  onPress={() => console.log("View announcement")}
/>
```

---

### 4. EventCard
Komponen untuk menampilkan event card dengan date badge.

**Props:**
- `date`: string - Tanggal event (contoh: "15")
- `month`: string - Bulan event (contoh: "MAR")
- `title`: string - Judul event
- `time`: string - Waktu event
- `location`: string - Lokasi event
- `color`: string - Warna date badge
- `onPress?`: () => void - Handler ketika di-press (optional)

**Contoh Penggunaan:**
```tsx
<EventCard
  date="15"
  month="MAR"
  title="Community Sports Day"
  time="Saturday, 9:00 AM - 5:00 PM"
  location="Community Sports Complex"
  color="#FF9500"
  onPress={() => console.log("View event")}
/>
```

---

## Struktur Home Screen

Home Screen terdiri dari 4 section utama:

1. **Community Overview** - Menampilkan statistik komuniti (members, events)
2. **Quick Actions** - 4 tombol akses cepat untuk:
   - Members (Pengurusan ahli)
   - Payments (Bayaran)
   - Announce (Pengumuman)
   - Activities (Aktiviti)
3. **Recent Announcements** - Daftar pengumuman terbaru
4. **Upcoming Events** - Daftar event yang akan datang

## Color Palette

Warna yang digunakan sesuai dengan eKomuniti branding:

- **Blue (#4A90E2)**: Primary action - Members
- **Green (#34C759)**: Success/Money - Payments
- **Orange (#FF9500)**: Warning/Events - Announce
- **Purple (#AF52DE)**: Info - Activities
- **Gray (#666)**: Secondary text
- **Light Gray (#999)**: Tertiary text

## Customization

Semua komponen dapat di-customize dengan mudah:

1. Ganti warna dengan mengganti prop `color` atau `iconColor`
2. Ganti icon dengan menggunakan icon lain dari `@tamagui/lucide-icons`
3. Tambah atau kurang komponen sesuai kebutuhan

## Tips

- Gunakan `router.push()` untuk navigasi ke halaman lain
- Semua komponen sudah responsive dan menggunakan flex layout
- Card elevation sudah di-set untuk memberikan shadow effect
- Press animation sudah tersedia di QuickActionCard dan EventCard
