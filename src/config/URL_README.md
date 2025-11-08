# API Endpoints Configuration

File `url.ts` adalah centralized configuration untuk semua API endpoints di aplikasi ini. Semua URL endpoint didefinisikan di satu tempat untuk memudahkan maintenance dan development.

## Struktur File

Struktur menggunakan pattern:
```typescript
const API = {
  CATEGORY_NAME: {
    actionName: "/api/endpoint/path"
  }
}
```

### 1. API.AUTH
Endpoints untuk autentikasi dan profil user:
```typescript
API.AUTH.login          // POST /api/login
API.AUTH.logout         // POST /api/logout
API.AUTH.getMe          // GET /api/me
API.AUTH.refreshToken   // POST /api/refresh-token
API.AUTH.updateProfile  // POST /api/profile
```

### 2. API.MEMBER
Endpoints untuk manajemen member:
```typescript
API.MEMBER.getDataMember        // GET /api/member
API.MEMBER.getDetailMember(id)  // GET /api/member/:id
API.MEMBER.createMember         // POST /api/member
API.MEMBER.updateMember(id)     // PUT /api/member/:id
API.MEMBER.deleteMember(id)     // DELETE /api/member/:id
```

### 3. API.LOCATION
Endpoints untuk data lokasi:
```typescript
API.LOCATION.getCity        // GET /api/getCity
API.LOCATION.getState       // GET /api/getState
API.LOCATION.getParliament  // GET /api/getParliament
API.LOCATION.getDun         // GET /api/getDun
API.LOCATION.getNation      // GET /api/getNation
API.LOCATION.getReligion    // GET /api/getReligion
```

### 4. API.GENDER
Endpoints untuk data jantina:
```typescript
API.GENDER.getGender  // GET /api/getGender
```

## Helper Function: buildUrl()

Function untuk membangun URL dengan query parameters secara otomatis.

### Penggunaan:

```typescript
import { API, buildUrl } from "../config/url";

// Tanpa query parameters
const url = API.MEMBER.getDataMember;
// Result: "https://dev.ekomuniti.my/api/member"

// Dengan query parameters
const url = buildUrl(API.MEMBER.getDataMember, {
  search: "john",
  status: "active",
  per_page: 10,
  page: 1
});
// Result: "https://dev.ekomuniti.my/api/member?search=john&status=active&per_page=10&page=1"

// Dynamic endpoint dengan parameter
const url = API.MEMBER.getDetailMember(123);
// Result: "https://dev.ekomuniti.my/api/member/123"

// Otomatis skip undefined/null values
const url = buildUrl(API.LOCATION.getState, {
  id_country: 1,
  q: undefined  // Akan di-skip
});
// Result: "https://dev.ekomuniti.my/api/getState?id_country=1"
```

## Cara Menambahkan Endpoint Baru

1. **Buka file `src/config/url.ts`**

2. **Tambahkan kategori baru atau action baru ke kategori yang sudah ada**:

```typescript
export const API = {
  // ... existing categories ...

  // Menambah kategori baru
  PAYMENT: {
    getTransactions: `${API_BASE_URL}/transactions`,
    getDetailTransaction: (id: number) => `${API_BASE_URL}/transactions/${id}`,
    createPayment: `${API_BASE_URL}/payment`,
    updatePaymentStatus: (id: number) => `${API_BASE_URL}/payment/${id}/status`,
  },

  // Atau menambah action baru ke kategori existing
  MEMBER: {
    getDataMember: `${API_BASE_URL}/member`,
    getDetailMember: (id: number) => `${API_BASE_URL}/member/${id}`,
    // ... existing actions ...
    getMemberStats: `${API_BASE_URL}/member/stats`, // Action baru
    exportMembers: `${API_BASE_URL}/member/export`, // Action baru
  },
} as const;
```

3. **Gunakan di service**:
```typescript
import { API } from "../config/url";

// Kategori baru
const response = await fetch(API.PAYMENT.getTransactions);

// Action baru di kategori existing
const stats = await fetch(API.MEMBER.getMemberStats);
```

## Best Practices

1. ✅ **Selalu gunakan API object dari url.ts**, jangan hardcode URL di service
   ```typescript
   // ✅ Good
   fetch(API.AUTH.login)

   // ❌ Bad
   fetch(`${API_BASE_URL}/login`)
   fetch("https://dev.ekomuniti.my/api/login")
   ```

2. ✅ **Gunakan buildUrl() untuk query parameters**
   ```typescript
   // ✅ Good
   const url = buildUrl(API.MEMBER.getDataMember, params);

   // ❌ Bad
   const queryParams = new URLSearchParams();
   if (params?.search) queryParams.append("search", params.search);
   const url = `${API.MEMBER.getDataMember}?${queryParams.toString()}`;
   ```

3. ✅ **Gunakan function untuk dynamic endpoints**
   ```typescript
   // ✅ Good
   getDetailMember: (id: number) => `${API_BASE_URL}/member/${id}`

   // ❌ Bad
   getDetailMember: `${API_BASE_URL}/member/`  // Tidak bisa dynamic
   ```

4. ✅ **Gunakan camelCase untuk nama action**
   ```typescript
   // ✅ Good
   API.MEMBER.getDataMember
   API.MEMBER.updateMember

   // ❌ Bad
   API.MEMBER.get_data_member
   API.MEMBER.UpdateMember
   ```

## Keuntungan Centralized Endpoints

1. **Easy Maintenance** - Ubah endpoint di satu tempat, otomatis update di semua service
2. **Type Safety** - TypeScript akan error jika endpoint tidak ada
3. **Konsistensi** - Semua developer menggunakan endpoint yang sama
4. **Easy Testing** - Mudah mock endpoints untuk testing
5. **Documentation** - Semua endpoints terdokumentasi di satu file

## Environment-based URLs

Base URL otomatis berubah berdasarkan environment di `.env`:

```bash
# Development
EXPO_PUBLIC_ENV=development
# Uses: https://dev.ekomuniti.my/api

# Local
EXPO_PUBLIC_ENV=local
# Uses: http://192.168.1.7:8000/api

# Staging
EXPO_PUBLIC_ENV=staging
# Uses: https://staging.example.com/api

# Production
EXPO_PUBLIC_ENV=production
# Uses: https://api.example.com/api
```

Endpoint definitions akan otomatis menggunakan base URL yang sesuai.
