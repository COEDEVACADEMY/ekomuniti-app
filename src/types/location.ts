export interface City {
  id_city: number;
  id_state: number;
  city: string;
  representation: string | null;
  association: string | null;
  description: string | null;
  description2: string | null;
  phone_number: string | null;
  latitude: string;
  longitude: string;
  is_active: string;
  created_at: string;
  updated_at: string;
}

export interface State {
  id_state: number;
  id_country: number;
  state: string;
  is_active: string;
}

export interface Parliament {
  id: number;
  id_state: number;
  parliament: string;
  is_active: string;
}

export interface Dun {
  id: number;
  id_parliament: number;
  dun: string;
  is_active: string;
}

export interface Nation {
  id_nation: number;
  nation: string;
  is_active: string;
}

export interface Religion {
  id_religion: number;
  religion: string;
  is_active: string;
}

export interface GetCitiesResponse {
  success: boolean;
  data: City[];
}

export interface GetStatesResponse {
  success: boolean;
  data: State[];
}

export interface GetParliamentsResponse {
  success: boolean;
  data: Parliament[];
}

export interface GetDunsResponse {
  success: boolean;
  data: Dun[];
}

export interface GetNationsResponse {
  success: boolean;
  data: Nation[];
}

export interface GetReligionsResponse {
  success: boolean;
  data: Religion[];
}