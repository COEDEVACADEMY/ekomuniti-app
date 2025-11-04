export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  id_level: number;
  id_city: number;
  id_state: number | null;
  sub_company: string | null;
  fullname: string;
  phone_number: string;
  email: string;
  email_verified_at: string | null;
  is_verified: number;
  verified_by: string | null;
  fcm_token: string | null;
  status: string;
  status_approval: number;
  photo: string;
  all_association: string;
  registered_by: string | null;
  no_ros: string | null;
  kod_bahagian: string | null;
  kod_cawangan: string | null;
  status_ros: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export interface GetMeResponse {
  success: boolean;
  data: User;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}
