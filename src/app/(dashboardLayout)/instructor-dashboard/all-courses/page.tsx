import { getCourses } from '@/services/course/course.server.service';

interface courseData {
  data: {
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
  }[];
}

const AllCourses = async () => {
  const { data }: courseData = await getCourses();
  console.log(data);
  return <div>All Courses</div>;
};

export default AllCourses;
