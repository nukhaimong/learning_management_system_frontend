import CourseListClient from '@/components/course/courseListClient';
import { getCourses } from '@/services/course/course.server.service';

const AllCourses = async () => {
  const res = await getCourses();
  const data = res?.data || [];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">All Courses</h1>
      {data.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <CourseListClient initialData={data} />
      )}
    </div>
  );
};

export default AllCourses;
