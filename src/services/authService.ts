import { LoginRequest, LoginResponse, ApiError, GetMeResponse, LogoutResponse, RefreshTokenResponse } from "../types/auth";
import { API_BASE_URL, API_CONFIG } from "../config/api";
import { TokenStorage } from "../utils/tokenStorage";

export class AuthService {
  /**
   * Login user with email and password
   * @param email - User email
   * @param password - User password
   * @returns Promise with login response
   */
  static async login(
    email: string,
    password: string
  ): Promise<LoginResponse> {
    try {
      console.log("Attempting login to:", `${API_BASE_URL}/login`);
      console.log("API Config:", API_CONFIG);

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        // Handle error response
        throw {
          success: false,
          message: data.message || "Login failed",
          errors: data.errors,
        } as ApiError;
      }

      // Check if response is successful
      if (!data.success) {
        throw {
          success: false,
          message: data.message || "Login failed",
          errors: data.errors,
        } as ApiError;
      }

      return data as LoginResponse;
    } catch (error) {
      console.error("Login error:", error);

      // Handle network errors or other exceptions
      if ((error as ApiError).success === false) {
        throw error;
      }

      // Network error
      throw {
        success: false,
        message: "Network error. Please check your connection and API URL configuration.",
      } as ApiError;
    }
  }

  /**
   * Get current user profile using Bearer token
   * Auto-refreshes token if 401 error is encountered
   * @param token - Authentication token
   * @param skipRefresh - Skip auto-refresh (internal use)
   * @returns Promise with user data
   */
  static async getMe(token?: string, skipRefresh = false): Promise<GetMeResponse> {
    try {
      // Get token from storage if not provided
      const authToken = token || (await TokenStorage.getToken());

      if (!authToken) {
        throw {
          success: false,
          message: "No authentication token found",
        } as ApiError;
      }

      console.log("Fetching user profile from:", `${API_BASE_URL}/me`);

      const response = await fetch(`${API_BASE_URL}/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      console.log("Get me response:", data);

      // Check for 401 Unauthorized - token expired
      if (response.status === 401 && !skipRefresh) {
        console.log("Token expired (401), attempting auto-refresh...");

        try {
          // Refresh token
          const refreshResponse = await this.refreshToken(authToken);
          console.log("Token auto-refreshed successfully, retrying getMe...");

          // Retry getMe with new token (skip refresh to prevent infinite loop)
          return await this.getMe(refreshResponse.data.token, true);
        } catch (refreshError) {
          console.error("Auto-refresh failed:", refreshError);
          // Clear auth and throw error
          await TokenStorage.clearAuth();
          throw {
            success: false,
            message: "Session expired. Please login again.",
          } as ApiError;
        }
      }

      if (!response.ok) {
        throw {
          success: false,
          message: data.message || "Failed to fetch user profile",
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      if (!data.success) {
        throw {
          success: false,
          message: data.message || "Failed to fetch user profile",
          errors: data.errors,
        } as ApiError;
      }

      return data as GetMeResponse;
    } catch (error) {
      console.error("Get me error:", error);

      if ((error as ApiError).success === false) {
        throw error;
      }

      throw {
        success: false,
        message: "Network error. Please check your connection.",
      } as ApiError;
    }
  }

  /**
   * Refresh authentication token
   * @param token - Optional current token (will use stored token if not provided)
   * @returns Promise with new token and user data
   */
  static async refreshToken(token?: string): Promise<RefreshTokenResponse> {
    try {
      // Get token from storage if not provided
      const authToken = token || (await TokenStorage.getToken());

      if (!authToken) {
        throw {
          success: false,
          message: "No authentication token found",
        } as ApiError;
      }

      console.log("Refreshing token from:", `${API_BASE_URL}/refresh-token`);

      const response = await fetch(`${API_BASE_URL}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      console.log("Refresh token response:", data);

      if (!response.ok) {
        throw {
          success: false,
          message: data.message || "Failed to refresh token",
          errors: data.errors,
        } as ApiError;
      }

      if (!data.success) {
        throw {
          success: false,
          message: data.message || "Failed to refresh token",
          errors: data.errors,
        } as ApiError;
      }

      // Save new token and updated user data
      if (data.data) {
        await TokenStorage.saveToken(data.data.token);
        await TokenStorage.saveUser(data.data.user);
        console.log("New token saved successfully");
      }

      return data as RefreshTokenResponse;
    } catch (error) {
      console.error("Refresh token error:", error);

      if ((error as ApiError).success === false) {
        throw error;
      }

      throw {
        success: false,
        message: "Network error. Please check your connection.",
      } as ApiError;
    }
  }

  /**
   * Logout user and clear authentication data
   * @param token - Optional authentication token
   * @returns Promise with logout response
   */
  static async logout(token?: string): Promise<LogoutResponse> {
    try {
      // Get token from storage if not provided
      const authToken = token || (await TokenStorage.getToken());

      if (!authToken) {
        console.warn("No token found for logout");
        // Still clear local storage
        await TokenStorage.clearAuth();
        return {
          success: true,
          message: "Logged out locally (no token found)",
        };
      }

      console.log("Logging out from:", `${API_BASE_URL}/logout`);

      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      console.log("Logout response:", data);

      // Clear local storage regardless of API response
      await TokenStorage.clearAuth();

      if (!response.ok) {
        console.warn("Logout API failed, but cleared local storage");
        return {
          success: true,
          message: "Logged out locally",
        };
      }

      return data as LogoutResponse;
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local storage even if API call fails
      await TokenStorage.clearAuth();

      return {
        success: true,
        message: "Logged out locally (API error)",
      };
    }
  }
}
