import { API_BASE_URL } from "../config/api";
import { ApiHelper } from "../utils/apiHelper";
import { TotalMemberResponse, MembersResponse } from "../types/member";

/**
 * Member Service
 * Handles all member-related API calls with auto-refresh on 401
 */
export class MemberService {
  /**
   * Get total member statistics
   * @returns Promise with total member stats
   */
  static async getTotalMembers(): Promise<TotalMemberResponse> {
    try {
      console.log("Fetching total members from:", `${API_BASE_URL}/total-member`);

      // ApiHelper automatically handles 401 and refreshes token
      const response = await ApiHelper.get<TotalMemberResponse>(
        `${API_BASE_URL}/total-member`
      );

      console.log("Total members response:", response);
      return response;
    } catch (error) {
      console.error("Failed to fetch total members:", error);
      throw error;
    }
  }

  /**
   * Get members list with pagination
   * @param page - Page number (default: 1)
   * @param perPage - Items per page (default: 10)
   * @param search - Search query (optional)
   * @returns Promise with members list and pagination
   */
  static async getMembers(
    page: number = 1,
    perPage: number = 10,
    search?: string
  ): Promise<MembersResponse> {
    try {
      // Build query params
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });

      if (search && search.trim()) {
        params.append("search", search.trim());
      }

      const url = `${API_BASE_URL}/members?${params.toString()}`;
      console.log("Fetching members from:", url);

      // ApiHelper automatically handles 401 and refreshes token
      const response = await ApiHelper.get<MembersResponse>(url);

      console.log("Members response:", {
        total: response.pagination.total,
        page: response.pagination.current_page,
        count: response.data.length,
      });

      return response;
    } catch (error) {
      console.error("Failed to fetch members:", error);
      throw error;
    }
  }

  /**
   * Get member detail by ID (id_detail_manpower)
   * @param idDetailManpower - Member detail manpower ID
   * @returns Promise with member detail
   */
  static async getMemberDetail(idDetailManpower: number): Promise<any> {
    try {
      console.log("Fetching member detail for id_detail_manpower:", idDetailManpower);

      const response = await ApiHelper.get(
        `${API_BASE_URL}/members/${idDetailManpower}`
      );

      console.log("Member detail response:", response);
      return response;
    } catch (error) {
      console.error("Failed to fetch member detail:", error);
      throw error;
    }
  }

  /**
   * Update member profile
   * @param idDetailManpower - Member detail manpower ID
   * @param data - Update data
   * @returns Promise with updated member
   */
  static async updateMemberProfile(idDetailManpower: number, data: any): Promise<any> {
    try {
      console.log("Updating member profile:", idDetailManpower, data);

      const response = await ApiHelper.put(
        `${API_BASE_URL}/members/${idDetailManpower}`,
        data
      );

      console.log("Update member response:", response);
      return response;
    } catch (error) {
      console.error("Failed to update member:", error);
      throw error;
    }
  }
}
