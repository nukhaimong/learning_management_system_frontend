export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  intro_video_url: string;
  course_fee: number;
  isFree: boolean;
  level: string;
  category_id: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  publishedAt: Date;
  instructor: {
    id: string;
    name: string;
  };
}

export interface CourseData {
  data: Course[];
}
