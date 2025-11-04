import { AuthService } from "../services/authService";
import { TokenStorage } from "./tokenStorage";
import { ApiError } from "../types/auth";

/**
 * API Helper with automatic token refresh
 * Wraps fetch calls with auto-refresh on 401 errors
 */
export class ApiHelper {
  /**
   * Fetch with automatic token refresh on 401
   *
   * @param url - The API endpoint URL
   * @param options - Fetch options
   * @param skipRefresh - Internal flag to prevent infinite loop
   * @returns Promise with response data
   *
   * @example
   * const data = await ApiHelper.fetchWithAuth('/api/some-endpoint', {
   *   method: 'GET'
   * });
   */
  static async fetchWithAuth<T = any>(
    url: string,
    options: RequestInit = {},
    skipRefresh = false
  ): Promise<T> {
    try {
      // Get token from storage
      const token = await TokenStorage.getToken();

      if (!token) {
        throw {
          success: false,
          message: "No authentication token found",
          status: 401,
        } as ApiError;
      }

      console.log(`Fetching: ${url}`);

      // Add authorization header
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      // Check for 401 Unauthorized - token expired
      if (response.status === 401 && !skipRefresh) {
        console.log("Token expired (401), attempting auto-refresh...");

        try {
          // Refresh token
          const refreshResponse = await AuthService.refreshToken(token);
          console.log("Token auto-refreshed successfully, retrying request...");

          // Retry the original request with new token (skip refresh to prevent infinite loop)
          return await this.fetchWithAuth<T>(url, options, true);
        } catch (refreshError) {
          console.error("Auto-refresh failed:", refreshError);
          // Clear auth and throw error
          await TokenStorage.clearAuth();
          throw {
            success: false,
            message: "Session expired. Please login again.",
            status: 401,
          } as ApiError;
        }
      }

      if (!response.ok) {
        throw {
          success: false,
          message: data.message || `Request failed with status ${response.status}`,
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      return data as T;
    } catch (error) {
      console.error("API Error:", error);

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
   * GET request with auto-refresh
   */
  static async get<T = any>(url: string): Promise<T> {
    return this.fetchWithAuth<T>(url, {
      method: "GET",
    });
  }

  /**
   * POST request with auto-refresh
   */
  static async post<T = any>(url: string, body?: any): Promise<T> {
    return this.fetchWithAuth<T>(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * PUT request with auto-refresh
   */
  static async put<T = any>(url: string, body?: any): Promise<T> {
    return this.fetchWithAuth<T>(url, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * DELETE request with auto-refresh
   */
  static async delete<T = any>(url: string): Promise<T> {
    return this.fetchWithAuth<T>(url, {
      method: "DELETE",
    });
  }

  /**
   * PATCH request with auto-refresh
   */
  static async patch<T = any>(url: string, body?: any): Promise<T> {
    return this.fetchWithAuth<T>(url, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}
