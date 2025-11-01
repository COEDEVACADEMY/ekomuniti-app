# Dummy Authentication Setup

Dokumentasi untuk dummy authentication system di eKomuniti App.

## Default Route

App sekarang secara default akan mengarah ke **Login Screen** (`/login`).

**File:** `src/app/index.tsx`

```tsx
// Default route to login screen
return <Redirect href="/login" />;
```

---

## Dummy Credentials

Untuk testing, gunakan credentials berikut:

```
Email: user@example.com
Password: 123
```

**Defined in:** `src/app/login.tsx` (lines 8-9)

```tsx
const DUMMY_EMAIL = "user@example.com";
const DUMMY_PASSWORD = "123";
```

---

## Login Flow

### 1. Validation

Login screen memvalidasi:
- ✅ Empty fields check
- ✅ Email format validation (regex)
- ✅ Credentials matching

### 2. States

Login screen menggunakan states:
- `email`: Input email
- `password`: Input password
- `showPassword`: Toggle visibility password
- `error`: Error message string
- `isLoading`: Loading state untuk button

### 3. Error Handling

**Jenis Error:**

1. **Empty Fields**
   ```
   "Please enter email and password"
   ```

2. **Invalid Email Format**
   ```
   "Please enter a valid email address"
   ```

3. **Invalid Credentials**
   ```
   "Invalid email or password"
   ```
   + Alert popup dengan dummy credentials info

### 4. UI Feedback

**Error Display:**
- Error message ditampilkan di card merah di atas button
- Background: `#FF3B3015` (red with opacity)
- Border: `#FF3B30`

**Loading State:**
- Button text berubah: "Sign In" → "Signing In..."
- Button disabled saat loading
- Background button berubah ke gray (#CCC)

**Demo Credentials Card:**
- Info box biru di bawah button
- Menampilkan dummy credentials untuk kemudahan testing

---

## Success Flow

```
1. User masukkan email: user@example.com
2. User masukkan password: 123
3. Klik "Sign In"
4. Loading state (500ms delay)
5. Validasi sukses
6. Redirect ke /(tabs) - Home Screen
```

---

## Error Flow

```
1. User masukkan credentials salah
2. Klik "Sign In"
3. Loading state (500ms delay)
4. Validasi gagal
5. Tampilkan error message
6. Show alert popup dengan hint
7. User tetap di login screen
```

---

## Code Structure

### Login Handler

```tsx
const handleLogin = () => {
  // 1. Clear errors
  setError("");

  // 2. Validate empty fields
  if (!email || !password) {
    setError("Please enter email and password");
    return;
  }

  // 3. Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Please enter a valid email address");
    return;
  }

  // 4. Start loading
  setIsLoading(true);

  // 5. Simulate API delay (500ms)
  setTimeout(() => {
    // 6. Check credentials
    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      // Success
      setIsLoading(false);
      router.replace("/(tabs)");
    } else {
      // Failed
      setIsLoading(false);
      setError("Invalid email or password");
      Alert.alert(...);
    }
  }, 500);
};
```

---

## Features Implemented

✅ Dummy credential validation
✅ Email format validation
✅ Empty field validation
✅ Error message display
✅ Loading state with disabled button
✅ Alert popup for failed login
✅ Demo credentials info card
✅ Simulated API delay (500ms)
✅ Redirect to home on success
✅ No back button (login is entry point)

---

## Future Implementation

Untuk production, ganti dengan real authentication:

### 1. API Integration

```tsx
const handleLogin = async () => {
  try {
    setIsLoading(true);
    const response = await authAPI.login(email, password);

    // Save token
    await AsyncStorage.setItem('authToken', response.token);

    // Save user data
    setUser(response.user);

    // Redirect
    router.replace("/(tabs)");
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};
```

### 2. State Management

Gunakan Context/Redux untuk auth state:

```tsx
// AuthContext.tsx
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ... auth methods

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 3. Persistent Session

```tsx
// Check token on app load
useEffect(() => {
  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      // Validate token
      // Set authenticated state
    }
  };
  checkAuth();
}, []);
```

### 4. Protected Routes

```tsx
// index.tsx
const { isAuthenticated, isLoading } = useAuth();

if (isLoading) {
  return <SplashScreen />;
}

if (isAuthenticated) {
  return <Redirect href="/(tabs)" />;
}

return <Redirect href="/login" />;
```

---

## Testing

### Test Cases

1. **Valid Login**
   - Email: user@example.com
   - Password: 123
   - Expected: Redirect to home

2. **Invalid Email Format**
   - Email: userexample.com (no @)
   - Password: 123
   - Expected: Error "Please enter a valid email address"

3. **Empty Fields**
   - Email: (empty)
   - Password: (empty)
   - Expected: Error "Please enter email and password"

4. **Wrong Credentials**
   - Email: wrong@email.com
   - Password: wrong
   - Expected: Error + Alert with dummy credentials

5. **Wrong Password**
   - Email: user@example.com
   - Password: wrong
   - Expected: Error + Alert

---

## UI Elements

### Demo Info Card

Location: Di bawah Sign In button

```tsx
<Card backgroundColor="#4A90E215" borderRadius={8} padding={12}>
  <Text>Demo Login Credentials</Text>
  <Text>Email: user@example.com</Text>
  <Text>Password: 123</Text>
</Card>
```

Dapat di-hide untuk production dengan conditional rendering.

---

## Navigation After Login

Setelah login sukses:

```tsx
router.replace("/(tabs)");
```

Menggunakan `replace` bukan `push` agar user tidak bisa back ke login screen setelah authenticated.

---

## Summary

- ✅ Default route: `/login`
- ✅ Dummy email: `user@example.com`
- ✅ Dummy password: `123`
- ✅ Full validation & error handling
- ✅ Loading states & UX feedback
- ✅ Ready for production API integration
