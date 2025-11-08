import {
  LoginRequest,
  LoginResponse,
  ApiError,
  GetMeResponse,
  LogoutResponse,
  RefreshTokenResponse,
  ProfileUpdatePayload,
} from "../types/auth";
import { API_CONFIG } from "../config/api";
import { API } from "../config/url";
import { TokenStorage } from "../utils/tokenStorage";
import { sanitizeErrorMessage, logError } from "../utils/errorHandler";

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
      console.log("Attempting login to:", API.AUTH.login);
      console.log("API Config:", API_CONFIG);

      const response = await fetch(API.AUTH.login, {
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

      if (!response.ok) {
        // Log error for debugging (only in dev)
        logError("AuthService.login", { status: response.status, data });

        // Sanitize error message
        const sanitizedMessage = sanitizeErrorMessage(
          data.message || "Login gagal",
          response.status
        );

        throw {
          success: false,
          message: sanitizedMessage,
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      // Check if response is successful
      if (!data.success) {
        logError("AuthService.login", data);

        throw {
          success: false,
          message: sanitizeErrorMessage(data.message || "Login gagal"),
          errors: data.errors,
        } as ApiError;
      }

      return data as LoginResponse;
    } catch (error) {
      logError("AuthService.login (catch)", error);

      // Handle network errors or other exceptions
      if ((error as ApiError).success === false) {
        throw error;
      }

      // Network error
      throw {
        success: false,
        message: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
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

      console.log("Fetching user profile from:", API.AUTH.getMe);

      const response = await fetch(API.AUTH.getMe, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      // Check for 401 Unauthorized - token expired
      if (response.status === 401 && !skipRefresh) {
        logError("AuthService.getMe - Token expired", { status: 401 });

        try {
          // Refresh token
          const refreshResponse = await this.refreshToken(authToken);

          // Retry getMe with new token (skip refresh to prevent infinite loop)
          return await this.getMe(refreshResponse.data.token, true);
        } catch (refreshError) {
          logError("AuthService.getMe - Auto-refresh failed", refreshError);
          // Clear auth and throw error
          await TokenStorage.clearAuth();
          throw {
            success: false,
            message: "Sesi Anda telah berakhir. Silakan login kembali.",
          } as ApiError;
        }
      }

      if (!response.ok) {
        logError("AuthService.getMe", { status: response.status, data });

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal mengambil profil pengguna",
            response.status
          ),
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      if (!data.success) {
        logError("AuthService.getMe", data);

        throw {
          success: false,
          message: sanitizeErrorMessage(data.message || "Gagal mengambil profil pengguna"),
          errors: data.errors,
        } as ApiError;
      }

      return data as GetMeResponse;
    } catch (error) {
      logError("AuthService.getMe (catch)", error);

      if ((error as ApiError).success === false) {
        throw error;
      }

      throw {
        success: false,
        message: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
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

      console.log("Refreshing token from:", API.AUTH.refreshToken);

      const response = await fetch(API.AUTH.refreshToken, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        logError("AuthService.refreshToken", { status: response.status, data });

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal memperbarui token",
            response.status
          ),
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      if (!data.success) {
        logError("AuthService.refreshToken", data);

        throw {
          success: false,
          message: sanitizeErrorMessage(data.message || "Gagal memperbarui token"),
          errors: data.errors,
        } as ApiError;
      }

      // Save new token and updated user data
      if (data.data) {
        await TokenStorage.saveToken(data.data.token);
        await TokenStorage.saveUser(data.data.user);
      }

      return data as RefreshTokenResponse;
    } catch (error) {
      logError("AuthService.refreshToken (catch)", error);

      if ((error as ApiError).success === false) {
        throw error;
      }

      throw {
        success: false,
        message: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
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

      console.log("Logging out from:", API.AUTH.logout);

      const response = await fetch(API.AUTH.logout, {
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

  /**
   * Update user profile
   * @param payload - Profile data to update
   * @returns Promise with updated user data
   */
  static async updateProfile(
    payload: ProfileUpdatePayload
  ): Promise<GetMeResponse> {
    try {
      const authToken = await TokenStorage.getToken();
      if (!authToken) {
        throw {
          success: false,
          message: "No authentication token found",
        } as ApiError;
      }

      console.log("Attempting to update profile to:", API.AUTH.updateProfile);

      const formData = new FormData();

      // Append fields to FormData
      Object.keys(payload).forEach((key) => {
        const value = payload[key as keyof ProfileUpdatePayload];
        if (value === undefined || value === null) return;

        if (key === "img" && value) {
          const uri = value as string;
          const filename = uri.split("/").pop();
          const match = /\.(\w+)$/.exec(filename!);
          const type = match ? `image/${match[1]}` : `image`;
          formData.append("img", { uri, name: filename, type } as any);
        } else {
          formData.append(key, value as string);
        }
      });

      const response = await fetch(API.AUTH.updateProfile, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
          // 'Content-Type' is not set, fetch handles it for FormData
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        logError("AuthService.updateProfile", { status: response.status, data });

        // Handle 422 validation errors from Laravel
        if (response.status === 422) {
          // Laravel returns validation errors directly as object
          // Convert to readable message
          const errorMessages: string[] = [];
          if (typeof data === 'object' && data !== null) {
            Object.keys(data).forEach(field => {
              const messages = data[field];
              if (Array.isArray(messages)) {
                errorMessages.push(`${field}: ${messages.join(', ')}`);
              }
            });
          }

          throw {
            success: false,
            message: errorMessages.length > 0
              ? `Validasi gagal:\n${errorMessages.join('\n')}`
              : "Data yang Anda masukkan tidak valid.",
            errors: data,
            status: 422,
          } as ApiError;
        }

        // Handle other errors
        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal memperbarui profil",
            response.status
          ),
          errors: data.errors || data,
          status: response.status,
        } as ApiError;
      }

      if (!data.success) {
        logError("AuthService.updateProfile", data);

        throw {
          success: false,
          message: sanitizeErrorMessage(data.message || "Gagal memperbarui profil"),
          errors: data.errors,
        } as ApiError;
      }

      // Save updated user data to storage
      if (data.data) {
        await TokenStorage.saveUser(data.data);
      }

      return data as GetMeResponse;
    } catch (error) {
      logError("AuthService.updateProfile (catch)", error);
      if ((error as ApiError).success === false) {
        throw error;
      }
      throw {
        success: false,
        message: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
      } as ApiError;
    }
  }
}
