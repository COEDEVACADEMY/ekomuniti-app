
export interface Gender {
  id_gender: number;
  gender: string;
  description: string;
  is_active: "ENABLE" | "DISABLE";
  created_at?: string;
  updated_at?: string;
}

export interface MemberManpower {
  id_detail_manpower: number;
  ic_number: string | null;
  id_gender: number | null;
  gender_relation?: Gender | null;
  marital_status: string | null;
  native_status: string | null;
  address: string | null;
  postcode: string | null;
  state?: {
    id_state: number;
    state: string;
  } | null;
  city?: {
    id_city: number;
    city: string;
  } | null;
  parliament?: {
    id: number;
    parliament: string;
  } | null;
  dun?: {
    id: number;
    dun: string;
  } | null;
  nation?: {
    id_nation: number;
    nation: string;
  } | null;
  religion?: {
    id_religion: number;
    religion: string;
  } | null;
}

// Updated Member interface to match actual API response
export interface Member {
  id: number;
  id_detail_manpower: number;
  id_detail_company: number;
  joining_fee: string | null;
  status_approval: string;
  status_approval_at: string;
  status_approval_by: string | null;
  payment_method: string | null;
  payment_date: string | null;
  expired_at: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  ref: string;
  invoice: string;
  persatuan: string;
  registered_by_name: string;
  manpower?: {
    id_user: number;
    id_detail_manpower: number;
    id_detail_company: number | null;
    ic_number: string;
    step_registration: number;
    native_status: number;
    business_license_no: string | null;
    business_type: string | null;
    kad_digital: string;
    payment_kad_digital: string | null;
    status_native_text: string;
    user: {
      id: number;
      fullname: string;
      phone_number: string;
      email: string;
      is_verified: number;
      registered_by: number | null;
    };
    status_native: {
      id_status_native: number;
      status_native: string;
    };
    business_type_text: string | null;
  } | null;
  company?: {
    id_detail_company: number;
    full_company_name: string | null;
  } | null;
}

// Helper getters for Member
export const getMemberFullname = (member: Member): string => {
  return member.manpower?.user?.fullname || 'N/A';
};

export const getMemberEmail = (member: Member): string => {
  return member.manpower?.user?.email || 'N/A';
};

export const getMemberPhone = (member: Member): string => {
  return member.manpower?.user?.phone_number || 'N/A';
};

export const getMemberStatus = (member: Member): string => {
  return member.status_approval || 'PENDING';
};

// Updated response structure to match actual API
export interface MemberListResponse {
  success: boolean;
  message: string;
  data: Member[]; // Data is directly an array, not paginated object
}

// Add paginated response if API supports pagination
export interface MemberListPaginatedResponse {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    data: Member[];
    per_page: number;
    total: number;
    last_page: number;
  };
}

// Member detail has different structure - returns detail_manpower data
export interface MemberDetail {
  id_detail_manpower: number;
  id_user: number;
  id_city: number | null;
  id_state: number | null;
  id_country: number | null;
  id_parliament: number | null;
  id_dun: number | null;
  id_village_guests: number | null;
  id_nation: number | null;
  id_agama: number | null;
  id_status_education: number | null;
  id_work_type: number | null;
  id_detail_company: number | null;
  id_pegawai_daerah: number | null;
  ic_number: string;
  is_foreign: number;
  my_kad_picture: string | null;
  photo_profile: string | null;
  birth_date: string | null;
  gender: number;
  marital_status: string | null;
  native_status: number;
  address: string;
  postcode: string | number;
  education_field: string | null;
  skills_certificate: string | null;
  skills_certificate_year: string | null;
  current_work_status: string | null;
  name_of_business: string | null;
  picture_of_business: string | null;
  picture_product: string | null;
  business_type: string | null;
  business_license_no: string | null;
  business_address: string | null;
  business_lat: string | null;
  business_lng: string | null;
  business_activity: string | null;
  sub_business_activity: string | null;
  category_product: string | null;
  business_phone: string | null;
  business_income: string | null;
  business_income_monthly: string | null;
  business_income_weekly: string | null;
  business_income_daily: string | null;
  business_email: string | null;
  business_sosmed: string | null;
  business_sosmed_link: string | null;
  business_instagram: string | null;
  business_facebook: string | null;
  business_tiktok: string | null;
  business_youtube: string | null;
  factory_address: string | null;
  factory_lat: string | null;
  factory_lng: string | null;
  halal_certificate: string | null;
  halal_certificate_number: string | null;
  halal_certificate_date: string | null;
  gmp_certificate: string | null;
  gmp_certificate_number: string | null;
  gmp_certificate_date: string | null;
  kkm_certificate: string | null;
  kkm_certificate_number: string | null;
  kkm_certificate_date: string | null;
  website: string | null;
  q_financing: string | null;
  id_agency: number | null;
  agency_loan_amount: string | null;
  agency_load_year: string | null;
  q_financing_interest: string | null;
  id_agency_interest: number | null;
  financing_amount_interest: string | null;
  q_pelatihan: string | null;
  choose_agency_pelatihan: string | null;
  header_class: string | null;
  step_registration: number;
  is_subscribe: string;
  subscribe_status: string;
  subscribe_free: number;
  valid_time_certificate: number;
  certificate_expired_date: string;
  number_certificate: string;
  view_certificate: number;
  kad_digital: string;
  payment_kad_digital: string | null;
  key_reference: string;
  id_cawangan: number;
  id_approve_by_ketua_bahagian: number | null;
  id_approve_by_admin_pusat: number | null;
  nama_pencadang: string;
  nama_peyokong: string;
  approve_at_cawangan: string | null;
  approve_at_ketua_bahagian: string | null;
  approve_at_admin_pusat: string | null;
  status_approval_cawangan: string;
  rejection_reason_cawangan: string | null;
  status_approval_ketua_bahagian: string;
  rejection_reason_ketua_bahagian: string | null;
  status_approval_admin_pusat: string;
  rejection_reason_admin_pusat: string | null;
  reason_admin_pusat: string | null;
  reason_ketua_bahagian: string | null;
  reason_cawangan: string | null;
  is_mualaf: number;
  tarikh_pengislaman: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status_native_text: string;
  persatuan: string;
  business_type_name: string;
  business_activity_name: string;
  business_income_name: string;
  gender_name: string;
  marital_status_name: string;
  city_name: string;
  state_name: string;
  country_name: string;
  parliament_name: string;
  dun_name: string;
  religion_name: string;
  nation_name: string;
  invoice: string;
  registered_by_name: string;
  user: {
    id: number;
    fullname: string;
    phone_number: string;
    email: string;
    is_verified: number;
    registered_by: number | null;
    status: string;
  };
  company: any | null;
  status_native: {
    id_status_native: number;
    status_native: string;
  } | null;
  business_type_text: any | null;
  business_activity_text: any | null;
  business_income_text: any | null;
  gender_text: {
    id_gender: number;
    gender: string;
  } | null;
  marital_status_text: any | null;
  city: {
    id_city: number;
    city: string;
  } | null;
  state: {
    id_state: number;
    state: string;
  } | null;
  country: {
    id_country: number;
    country_name: string;
  } | null;
  parliament: {
    id: number;
    parliament: string;
  } | null;
  dun: {
    id: number;
    dun: string;
  } | null;
  religion: any | null;
  nation: any | null;
}

export interface MemberDetailResponse {
  success: boolean;
  data: MemberDetail;
}

export interface CreateMemberPayload {
  fullname: string;
  email: string;
  phone_number: string;
  password: string;
  ic_number: string;
  gender: number;
  id_agama?: number;
  id_nation?: number;
  marital_status?: string;
  native_status?: string;
  address?: string;
  id_state: number;
  id_city?: number;
  id_parliament?: number;
  id_dun?: number;
  postcode?: string;
}

export interface UpdateMemberPayload {
  fullname?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  ic_number?: string;
  gender?: number;
  id_agama?: number;
  id_nation?: number;
  marital_status?: string;
  native_status?: string;
  address?: string;
  id_state?: number;
  id_city?: number;
  id_parliament?: number;
  id_dun?: number;
  postcode?: string;
  status?: string;
}
export interface MemberCreateResponse {
  success: boolean;
  message: string;
  data: Member;
}

export interface MemberUpdateResponse {
  success: boolean;
  message: string;
  data: Member;
}

export interface MemberDeleteResponse {
  success: boolean;
  message: string;
}

export interface TotalMemberStats {
  total_member: number;
  total_active: number;
  total_pending: number;
  total_expired: number;
}

export interface TotalMemberStatsResponse {
  success: boolean;
  data: TotalMemberStats;
}
