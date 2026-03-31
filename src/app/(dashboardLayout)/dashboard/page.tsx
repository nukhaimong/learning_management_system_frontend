import WatchButton from '@/components/ui/watchButton';
import { getEnrollmetsByLearnerId } from '@/services/enrollment/enrollment.server.service';
import Link from 'next/link';

interface Enrollements {
  data: {
    id: string;
    course: {
      id: string;
      title: string;
      thumbnail: string;
    };
  }[];
}

const Dashboard = async () => {
  const enrollments: Enrollements = await getEnrollmetsByLearnerId();
  const enrollmentList = enrollments?.data || [];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Dashboard Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-sm text-gray-500">
          You have {enrollmentList.length} active enrollments
        </p>
      </div>

      {enrollmentList?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {enrollmentList?.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:border-blue-400 hover:shadow-lg transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative w-full overflow-hidden bg-gray-100">
                <img
                  src={item.course.thumbnail}
                  alt={item.course.title}
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-2 mb-4 group-hover:text-blue-600 transition-colors">
                  {item.course.title}
                </h3>

                {/* --- UPDATED BUTTON HERE --- */}
                <WatchButton enrollmentId={item.id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-sm mb-4">
            No courses found in your library.
          </p>
          <Link
            href="/explore"
            className="inline-block px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-black transition"
          >
            Find a Course
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
