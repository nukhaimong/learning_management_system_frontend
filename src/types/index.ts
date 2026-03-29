export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  intro_video: string;
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
