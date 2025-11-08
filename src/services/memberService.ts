import { ApiError } from "../types/auth";
import {
  MemberListResponse,
  MemberDetailResponse,
  CreateMemberPayload,
  UpdateMemberPayload,
  MemberCreateResponse,
  MemberUpdateResponse,
  MemberDeleteResponse,
  TotalMemberStatsResponse,
} from "../types/member";
import { API, buildUrl } from "../config/url";
import { TokenStorage } from "../utils/tokenStorage";
import { sanitizeErrorMessage, logError } from "../utils/errorHandler";

export class MemberService {
  /**
   * Get list of all members with pagination and filters
   */
  static async getMembers(params?: {
    search?: string;
    status?: string;
    per_page?: number;
    page?: number;
  }): Promise<MemberListResponse> {
    try {
      const authToken = await TokenStorage.getToken();
      if (!authToken) {
        throw {
          success: false,
          message: "No authentication token found",
        } as ApiError;
      }

      const url = buildUrl(API.MEMBER.getDataMember, params);
      console.log("Fetching members from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      console.log("Raw API Response:", JSON.stringify(data, null, 2));

      if (!response.ok) {
        logError("MemberService.getMembers", { status: response.status, data });

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal mengambil data anggota",
            response.status
          ),
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      // Response structure is { success, message, data: Member[] }
      return data as MemberListResponse;
    } catch (error) {
      logError("MemberService.getMembers (catch)", error);

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
   * Get total member statistics
   */
  static async getTotalMembers(): Promise<TotalMemberStatsResponse> {
    try {
      const authToken = await TokenStorage.getToken();
      if (!authToken) {
        throw {
          success: false,
          message: "No authentication token found",
        } as ApiError;
      }

      const url = API.MEMBER.getTotalMembers;
      console.log("Fetching total members from:", url);

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
        logError("MemberService.getTotalMembers", { status: response.status, data });

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal mengambil statistik anggota",
            response.status
          ),
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      return data as TotalMemberStatsResponse;
    } catch (error) {
      logError("MemberService.getTotalMembers (catch)", error);

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
   * Get member detail by ID
   */
  static async getMemberDetail(id: number): Promise<MemberDetailResponse> {
    try {
      const authToken = await TokenStorage.getToken();
      if (!authToken) {
        throw {
          success: false,
          message: "No authentication token found",
        } as ApiError;
      }

      const url = API.MEMBER.getDetailMember(id);
      console.log("Fetching member detail from:", url);

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
        logError("MemberService.getMemberDetail", { status: response.status, data });

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal mengambil detail anggota",
            response.status
          ),
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      return data as MemberDetailResponse;
    } catch (error) {
      logError("MemberService.getMemberDetail (catch)", error);

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
   * Create new member
   */
  static async createMember(payload: CreateMemberPayload): Promise<MemberCreateResponse> {
    try {
      const authToken = await TokenStorage.getToken();
      if (!authToken) {
        throw {
          success: false,
          message: "No authentication token found",
        } as ApiError;
      }

      console.log("Creating member with payload:", JSON.stringify(payload, null, 2));

      const response = await fetch(API.MEMBER.createMember, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        logError("MemberService.createMember", { status: response.status, data });

        if (response.status === 422) {
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

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal membuat anggota baru",
            response.status
          ),
          errors: data.errors || data,
          status: response.status,
        } as ApiError;
      }

      return data as MemberCreateResponse;
    } catch (error) {
      logError("MemberService.createMember (catch)", error);

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
   * Update member by ID
   */
  static async updateMember(id: number, payload: UpdateMemberPayload): Promise<MemberUpdateResponse> {
    try {
      const authToken = await TokenStorage.getToken();
      if (!authToken) {
        throw {
          success: false,
          message: "No authentication token found",
        } as ApiError;
      }

      console.log("Updating member", id, "with payload:", JSON.stringify(payload, null, 2));

      const response = await fetch(API.MEMBER.updateMember(id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        logError("MemberService.updateMember", { status: response.status, data });

        if (response.status === 422) {
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

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal memperbarui data anggota",
            response.status
          ),
          errors: data.errors || data,
          status: response.status,
        } as ApiError;
      }

      return data as MemberUpdateResponse;
    } catch (error) {
      logError("MemberService.updateMember (catch)", error);

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
   * Delete member by ID (soft delete)
   */
  static async deleteMember(id: number): Promise<MemberDeleteResponse> {
    try {
      const authToken = await TokenStorage.getToken();
      if (!authToken) {
        throw {
          success: false,
          message: "No authentication token found",
        } as ApiError;
      }

      console.log("Deleting member:", id);

      const response = await fetch(API.MEMBER.deleteMember(id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        logError("MemberService.deleteMember", { status: response.status, data });

        throw {
          success: false,
          message: sanitizeErrorMessage(
            data.message || "Gagal menghapus anggota",
            response.status
          ),
          errors: data.errors,
          status: response.status,
        } as ApiError;
      }

      return data as MemberDeleteResponse;
    } catch (error) {
      logError("MemberService.deleteMember (catch)", error);

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
