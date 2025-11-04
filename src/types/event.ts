export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  month: string;
  day: string;
  time: string;
  location: string;
  color?: string;
  image?: string;
  category?: string;
  organizer?: string;
  capacity?: number;
  registered?: number;
  status?: "upcoming" | "ongoing" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface EventsResponse {
  success: boolean;
  data: Event[];
  message?: string;
}

export interface EventDetailResponse {
  success: boolean;
  data: Event;
  message?: string;
}
