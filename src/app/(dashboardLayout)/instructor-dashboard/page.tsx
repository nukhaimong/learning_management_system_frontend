import { getCoursesByInstructorId } from '@/services/course/course.server.service';
import { DollarSign, Users, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// 1. Updated Interface: payment is now a single object
interface Course {
  id: string;
  title: string;
  thumbnail: string;
  enrollments: {
    id: string;
    payment: {
      amount: number;
    } | null; // Handle cases where payment might be missing
  }[];
}

const InstructorDashboard = async () => {
  const courseData = await getCoursesByInstructorId();
  const courses: Course[] = courseData?.data || [];

  // --- REFINED STATS CALCULATION ---

  // Summing single payment objects across all enrollments
  const totalRevenue = courses.reduce((acc, course) => {
    const courseSum = course.enrollments.reduce((enrollmentSum, enrollment) => {
      const paymentAmount = enrollment.payment?.amount || 0;
      return enrollmentSum + paymentAmount;
    }, 0);
    return acc + courseSum;
  }, 0);

  const totalEnrollments = courses.reduce(
    (acc, course) => acc + (course.enrollments?.length || 0),
    0,
  );
  const avgRevenuePerCourse =
    courses.length > 0 ? totalRevenue / courses.length : 0;

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Instructor Dashboard
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Performance overview for your {courses.length} active{' '}
              {courses.length === 1 ? 'course' : 'courses'}
            </p>
          </div>
          <Link
            href="/instructor/courses/create"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            + Create New Course
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="p-2 w-max bg-indigo-50 rounded-lg mb-4">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Total Courses
            </p>
            <p className="text-3xl font-black text-slate-900 mt-1">
              {courses.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="p-2 w-max bg-emerald-50 rounded-lg mb-4">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Enrollments
            </p>
            <p className="text-3xl font-black text-slate-900 mt-1">
              {totalEnrollments}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="p-2 w-max bg-amber-50 rounded-lg mb-4">
              <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Total Revenue
            </p>
            <p className="text-3xl font-black text-slate-900 mt-1">
              ৳{totalRevenue.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="p-2 w-max bg-purple-50 rounded-lg mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Avg. Per Course
            </p>
            <p className="text-3xl font-black text-slate-900 mt-1">
              ৳{Math.round(avgRevenuePerCourse).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Courses Grid */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Your Course Library
          </h2>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {courses.map((course) => {
                const courseRevenue = course.enrollments.reduce(
                  (sum, enrollment) => {
                    return sum + (enrollment.payment?.amount || 0);
                  },
                  0,
                );

                return (
                  <div
                    key={course.id}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
                  >
                    {/* Thumbnail */}
                    <div className="md:w-56 aspect-video md:aspect-square relative bg-slate-100 overflow-hidden">
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <BookOpen className="w-10 h-10" />
                        </div>
                      )}
                    </div>

                    {/* Course Details */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                          {course.title}
                        </h3>

                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              Enrollments
                            </p>
                            <p className="text-xl font-black text-slate-800">
                              {course.enrollments.length}
                            </p>
                          </div>
                          <div className="h-8 w-[1px] bg-slate-100" />
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              Revenue
                            </p>
                            <p className="text-xl font-black text-emerald-600">
                              ৳{courseRevenue.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-16 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No courses created yet
              </h3>
              <Link
                href="/instructor/courses/create"
                className="mt-4 inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100"
              >
                Create Your First Course
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
