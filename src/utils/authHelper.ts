import { AuthService } from "../services/authService";
import { TokenStorage } from "./tokenStorage";
import { router } from "expo-router";

/**
 * Auth Helper Utilities
 * Provides helper functions for authentication flow
 */
export class AuthHelper {
  /**
   * Check if user is authenticated and handle token refresh
   * Call this on app startup or when needed
   */
  static async checkAuth(): Promise<boolean> {
    try {
      const token = await TokenStorage.getToken();

      if (!token) {
        console.log("No token found, user not authenticated");
        return false;
      }

      // Try to get user profile to verify token is valid
      try {
        await AuthService.getMe();
        console.log("Token is valid");
        return true;
      } catch (error) {
        console.log("Token invalid, attempting to refresh...");

        // Token invalid, try to refresh
        try {
          await AuthService.refreshToken();
          console.log("Token refreshed successfully");
          return true;
        } catch (refreshError) {
          console.log("Token refresh failed, logging out");
          await TokenStorage.clearAuth();
          return false;
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      return false;
    }
  }

  /**
   * Handle API request with automatic token refresh on 401
   * Use this wrapper for API calls that need authentication
   *
   * @param apiCall - The API call function to execute
   * @param maxRetries - Maximum retry attempts (default: 1)
   */
  static async withTokenRefresh<T>(
    apiCall: () => Promise<T>,
    maxRetries = 1
  ): Promise<T> {
    let retries = 0;

    while (retries <= maxRetries) {
      try {
        return await apiCall();
      } catch (error: any) {
        // Check if it's a 401 Unauthorized error
        const is401 = error?.message?.includes("401") ||
                      error?.message?.toLowerCase().includes("unauthorized") ||
                      error?.message?.toLowerCase().includes("unauthenticated");

        if (is401 && retries < maxRetries) {
          console.log("Got 401 error, attempting token refresh...");

          try {
            // Try to refresh token
            await AuthService.refreshToken();
            console.log("Token refreshed, retrying API call");
            retries++;
            continue;
          } catch (refreshError) {
            console.log("Token refresh failed, clearing auth");
            await TokenStorage.clearAuth();
            router.replace("/login");
            throw error;
          }
        }

        throw error;
      }
    }

    throw new Error("Max retries exceeded");
  }

  /**
   * Ensure user is authenticated, redirect to login if not
   */
  static async requireAuth(): Promise<void> {
    const isAuthenticated = await this.checkAuth();

    if (!isAuthenticated) {
      console.log("User not authenticated, redirecting to login");
      router.replace("/login");
    }
  }

  /**
   * Manually trigger token refresh
   * Useful for periodic refresh or when you know token is about to expire
   */
  static async refreshTokenIfNeeded(): Promise<boolean> {
    try {
      const token = await TokenStorage.getToken();

      if (!token) {
        return false;
      }

      // Refresh token
      await AuthService.refreshToken();
      console.log("Token refreshed successfully");
      return true;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return false;
    }
  }
}
