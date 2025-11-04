export interface Announcement {
  id: number;
  title: string;
  description: string;
  content: string;
  icon_color?: string;
  priority?: "high" | "medium" | "low";
  created_at: string;
  updated_at: string;
  read?: boolean;
}

export interface AnnouncementsResponse {
  success: boolean;
  data: Announcement[];
  message?: string;
}

export interface AnnouncementDetailResponse {
  success: boolean;
  data: Announcement;
  message?: string;
}
