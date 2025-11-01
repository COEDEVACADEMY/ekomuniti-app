# Members Screen Components

Komponen-komponen untuk Members Screen eKomuniti App.

## Komponen yang Tersedia

### 1. MemberCard
Komponen card untuk menampilkan informasi member.

**Props:**
- `name`: string - Nama member
- `email`: string - Email member
- `phone`: string - Nomor telefon
- `role`: string - Peranan dalam komuniti
- `status`: "Active" | "Inactive" - Status member
- `avatarUrl?`: string - URL avatar (optional)
- `onPress?`: () => void - Handler ketika card di-press (optional)

**Features:**
- Avatar dengan fallback jika tidak ada gambar
- Status badge (hijau untuk Active, merah untuk Inactive)
- Tampilan email dan phone dengan icon
- Press animation

**Contoh Penggunaan:**
```tsx
<MemberCard
  name="Ahmad bin Abdullah"
  email="ahmad@email.com"
  phone="+60 12-345 6789"
  role="Committee Member"
  status="Active"
  avatarUrl="https://example.com/avatar.jpg"
  onPress={() => console.log("View member details")}
/>
```

---

### 2. SearchBar
Komponen search bar untuk mencari members.

**Props:**
- `value`: string - Nilai search query
- `onChangeText`: (text: string) => void - Handler ketika text berubah
- `placeholder?`: string - Placeholder text (optional, default: "Search members...")

**Features:**
- Icon search di sebelah kiri
- Clean design dengan subtle shadow
- Auto-focus capability

**Contoh Penggunaan:**
```tsx
const [searchQuery, setSearchQuery] = useState("");

<SearchBar
  value={searchQuery}
  onChangeText={setSearchQuery}
  placeholder="Search by name, email, or phone..."
/>
```

---

### 3. FilterTabs
Komponen filter tabs untuk memfilter members berdasarkan status.

**Props:**
- `activeFilter`: "All" | "Active" | "Inactive" - Filter yang aktif saat ini
- `onFilterChange`: (filter: FilterType) => void - Handler ketika filter berubah

**Features:**
- 3 filter options: All, Active, Inactive
- Active state dengan background biru
- Press animation
- Shadow effect pada active tab

**Contoh Penggunaan:**
```tsx
const [activeFilter, setActiveFilter] = useState<"All" | "Active" | "Inactive">("All");

<FilterTabs
  activeFilter={activeFilter}
  onFilterChange={setActiveFilter}
/>
```

---

## Members Screen Structure

Members Screen terdiri dari beberapa section:

### 1. Header
- Back button untuk kembali
- Title "Members"
- Notification icon

### 2. Stats Cards
Menampilkan 3 statistik:
- **Total Members** (Blue) - Jumlah total ahli
- **Active Members** (Green) - Jumlah ahli aktif
- **Inactive Members** (Red) - Jumlah ahli tidak aktif

### 3. Add Member Button
- Button untuk menambah member baru
- Icon UserPlus
- Blue background dengan shadow

### 4. Search & Filter
- Search bar untuk mencari member
- Filter tabs untuk memfilter berdasarkan status
- Real-time filtering

### 5. Members List
- List semua members yang sudah di-filter
- Tampilan jumlah members yang ditemukan
- Empty state jika tidak ada member

---

## Filtering Logic

Members di-filter berdasarkan:

1. **Search Query** - Mencari di:
   - Nama (case-insensitive)
   - Email (case-insensitive)
   - Phone number

2. **Status Filter**:
   - All: Tampilkan semua
   - Active: Hanya members aktif
   - Inactive: Hanya members tidak aktif

---

## Mock Data

Screen menggunakan mock data untuk development. Ganti dengan data dari API:

```tsx
const MOCK_MEMBERS = [
  {
    id: "1",
    name: "Ahmad bin Abdullah",
    email: "ahmad@email.com",
    phone: "+60 12-345 6789",
    role: "Committee Member",
    status: "Active" as const,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/png?seed=Ahmad",
  },
  // ... more members
];
```

---

## Color Palette

- **Primary Blue (#4A90E2)**: Headers, buttons, active states
- **Success Green (#34C759)**: Active status
- **Error Red (#FF3B30)**: Inactive status
- **Text Primary (#333)**: Main text
- **Text Secondary (#666)**: Labels, secondary info
- **Text Tertiary (#999)**: Placeholder, timestamps

---

## Next Steps

Untuk production:

1. Replace mock data dengan API calls
2. Add member detail screen
3. Implement "Add Member" form
4. Add edit/delete functionality
5. Implement pagination untuk large datasets
6. Add role-based permissions
7. Export member list functionality
