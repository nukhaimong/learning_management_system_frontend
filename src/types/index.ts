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
  category: {
    id: string;
    title: string;
  };
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  publishedAt: Date;
  instructor: {
    id: string;
    name: string;
  };
}

export interface SingleCourse {
  data: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    intro_video: string;
    course_fee: number;
    isFree: boolean;
    level: string;
    category_id: string;
    category: {
      id: string;
      title: string;
    };
    createdAt: string;
    updatedAt: string;
    isPublished: boolean;
    publishedAt: Date;
    instructor: {
      id: string;
      name: string;
    };
    modules: {
      id: string;
      title: string;
      lectures: {
        id: string;
        title: string;
      }[];
    }[];
    reviews: {
      id: string;
      content: string;
      learner: {
        name: string;
      };
    }[];
    enrollments: {
      id: string;
    }[];
  };
}
export interface CourseData {
  data: Course[];
}

export interface Enrollment {
  id: string;
  course: {
    id: string;
    title: string;
    thumbnail: string;
    modules: {
      id: string;
      title: string;
      lectures: {
        id: string;
        title: string;
        video_url: string;
      }[];
    }[];
  };
}

export interface Category {
  id: string;
  title: string;
}
