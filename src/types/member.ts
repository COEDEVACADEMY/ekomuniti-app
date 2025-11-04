export interface MemberUser {
  id: number;
  fullname: string;
  phone_number: string;
  email: string;
  is_verified: number;
  registered_by: string | null;
  status: string;
}

export interface StatusNative {
  id_status_native: number;
  status_native: string;
}

export interface Member {
  id_user: number;
  id_detail_manpower: number;
  id_detail_company: number | null;
  ic_number: string;
  step_registration: number;
  native_status: number;
  business_license_no: string | null;
  business_type: string | null;
  business_activity: string | null;
  sub_business_activity: string | null;
  kad_digital: string;
  payment_kad_digital: string | null;
  subscribe_status: string;
  is_subscribe: string;
  certificate_expired_date: string | null;
  created_at: string;
  status_native_text: string;
  persatuan: string;
  business_type_name: string;
  business_activity_name: string;
  invoice: string;
  user: MemberUser;
  company: any | null;
  status_native: StatusNative;
  business_type_text: string | null;
  business_activity_text: string | null;
  city: any | null;
  state: any | null;
}

export interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
}

export interface MembersResponse {
  success: boolean;
  data: Member[];
  pagination: Pagination;
  message?: string;
}

export interface TotalMemberStats {
  total_member: number;
  total_active: number;
  total_pending: number;
  total_expired: number;
}

export interface TotalMemberResponse {
  success: boolean;
  data: TotalMemberStats;
  message?: string;
}
