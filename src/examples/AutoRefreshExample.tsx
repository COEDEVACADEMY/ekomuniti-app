/**
 * AUTO-REFRESH TOKEN EXAMPLES
 *
 * File ini menunjukkan cara menggunakan auto-refresh token
 * dalam berbagai scenario
 */

import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { AuthService } from "../services/authService";
import { ApiHelper } from "../utils/apiHelper";
import { AuthHelper } from "../utils/authHelper";
import { API_BASE_URL } from "../config/api";

// ============================================
// EXAMPLE 1: Load User Profile (Built-in Auto-Refresh)
// ============================================
export function Example1_LoadUserProfile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setIsLoading(true);

      // AuthService.getMe() has built-in auto-refresh on 401
      const response = await AuthService.getMe();

      if (response.success) {
        setUser(response.data);
        console.log("✅ User loaded:", response.data.fullname);
      }
    } catch (error: any) {
      console.error("❌ Error loading user:", error);

      // Session expired - user will be redirected to login
      if (error?.message?.includes("Session expired")) {
        Alert.alert("Session Expired", "Please login again", [
          { text: "OK", onPress: () => router.replace("/login") }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ... render component
}

// ============================================
// EXAMPLE 2: Fetch Custom API with Auto-Refresh
// ============================================
export function Example2_FetchMembers() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);

      // ApiHelper.get() automatically handles 401 and refreshes token
      const response = await ApiHelper.get(`${API_BASE_URL}/members`);

      setMembers(response.data);
      console.log("✅ Members loaded:", response.data.length);
    } catch (error: any) {
      console.error("❌ Error loading members:", error);

      if (error?.message?.includes("Session expired")) {
        router.replace("/login");
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ... render component
}

// ============================================
// EXAMPLE 3: POST Request with Auto-Refresh
// ============================================
export function Example3_CreateMember() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true);

      // ApiHelper.post() automatically handles 401 and refreshes token
      const response = await ApiHelper.post(
        `${API_BASE_URL}/members`,
        formData
      );

      console.log("✅ Member created:", response.data);
      Alert.alert("Success", "Member created successfully!");
    } catch (error: any) {
      console.error("❌ Error creating member:", error);

      if (error?.message?.includes("Session expired")) {
        router.replace("/login");
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... render component
}

// ============================================
// EXAMPLE 4: Check Auth on App Startup
// ============================================
export function Example4_CheckAuthOnStartup() {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      setIsChecking(true);

      // AuthHelper.checkAuth() will:
      // 1. Check if token exists
      // 2. Verify token by calling /me
      // 3. Auto-refresh if token expired
      // 4. Return true/false
      const isAuthenticated = await AuthHelper.checkAuth();

      if (!isAuthenticated) {
        console.log("❌ Not authenticated, redirecting to login");
        router.replace("/login");
      } else {
        console.log("✅ Authenticated successfully");
      }
    } catch (error) {
      console.error("❌ Auth check error:", error);
      router.replace("/login");
    } finally {
      setIsChecking(false);
    }
  };

  // ... render component
}

// ============================================
// EXAMPLE 5: Wrap Any API Call with Auto-Refresh
// ============================================
export function Example5_CustomApiWithRefresh() {
  const [data, setData] = useState(null);

  const fetchCustomData = async () => {
    try {
      // AuthHelper.withTokenRefresh() wraps any async function
      // and automatically handles 401 errors
      const result = await AuthHelper.withTokenRefresh(async () => {
        // Your custom API call here
        const token = await TokenStorage.getToken();
        const response = await fetch(`${API_BASE_URL}/custom-endpoint`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.json();
      });

      setData(result);
      console.log("✅ Custom data loaded");
    } catch (error: any) {
      console.error("❌ Error:", error);

      if (error?.message?.includes("Session expired")) {
        router.replace("/login");
      }
    }
  };

  // ... render component
}

// ============================================
// EXAMPLE 6: Multiple Requests (Parallel)
// ============================================
export function Example6_MultipleRequests() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setIsLoading(true);

      // All requests will auto-refresh if any gets 401
      const [userResponse, membersResponse, eventsResponse] = await Promise.all([
        AuthService.getMe(),
        ApiHelper.get(`${API_BASE_URL}/members`),
        ApiHelper.get(`${API_BASE_URL}/events`),
      ]);

      console.log("✅ All data loaded successfully");
    } catch (error: any) {
      console.error("❌ Error loading data:", error);

      if (error?.message?.includes("Session expired")) {
        router.replace("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ... render component
}

// ============================================
// EXAMPLE 7: Update Request with Auto-Refresh
// ============================================
export function Example7_UpdateMember() {
  const handleUpdate = async (memberId: number, updateData: any) => {
    try {
      // ApiHelper.put() automatically handles 401
      const response = await ApiHelper.put(
        `${API_BASE_URL}/members/${memberId}`,
        updateData
      );

      console.log("✅ Member updated:", response.data);
      Alert.alert("Success", "Member updated successfully!");
    } catch (error: any) {
      console.error("❌ Error updating member:", error);

      if (error?.message?.includes("Session expired")) {
        router.replace("/login");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  // ... render component
}

// ============================================
// EXAMPLE 8: Delete Request with Auto-Refresh
// ============================================
export function Example8_DeleteMember() {
  const handleDelete = async (memberId: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this member?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // ApiHelper.delete() automatically handles 401
              await ApiHelper.delete(`${API_BASE_URL}/members/${memberId}`);

              console.log("✅ Member deleted");
              Alert.alert("Success", "Member deleted successfully!");
            } catch (error: any) {
              console.error("❌ Error deleting member:", error);

              if (error?.message?.includes("Session expired")) {
                router.replace("/login");
              } else {
                Alert.alert("Error", error.message);
              }
            }
          },
        },
      ]
    );
  };

  // ... render component
}

// ============================================
// CONSOLE LOGS EXAMPLE
// ============================================
/*

When auto-refresh happens, you'll see:

✅ SUCCESSFUL AUTO-REFRESH:
  LOG  Fetching user profile from: https://xxx.ngrok.io/api/me
  LOG  Get me response: {success: false, message: "Unauthenticated"}
  LOG  Token expired (401), attempting auto-refresh...
  LOG  Refreshing token from: https://xxx.ngrok.io/api/refresh-token
  LOG  Refresh token response: {success: true, message: "Token refreshed successfully!", data: {...}}
  LOG  New token saved successfully
  LOG  Token auto-refreshed successfully, retrying getMe...
  LOG  Fetching user profile from: https://xxx.ngrok.io/api/me
  LOG  Get me response: {success: true, data: {...}}
  ✅ User loaded: DEWAN BANDARAYA KOTA KINABALU

❌ FAILED AUTO-REFRESH (Session Expired):
  LOG  Fetching user profile from: https://xxx.ngrok.io/api/me
  LOG  Get me response: {success: false, message: "Unauthenticated"}
  LOG  Token expired (401), attempting auto-refresh...
  LOG  Refreshing token from: https://xxx.ngrok.io/api/refresh-token
  ERROR Refresh token error: {message: "Failed to refresh token"}
  LOG  Auto-refresh failed, clearing storage
  ERROR Get me error: {message: "Session expired. Please login again."}
  ❌ Not authenticated, redirecting to login

*/
