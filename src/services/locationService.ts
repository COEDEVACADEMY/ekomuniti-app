import { ApiError } from "../types/auth";
import {
  GetCitiesResponse,
  GetStatesResponse,
  GetParliamentsResponse,
  GetDunsResponse,
  GetNationsResponse,
  GetReligionsResponse,
} from "../types/location";
import { API, buildUrl } from "../config/url";
import { sanitizeErrorMessage, logError } from "../utils/errorHandler";

export class LocationService {
  static async getCities(): Promise<GetCitiesResponse> {
    try {
      console.log("Fetching cities from:", API.LOCATION.getCity);

      const response = await fetch(API.LOCATION.getCity, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        logError("LocationService.getCities", { status: response.status, data });

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal mengambil data kota",
            response.status
          ),
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      return {
        success: true,
        data: data as GetCitiesResponse["data"],
      };
    } catch (error) {
      logError("LocationService.getCities (catch)", error);

      if ((error as ApiError).success === false) {
        throw error;
      }

      throw {
        success: false,
        message: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
      } as ApiError;
    }
  }

  static async getStates(params?: { id_country?: number; q?: string }): Promise<GetStatesResponse> {
    try {
      const url = buildUrl(API.LOCATION.getState, params);
      console.log("Fetching states from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        logError("LocationService.getStates", { status: response.status, data });

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal mengambil data negeri",
            response.status
          ),
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      return {
        success: true,
        data: data as GetStatesResponse["data"],
      };
    } catch (error) {
      logError("LocationService.getStates (catch)", error);

      if ((error as ApiError).success === false) {
        throw error;
      }

      throw {
        success: false,
        message: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
      } as ApiError;
    }
  }

  static async getParliaments(params?: { id_state?: number; q?: string }): Promise<GetParliamentsResponse> {
    try {
      const url = buildUrl(API.LOCATION.getParliament, params);
      console.log("Fetching parliaments from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        logError("LocationService.getParliaments", { status: response.status, data });

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal mengambil data parlimen",
            response.status
          ),
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      return {
        success: true,
        data: data as GetParliamentsResponse["data"],
      };
    } catch (error) {
      logError("LocationService.getParliaments (catch)", error);

      if ((error as ApiError).success === false) {
        throw error;
      }

      throw {
        success: false,
        message: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
      } as ApiError;
    }
  }

  static async getDuns(params?: { id_parliament?: number; id_state?: number; q?: string }): Promise<GetDunsResponse> {
    try {
      const url = buildUrl(API.LOCATION.getDun, params);
      console.log("Fetching duns from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        logError("LocationService.getDuns", { status: response.status, data });

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal mengambil data DUN",
            response.status
          ),
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      return {
        success: true,
        data: data as GetDunsResponse["data"],
      };
    } catch (error) {
      logError("LocationService.getDuns (catch)", error);

      if ((error as ApiError).success === false) {
        throw error;
      }

      throw {
        success: false,
        message: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
      } as ApiError;
    }
  }

  static async getNations(params?: { q?: string }): Promise<GetNationsResponse> {
    try {
      const url = buildUrl(API.LOCATION.getNation, params);
      console.log("Fetching nations from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        logError("LocationService.getNations", { status: response.status, data });

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal mengambil data bangsa",
            response.status
          ),
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      return {
        success: true,
        data: data as GetNationsResponse["data"],
      };
    } catch (error) {
      logError("LocationService.getNations (catch)", error);

      if ((error as ApiError).success === false) {
        throw error;
      }

      throw {
        success: false,
        message: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
      } as ApiError;
    }
  }

  static async getReligions(params?: { q?: string }): Promise<GetReligionsResponse> {
    try {
      const url = buildUrl(API.LOCATION.getReligion, params);
      console.log("Fetching religions from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        logError("LocationService.getReligions", { status: response.status, data });

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal mengambil data agama",
            response.status
          ),
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      return {
        success: true,
        data: data as GetReligionsResponse["data"],
      };
    } catch (error) {
      logError("LocationService.getReligions (catch)", error);

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