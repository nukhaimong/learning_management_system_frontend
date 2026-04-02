import CourseContent from '@/components/course/courseContent';
import { ReviewForm } from '@/components/course/createReviews';
import LecturePlayerWrapper from '@/components/lecture/lecturePlayerWrapper';
import { getEnrollmentById } from '@/services/enrollment/enrollment.server.service';
import { Enrollment } from '@/types';

const EnrollmentPage = async ({
  params,
}: {
  params: Promise<{ enrollment_id: string }>;
}) => {
  const { enrollment_id } = await params;
  const response = await getEnrollmentById(enrollment_id);
  const enrollment: Enrollment = response?.data;

  if (!enrollment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Enrollment not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4">
        <h1 className="text-lg font-semibold">{enrollment.course.title}</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-6 gap-6">
        {/* Left Side - Video Player */}
        <div className="flex-1 flex flex-col">
          <LecturePlayerWrapper modules={enrollment.course.modules} />
          <div className="mt-10 ">
            <ReviewForm courseId={enrollment.course.id} />
          </div>
        </div>

        {/* Right Side - Modules & Lectures */}
        <div className="w-96 bg-white rounded-lg border overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold">Course Content</h3>
          </div>
          <CourseContent modules={enrollment.course.modules} />
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;
