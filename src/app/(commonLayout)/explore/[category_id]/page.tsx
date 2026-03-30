import CourseGrid from '@/components/homepage/featuredCourse';
import { getCoursesByCategory } from '@/services/course/course.server.service';
import { Course } from '@/types';
import { BookOpen } from 'lucide-react';

interface PageProps {
  params: Promise<{ category_id: string }>;
}

const CategoryPage = async ({ params }: PageProps) => {
  const { category_id } = await params;
  const coursesData = await getCoursesByCategory(category_id);
  const courses: Course[] = coursesData?.data || [];

  // Get category name from first course if available
  const categoryName = courses[0]?.category?.title || 'this category';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {categoryName}
        </h1>
        <p className="text-slate-600">
          {courses.length} {courses.length === 1 ? 'course' : 'courses'} to help
          you master {categoryName.toLowerCase()}
        </p>
      </div>

      {/* Course Grid or Empty State */}
      {courses.length > 0 ? (
        <CourseGrid courses={courses} />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-slate-50 rounded-2xl">
          <BookOpen className="w-12 h-12 text-slate-300 mb-3" />
          <h3 className="text-lg font-semibold text-slate-800">
            No courses available yet
          </h3>
          <p className="text-slate-500 text-center max-w-md mt-1">
            We're adding new courses soon. Stay tuned!
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
