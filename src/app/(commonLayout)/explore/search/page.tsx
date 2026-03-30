// app/explore/search/page.tsx
import { Suspense } from 'react';
import CourseGrid from '@/components/homepage/featuredCourse';
import { getCourses } from '@/services/course/course.server.service';
import { Course } from '@/types';
import { Search } from 'lucide-react';

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchTerm?: string }>;
}) => {
  const { searchTerm } = await searchParams;
  const coursesData = await getCourses(searchTerm);
  const courses: Course[] = coursesData?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[70vh]">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-8">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 mb-2 font-semibold text-sm uppercase tracking-wider">
            <Search className="w-4 h-4" />
            Search Results
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            {searchTerm ? (
              <>
                Showing results for{' '}
                <span className="text-indigo-600">"{searchTerm}"</span>
              </>
            ) : (
              'Explore all courses'
            )}
          </h1>
        </div>
        <p className="text-slate-500 font-medium">
          Found{' '}
          <span className="text-slate-900 font-bold">{courses.length}</span>{' '}
          {courses.length === 1 ? 'course' : 'courses'}
        </p>
      </div>

      {/* Course Grid or Empty State */}
      <Suspense fallback={<SearchResultsSkeleton />}>
        {courses.length > 0 ? (
          <CourseGrid courses={courses} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              No courses found
            </h3>
            <p className="text-slate-500 mt-2">
              Try searching for different keywords or browse our categories.
            </p>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default SearchPage;

// Loading skeleton component
function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-slate-100 overflow-hidden space-y-4 p-4 shadow-sm"
        >
          <div className="aspect-video bg-slate-200 animate-pulse rounded-xl" />
          <div className="h-5 w-3/4 bg-slate-200 animate-pulse rounded" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-100 animate-pulse rounded" />
            <div className="h-3 w-5/6 bg-slate-100 animate-pulse rounded" />
          </div>
          <div className="h-12 w-full bg-slate-200 animate-pulse rounded-xl" />
        </div>
      ))}
    </div>
  );
}
