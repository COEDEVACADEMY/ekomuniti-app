import { ApiError } from "../types/auth";
import { Gender } from "../types/member";
import { API, buildUrl } from "../config/url";
import { TokenStorage } from "../utils/tokenStorage";
import { sanitizeErrorMessage, logError } from "../utils/errorHandler";

export class GenderService {
  static async getGenders(search?: string): Promise<Gender[]> {
    try {
      const authToken = await TokenStorage.getToken();
      if (!authToken) {
        throw {
          success: false,
          message: "Token autentikasi tidak ditemukan",
        } as ApiError;
      }

      const url = buildUrl(API.GENDER.getGender, search ? { q: search } : undefined);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        logError("GenderService.getGenders", { status: response.status, data });

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal mengambil data jantina",
            response.status
          ),
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      return data as Gender[];
    } catch (error) {
      logError("GenderService.getGenders (catch)", error);

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
