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

  if (!course) return <div className="p-10 text-center">Course not found.</div>;

  const totalModules = course.modules?.length || 0;
  const totalLectures =
    course.modules?.reduce((acc, curr) => acc + curr.lectures.length, 0) || 0;
  const totalEnrollments = course.enrollments?.length || 0;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1 border rounded-xl p-6 shadow-sm h-fit sticky top-6 bg-white">
          {/* Video / Thumbnail Section */}
          <div className="mb-4 overflow-hidden rounded-lg bg-black aspect-video flex items-center justify-center">
            {course.intro_video ? (
              <video
                src={course.intro_video}
                controls
                poster={course.thumbnail} // Shows thumbnail until play is clicked
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="text-2xl font-bold mb-2">
            {course.isFree ? 'Free' : `৳${course.course_fee}`}
          </div>

          <div className="space-y-2 mb-6">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
              Course Details
            </p>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>📚 Modules</span> <b>{totalModules}</b>
              </div>
              <div className="flex justify-between">
                <span>🎥 Lectures</span> <b>{totalLectures}</b>
              </div>
              <div className="flex justify-between">
                <span>👥 Enrolled</span> <b>{totalEnrollments}</b>
              </div>
              <div className="flex justify-between">
                <span>📊 Level</span> <b>{course.level}</b>
              </div>
            </div>
          </div>

          <CourseActionButtons courseId={course.id} />
        </div>

        {/* Content Column */}
        <div className="md:col-span-2">
          {/* ... title and description remain same ... */}
          <h1 className="text-4xl font-extrabold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-8 leading-relaxed italic border-l-4 border-blue-500 pl-4">
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
            {/* ... reviews mapping remains same ... */}
            <div className="space-y-4">
              {course.reviews?.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                      {review.learner.name.charAt(0)}
                    </div>
                    <p className="font-semibold text-gray-800">
                      {review.learner.name}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    "{review.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
