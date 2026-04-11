import CourseActionButtons from '@/components/explore/courseAction.button';
import CourseCurriculum from '@/components/explore/courseCurirculam';
import { getCourseById } from '@/services/course/course.server.service';
import { SingleCourse } from '@/types';
import { BookOpen, Video, Users, BarChart } from 'lucide-react';

const CourseDetailPage = async ({
  params,
}: {
  params: { course_id: string };
}) => {
  const { course_id } = await params;
  const response: SingleCourse = await getCourseById(course_id);
  const course = response?.data;

  if (!course)
    return (
      <div className="p-10 text-center font-medium">Course not found.</div>
    );

  const totalModules = course.modules?.length || 0;
  const totalLectures =
    course.modules?.reduce((acc, curr) => acc + curr.lectures.length, 0) || 0;
  const totalEnrollments = course.enrollments?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero Header Section */}
      <div className="bg-white border-b mb-8">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wide mb-4">
              {course.level} Level
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {course.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              {course.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* 50/50 Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN (50%) - Video Player + Stats + Reviews */}
          <div className="order-1">
            <div className="sticky top-24">
              {/* Large Video Container */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
                <div className="aspect-video">
                  {course.intro_video ? (
                    <video
                      src={course.intro_video}
                      controls
                      poster={course.thumbnail}
                      className="w-full h-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-blue-600 border-b-[8px] border-b-transparent ml-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats under video */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-sm">
                  <BookOpen size={18} className="text-blue-500 mx-auto mb-1" />
                  <div className="font-bold text-slate-800">{totalModules}</div>
                  <div className="text-xs text-slate-500">Modules</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-sm">
                  <Video size={18} className="text-blue-500 mx-auto mb-1" />
                  <div className="font-bold text-slate-800">
                    {totalLectures}
                  </div>
                  <div className="text-xs text-slate-500">Lectures</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-sm">
                  <Users size={18} className="text-blue-500 mx-auto mb-1" />
                  <div className="font-bold text-slate-800">
                    {totalEnrollments}
                  </div>
                  <div className="text-xs text-slate-500">Enrolled</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-sm">
                  <BarChart size={18} className="text-blue-500 mx-auto mb-1" />
                  <div className="font-bold text-slate-800 capitalize">
                    {course.level}
                  </div>
                  <div className="text-xs text-slate-500">Level</div>
                </div>
              </div>

              {/* Student Reviews - MOVED TO LEFT COLUMN */}
              {course.reviews && course.reviews.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-6 w-1 bg-blue-600 rounded-full" />
                    <h2 className="text-xl font-bold text-slate-800">
                      Student Reviews
                      <span className="ml-2 text-sm font-normal text-slate-400">
                        ({course.reviews.length})
                      </span>
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {course.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-white p-5 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors shadow-sm"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                            {review.learner.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">
                              {review.learner.name}
                            </p>
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed italic">
                          "{review.content}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN (50%) - Course Info & Actions */}
          <div className="order-2">
            {/* Pricing & Action Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 mb-8">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-black text-slate-900">
                  {course.isFree ? 'Free' : `৳${course.course_fee}`}
                </span>
                {!course.isFree && (
                  <span className="text-slate-400 line-through text-sm">
                    ৳{Number(course.course_fee) + 500}
                  </span>
                )}
              </div>

              <CourseActionButtons courseId={course.id} />

              <p className="text-center text-[11px] text-slate-400 mt-4">
                Full lifetime access • Certificate of completion
              </p>
            </div>

            {/* What's included */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                What's included
              </h3>
              <div className="space-y-3">
                <DetailItem
                  icon={<BookOpen size={16} />}
                  label="Modules"
                  value={totalModules}
                />
                <DetailItem
                  icon={<Video size={16} />}
                  label="Lectures"
                  value={totalLectures}
                />
                <DetailItem
                  icon={<Users size={16} />}
                  label="Enrolled"
                  value={totalEnrollments}
                />
                <DetailItem
                  icon={<BarChart size={16} />}
                  label="Level"
                  value={course.level}
                />
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-1 bg-blue-600 rounded-full" />
                <h2 className="text-xl font-bold text-slate-800">
                  Course Curriculum
                </h2>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <CourseCurriculum modules={course.modules} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Small helper component for sidebar items
const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
    <div className="flex items-center gap-3 text-slate-600">
      <span className="text-blue-500">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
    <span className="font-semibold text-slate-800">{value}</span>
  </div>
);

export default CourseDetailPage;
