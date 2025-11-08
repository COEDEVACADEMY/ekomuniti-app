export interface LoginRequest {
  email: string;
  password: string;
}


export interface ManpowerRelation {
  id_state?: number;
  state?: string;
  id_city?: number;
  city?: string;
  id?: number;
  parliament?: string;
  dun?: string;
  id_nation?: number;
  nation?: string;
  id_religion?: number;
  religion?: string;
}

export interface Manpower {
  id_detail_manpower: number;
  id_user?: number;
  ic_number: string | null;
  id_agama?: number | null; // Deprecated - use religion object
  gender: string | null;
  marital_status: string | null;
  native_status: string | null;
  id_nation?: number | null; // Deprecated - use nation object
  address: string | null;
  id_state?: number | null; // Deprecated - use state object
  id_city?: number | null; // Deprecated - use city object
  id_parliament?: number | null; // Deprecated - use parliament object
  id_dun?: number | null; // Deprecated - use dun object
  postcode: string | null;
  business_phone?: string | null;
  business_email?: string | null;
  business_instagram: string | null;
  business_facebook: string | null;
  business_tiktok: string | null;
  business_youtube: string | null;
  id_cawangan: number | null;
  nama_pencadang: string | null;
  nama_peyokong: string | null;
  is_mualaf: number | null;
  tarikh_pengislaman: string | null;
  created_at?: string;
  updated_at?: string;

  // New nested objects from API
  state?: ManpowerRelation | null;
  city?: ManpowerRelation | null;
  parliament?: ManpowerRelation | null;
  dun?: ManpowerRelation | null;
  nation?: ManpowerRelation | null;
  religion?: ManpowerRelation | null;
}

export interface User {
  id: number;
  id_level: number;
  fullname: string;
  email: string;
  phone_number: string;
  photo: string;
  id_city: number;
  id_state: number | null;
  status: string;
  email_verified_at: string | null;
  is_verified: number;
  created_at: string;
  updated_at: string;
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

export interface ProfileUpdatePayload {
  fullname?: string;
  phone_number?: string;
  email?: string;
  img?: string; // URI of the image
}
