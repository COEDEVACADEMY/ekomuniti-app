import { API_BASE_URL } from "./api";
export const buildUrl = (
  url: string,
  params?: Record<string, string | number | boolean | undefined>
): string => {
  if (!params) return url;

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `${url}?${queryString}` : url;
};

// Centralized API Endpoints
export const API = {
  AUTH: {
    login: `${API_BASE_URL}/login`,
    logout: `${API_BASE_URL}/logout`,
    getMe: `${API_BASE_URL}/me`,
    refreshToken: `${API_BASE_URL}/refresh-token`,
    updateProfile: `${API_BASE_URL}/profile`,
  },

  MEMBER: {
    getDataMember: `${API_BASE_URL}/members`,
    getDetailMember: (id: number) => `${API_BASE_URL}/members/${id}`,
    createMember: `${API_BASE_URL}/member`,
    updateMember: (id: number) => `${API_BASE_URL}/members/${id}`,
    deleteMember: (id: number) => `${API_BASE_URL}/members/${id}`,
    getTotalMembers: `${API_BASE_URL}/total-member`,
  },

  LOCATION: {
    getCity: `${API_BASE_URL}/getCity`,
    getState: `${API_BASE_URL}/getState`,
    getParliament: `${API_BASE_URL}/getParliament`,
    getDun: `${API_BASE_URL}/getDun`,
    getNation: `${API_BASE_URL}/getNation`,
    getReligion: `${API_BASE_URL}/getReligion`,
  },

  GENDER: {
    getGender: `${API_BASE_URL}/getGender`,
  },
};
