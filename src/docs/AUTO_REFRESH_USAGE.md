# Auto-Refresh Token Usage Guide

Aplikasi ini mengimplementasikan **automatic token refresh** ketika API mengembalikan 401 (Unauthorized). User tidak perlu manual refresh token dari UI.

## 🔄 Cara Kerja Auto-Refresh

Ketika API call mendapat response **401 (Unauthorized)**:
1. Sistem otomatis call `/api/refresh-token`
2. Simpan token baru ke AsyncStorage
3. Retry API call yang gagal dengan token baru
4. Jika refresh berhasil → request sukses
5. Jika refresh gagal → clear storage & redirect ke login

---

## 📋 Method 1: Menggunakan AuthService.getMe()

**Cara Termudah** - `getMe()` sudah built-in auto-refresh

```typescript
import { AuthService } from "../../services/authService";

// Automatic auto-refresh on 401
try {
  const response = await AuthService.getMe();
  console.log("User:", response.data);
} catch (error) {
  if (error.message.includes("Session expired")) {
    // User akan di-redirect ke login
    router.replace("/login");
  }
}
```

**Flow:**
```
Call getMe()
  ↓
Got 401?
  ↓
  YES → Auto refresh token → Retry getMe() → Success!
  NO  → Return data
```

---

## 📋 Method 2: Menggunakan ApiHelper (Untuk API Lain)

**Untuk custom API endpoints** yang butuh authentication

```typescript
import { ApiHelper } from "../../utils/apiHelper";
import { API_BASE_URL } from "../../config/api";

// Example: GET request
const fetchMembers = async () => {
  try {
    const response = await ApiHelper.get(`${API_BASE_URL}/members`);
    console.log("Members:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Example: POST request
const createMember = async (data: any) => {
  try {
    const response = await ApiHelper.post(`${API_BASE_URL}/members`, data);
    console.log("Created:", response);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Example: PUT request
const updateMember = async (id: number, data: any) => {
  try {
    const response = await ApiHelper.put(`${API_BASE_URL}/members/${id}`, data);
    console.log("Updated:", response);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Example: DELETE request
const deleteMember = async (id: number) => {
  try {
    const response = await ApiHelper.delete(`${API_BASE_URL}/members/${id}`);
    console.log("Deleted:", response);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

**Available Methods:**
- `ApiHelper.get(url)` - GET request
- `ApiHelper.post(url, body)` - POST request
- `ApiHelper.put(url, body)` - PUT request
- `ApiHelper.patch(url, body)` - PATCH request
- `ApiHelper.delete(url)` - DELETE request
- `ApiHelper.fetchWithAuth(url, options)` - Custom fetch with auth

---

## 📋 Method 3: Menggunakan AuthHelper (Advanced)

**Untuk use cases yang lebih complex**

```typescript
import { AuthHelper } from "../../utils/authHelper";

// 1. Check auth on app startup
useEffect(() => {
  const checkAuth = async () => {
    const isAuth = await AuthHelper.checkAuth();
    if (!isAuth) {
      router.replace("/login");
    }
  };
  checkAuth();
}, []);

// 2. Wrap any API call with auto-refresh
const fetchData = async () => {
  try {
    const data = await AuthHelper.withTokenRefresh(async () => {
      // Your API call here
      return await someApiCall();
    });
    console.log("Data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

// 3. Require auth before accessing screen
useEffect(() => {
  AuthHelper.requireAuth(); // Auto redirect to login if not authenticated
}, []);

// 4. Manual refresh if needed
const manualRefresh = async () => {
  const success = await AuthHelper.refreshTokenIfNeeded();
  console.log("Refreshed:", success);
};
```

---

## 🎯 Use Cases

### Use Case 1: Fetch Data on Screen Load

```typescript
import { useEffect, useState } from "react";
import { ApiHelper } from "../../utils/apiHelper";
import { API_BASE_URL } from "../../config/api";

export default function MembersScreen() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setIsLoading(true);
      // Auto-refresh on 401
      const response = await ApiHelper.get(`${API_BASE_URL}/members`);
      setMembers(response.data);
    } catch (error: any) {
      if (error?.message?.includes("Session expired")) {
        router.replace("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of component
}
```

### Use Case 2: Form Submission

```typescript
const handleSubmit = async (formData: any) => {
  try {
    setIsSubmitting(true);

    // Auto-refresh on 401
    const response = await ApiHelper.post(
      `${API_BASE_URL}/members`,
      formData
    );

    Alert.alert("Success", "Member created successfully!");
  } catch (error: any) {
    if (error?.message?.includes("Session expired")) {
      router.replace("/login");
    } else {
      Alert.alert("Error", error.message);
    }
  } finally {
    setIsSubmitting(false);
  }
};
```

### Use Case 3: Protected Screen

```typescript
import { AuthHelper } from "../../utils/authHelper";

export default function ProtectedScreen() {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check and auto-refresh if needed
    const checkAuth = async () => {
      const isAuth = await AuthHelper.checkAuth();
      if (!isAuth) {
        router.replace("/login");
      }
      setIsChecking(false);
    };
    checkAuth();
  }, []);

  if (isChecking) {
    return <LoadingScreen />;
  }

  return <YourProtectedContent />;
}
```

---

## 🔍 Console Logs untuk Debugging

Saat auto-refresh terjadi, Anda akan melihat:

```
LOG  Fetching user profile from: https://xxx.ngrok.io/api/me
LOG  Get me response: {success: false, message: "Unauthenticated"}
LOG  Token expired (401), attempting auto-refresh...
LOG  Refreshing token from: https://xxx.ngrok.io/api/refresh-token
LOG  Refresh token response: {success: true, message: "Token refreshed successfully!", data: {...}}
LOG  New token saved successfully
LOG  Token auto-refreshed successfully, retrying getMe...
LOG  Fetching user profile from: https://xxx.ngrok.io/api/me
LOG  Get me response: {success: true, data: {...}}
LOG  User data loaded successfully
```

---

## ⚠️ Error Handling

### Session Expired (Refresh Failed)

```typescript
try {
  const response = await AuthService.getMe();
} catch (error) {
  if (error.message.includes("Session expired")) {
    // Token refresh failed
    // User storage already cleared
    // Redirect to login
    router.replace("/login");
  }
}
```

### Network Error

```typescript
try {
  const response = await ApiHelper.get(url);
} catch (error) {
  if (error.message.includes("Network error")) {
    // Network issue, not auth issue
    Alert.alert("Error", "Please check your internet connection");
  }
}
```

---

## ✅ Best Practices

1. **Always use try-catch** untuk semua API calls
2. **Check for session expired** dan redirect ke login
3. **Use ApiHelper** untuk custom endpoints
4. **Don't manually call refresh** - let auto-refresh handle it
5. **Show loading states** saat API call
6. **Handle errors gracefully** dengan user-friendly messages

---

## 🚫 Don't Do This

```typescript
// ❌ Don't manually refresh before API call
await AuthService.refreshToken();
const response = await AuthService.getMe();

// ✅ Just call the API - auto-refresh will handle it
const response = await AuthService.getMe();
```

```typescript
// ❌ Don't use fetch directly for authenticated endpoints
const response = await fetch(`${API_BASE_URL}/members`, {
  headers: { Authorization: `Bearer ${token}` }
});

// ✅ Use ApiHelper for auto-refresh
const response = await ApiHelper.get(`${API_BASE_URL}/members`);
```

---

## 📚 Summary

| Feature | Status |
|---------|--------|
| Auto-refresh on 401 | ✅ |
| Retry failed request | ✅ |
| Save new token | ✅ |
| Clear storage on failure | ✅ |
| Redirect to login | ✅ |
| Console logging | ✅ |
| Manual refresh (optional) | ✅ |

**Automatic token refresh sudah active!** Anda tidak perlu manual trigger refresh dari UI. Sistem akan otomatis handle expired token.
