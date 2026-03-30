import CourseActionButtons from '@/components/explore/courseAction.button';
import CourseCurriculum from '@/components/explore/courseCurirculam';
import { getCourseById } from '@/services/course/course.server.service';
import { SingleCourse } from '@/types';

const CourseDetailPage = async ({
  params,
}: {
  params: { course_id: string };
}) => {
  const { course_id } = await params;
  const response: SingleCourse = await getCourseById(course_id);
  const course = response?.data;

  if (!course) {
    return <div className="p-10 text-center">Course not found.</div>;
  }

  // Calculations
  const totalModules = course.modules?.length || 0;
  const totalLectures =
    course.modules?.reduce((acc, curr) => acc + curr.lectures.length, 0) || 0;
  const totalEnrollments = course.enrollments?.length || 0;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar (Moved to Left Column for Layout consistency) */}
        <div className="md:col-span-1 border rounded-xl p-6 shadow-sm h-fit sticky top-6">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div className="text-2xl font-bold mb-2">
            {course.isFree ? 'Free' : `$${course.course_fee}`}
          </div>

          <div className="space-y-2 mb-6">
            <p className="text-sm text-gray-500 italic">Course Stats:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="font-semibold">{totalModules} Modules</span>
              <span className="font-semibold">{totalLectures} Lectures</span>
              <span className="font-semibold">{totalEnrollments} Enrolled</span>
              <span className="font-semibold">{course.level}</span>
            </div>
          </div>

          <CourseActionButtons courseId={course.id} />
        </div>

        {/* Content Column */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-extrabold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {course.description}
          </p>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
            <CourseCurriculum modules={course.modules} />
          </div>

          {/* Reviews Section */}
          <div className="border-t pt-10">
            <h2 className="text-2xl font-bold mb-6">
              Student Reviews ({course.reviews?.length || 0})
            </h2>
            <div className="space-y-6">
              {course.reviews?.length > 0 ? (
                course.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-gray-50 p-4 rounded-lg border"
                  >
                    <p className="font-semibold text-blue-600 mb-1">
                      {review.learner.name}
                    </p>
                    <p className="text-gray-700 italic">"{review.content}"</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">
                  No reviews yet for this course.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
