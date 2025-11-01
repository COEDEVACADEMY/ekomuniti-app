# Authentication Screens

Dokumentasi untuk screen-screen autentikasi eKomuniti App.

## Screens yang Tersedia

### 1. Welcome Screen (`/welcome`)
Screen pertama yang dilihat user saat membuka aplikasi.

**Features:**
- Ilustrasi community dari `assets/illustration/ilCommunity.png`
- Title: "Social Trading Community"
- Subtitle deskripsi
- Button "Get Started" (warna lime/yellow #D4FF00)
- Link ke Sign Up

**Navigation:**
- "Get Started" → `/login`
- "Don't have an account? Sign Up" → `/register`

**File:** `src/app/welcome.tsx`

---

### 2. Login Screen (`/login`)
Screen untuk user yang sudah punya akun.

**Form Fields:**
- Email (dengan icon Mail)
- Password (dengan show/hide toggle)
- "Forgot Password?" link

**Features:**
- Back button
- Email & password validation
- Show/hide password toggle
- Social login (Google, Facebook)
- Link ke Register

**Navigation:**
- Back button → `/welcome`
- "Sign In" button → `/(tabs)` (setelah login sukses)
- "Sign Up" link → `/register`

**File:** `src/app/login.tsx`

---

### 3. Register Screen (`/register`)
Screen untuk user baru membuat akun.

**Form Fields:**
- Full Name (dengan icon User)
- Email (dengan icon Mail)
- Phone Number (dengan icon Phone)
- Password (dengan show/hide toggle)
- Confirm Password (dengan show/hide toggle)

**Features:**
- Back button
- Form validation
- Show/hide password toggle untuk 2 fields
- Terms & Conditions agreement text
- Social sign up (Google, Facebook)
- Link ke Login
- Scrollable form

**Navigation:**
- Back button → `/welcome` atau `/login`
- "Create Account" button → `/(tabs)` (setelah register sukses)
- "Sign In" link → `/login`

**File:** `src/app/register.tsx`

---

## Routing Logic

### Initial Route (`src/app/index.tsx`)

```tsx
const isAuthenticated = false; // Check from auth state

if (isAuthenticated) {
  return <Redirect href="/(tabs)" />;
}

return <Redirect href="/welcome" />;
```

**Flow:**
1. App opens → Check authentication
2. If authenticated → Go to Home (tabs)
3. If not authenticated → Go to Welcome screen

---

## Design System

### Colors

**Primary:**
- Lime/Yellow Button: `#D4FF00`
- Blue Primary: `#4A90E2`
- Dark Blue Text: `#1A2B4A`

**Text:**
- Primary: `#333`
- Secondary: `#666`
- Tertiary/Placeholder: `#999`

**Status:**
- Success: `#34C759`
- Error: `#FF3B30`

**Background:**
- Main BG: `#F5F5F5`
- Card BG: `white`

### Typography

**Headers:**
- H2: 32px, Bold (700)

**Body:**
- Regular: 14-16px
- Small: 13px

### Input Fields

All input fields menggunakan Card wrapper dengan:
- White background
- Border radius: 12px
- Padding: 16px
- Subtle shadow (opacity 0.05)
- Icon di sebelah kiri
- Placeholder dengan warna #999

### Buttons

**Primary Button:**
- Background: #4A90E2
- Color: white
- Border radius: 12px
- Font weight: 700
- Shadow dengan opacity 0.3

**Special Button (Get Started):**
- Background: #D4FF00
- Color: #1A2B4A
- Border radius: 30px (full rounded)
- Font weight: 700

---

## KeyboardAvoidingView

Login dan Register screens menggunakan `KeyboardAvoidingView` untuk:
- iOS: `behavior="padding"`
- Android: `behavior="height"`

Register screen juga wrapped dalam `ScrollView` karena form yang panjang.

---

## TODO: Implementation

### Next Steps untuk Production:

1. **Authentication Logic**
   - Implement actual auth state management (Context/Redux)
   - Add API integration untuk login/register
   - Handle error states & validation
   - Add loading states

2. **Form Validation**
   - Email format validation
   - Password strength checker
   - Phone number format validation
   - Match password confirmation
   - Display error messages

3. **Social Login Integration**
   - Implement Google OAuth
   - Implement Facebook OAuth
   - Handle social login callbacks

4. **Additional Features**
   - "Remember me" checkbox
   - Forgot password flow
   - Email verification
   - Biometric authentication (fingerprint/face)

5. **UX Improvements**
   - Add loading spinners
   - Toast/snackbar notifications
   - Smooth transitions
   - Error handling

---

## File Structure

```
src/app/
├── index.tsx          # Initial routing logic
├── welcome.tsx        # Welcome/Onboarding screen
├── login.tsx          # Login screen
├── register.tsx       # Register screen
└── (tabs)/           # Main app screens (after auth)
```

---

## Testing

Untuk testing flow:

1. Start dari Welcome screen
2. Klik "Get Started" → Login screen
3. Klik "Sign Up" → Register screen
4. Fill form → Redirect to Home
5. Or klik "Sign In" dari Register → kembali ke Login

Sementara `isAuthenticated = false` di `index.tsx` sehingga selalu redirect ke Welcome.
