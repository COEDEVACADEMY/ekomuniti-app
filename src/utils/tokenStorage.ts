import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/auth";

const TOKEN_KEY = "@ekomuniti_token";
const USER_KEY = "@ekomuniti_user";

/**
 * Token Storage Utility
 * Manages authentication token and user data in AsyncStorage
 */
export class TokenStorage {
  /**
   * Save authentication token
   */
  static async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error("Error saving token:", error);
      throw error;
    }
  }

  /**
   * Get authentication token
   */
  static async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  }

  /**
   * Remove authentication token
   */
  static async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error removing token:", error);
      throw error;
    }
  }

  /**
   * Save user data
   */
  static async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  }

  /**
   * Get user data
   */
  static async getUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  }

  /**
   * Remove user data
   */
  static async removeUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error("Error removing user:", error);
      throw error;
    }
  }

  /**
   * Clear all auth data (token + user)
   */
  static async clearAuth(): Promise<void> {
    try {
      await Promise.all([this.removeToken(), this.removeUser()]);
    } catch (error) {
      console.error("Error clearing auth:", error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated (has valid token)
   */
  static async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }
}
