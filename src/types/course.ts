
export interface Course {
  id: string;
  title: string;
  description: string | null;
  duration_hours: number | null;
  level: string | null;
  price: number | null;
  thumbnail_url: string | null;
  is_published: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  description: string | null;
  content: string | null;
  video_url: string | null;
  duration_minutes: number | null;
  order_index: number;
  is_published: boolean | null;
  created_at: string;
  updated_at: string;
}
