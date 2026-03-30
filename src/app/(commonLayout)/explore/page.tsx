import React from 'react';
import Link from 'next/link';
import CourseGrid from '@/components/homepage/featuredCourse';
import { getCategories } from '@/services/category/category.server.service';
import { getCourses } from '@/services/course/course.server.service';
import { Course, Category } from '@/types';
import { BookOpen } from 'lucide-react';

const Explore = async () => {
  const categoriesData = await getCategories();
  const coursesData = await getCourses();
  const courses: Course[] = coursesData?.data || [];
  const categories: Category[] = categoriesData?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Explore Courses
        </h1>
        <p className="text-slate-600">
          Discover {courses.length} courses across {categories.length}{' '}
          categories
        </p>
      </div>

      {/* Categories Section */}
      {categories.length > 0 && (
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/explore/${category.id}`}
                className="px-4 py-2 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700 rounded-full text-sm font-medium transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Courses Section */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          All Courses
        </h2>
        {courses.length > 0 ? (
          <CourseGrid courses={courses} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-slate-50 rounded-2xl">
            <BookOpen className="w-12 h-12 text-slate-300 mb-3" />
            <h3 className="text-lg font-semibold text-slate-800">
              No courses available
            </h3>
            <p className="text-slate-500 text-center max-w-md mt-1">
              New courses are being added. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
