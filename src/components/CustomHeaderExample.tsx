/**
 * Contoh penggunaan CustomHeader
 * File ini adalah contoh, bisa dihapus setelah memahami penggunaannya
 */

import CustomHeader from "./CustomHeader";
import { router } from "expo-router";

// =====================================
// Contoh 1: Header dengan Avatar (untuk Home Screen)
// =====================================
export const HeaderWithAvatar = () => {
  return (
    <CustomHeader
      variant="withAvatar"
      subtitle="Welcome Back"
      userName="Wade Warren"
      avatarUrl="https://api.dicebear.com/7.x/avataaars/png?seed=Wade"
      onNotificationPress={() => {
        router.push("/notifications");
      }}
    />
  );
};

// =====================================
// Contoh 2: Header dengan Back Button dan Title (untuk Detail Screen)
// =====================================
export const HeaderWithBackButton = () => {
  return (
    <CustomHeader
      title="Community"
      showBackButton={true}
      onBackPress={() => router.back()}
      onNotificationPress={() => router.push("/notifications")}
    />
  );
};

// =====================================
// Contoh 3: Header Simple tanpa Back Button
// =====================================
export const SimpleHeader = () => {
  return (
    <CustomHeader
      title="Settings"
      showBackButton={false}
      showNotification={true}
    />
  );
};

// =====================================
// Contoh 4: Header tanpa Notification
// =====================================
export const HeaderWithoutNotification = () => {
  return (
    <CustomHeader
      title="About"
      showBackButton={true}
      showNotification={false}
    />
  );
};

// =====================================
// Contoh 5: Custom Handler untuk Avatar Header
// =====================================
export const CustomHandlerHeader = () => {
  const handleNotification = () => {
    console.log("Custom notification handler");
    // Custom logic di sini
  };

  return (
    <CustomHeader
      variant="withAvatar"
      subtitle="Selamat Datang"
      userName="Fikri Nurhakim"
      onNotificationPress={handleNotification}
    />
  );
};
