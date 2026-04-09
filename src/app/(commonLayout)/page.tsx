import CourseGrid from '@/components/homepage/featuredCourse';
import Hero from '@/components/homepage/herosection';
import WhyChooseUs from '@/components/homepage/whyChooseUs';
import { getCategories } from '@/services/category/category.server.service';
import { getCourses } from '@/services/course/course.server.service';
import { Course } from '@/types';
import { cookies } from 'next/headers';

export default async function Home() {
  const [catRes, courseRes] = await Promise.all([
    getCategories(),
    getCourses(),
  ]);

  const cookiesTest = await cookies();
  console.log(cookiesTest);

  const categories = catRes?.data || [];
  const topFiveCategory = categories.slice(0, 5);
  const allCourses = courseRes?.data || [];

  // 1. Featured: The latest 4 published courses (regardless of price)
  const featuredCourses = allCourses
    ?.filter((c: Course) => c.isPublished === true && c.isFree === false)
    .slice(0, 4);

  // 2. Free: The latest 4 courses where isFree is true
  const freeCourses = allCourses
    ?.filter((c: Course) => c.isPublished === true && c.isFree === true)
    .slice(0, 4);

  return (
    <main className="min-h-screen">
      <Hero categories={topFiveCategory} />

      {/* SECTION 1: FEATURED COURSES */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Featured Courses
            </h2>
            <p className="text-slate-500 mt-1">
              Our most popular and highly-rated programs.
            </p>
          </div>
        </div>
        <CourseGrid courses={featuredCourses} />
      </section>

      {/* SECTION 2: FREE COURSES (Distinct background to stand out) */}
      <section className="py-20 bg-emerald-50/50 border-y border-emerald-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-emerald-600 font-bold text-sm uppercase tracking-widest">
                Start for free
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Zero Cost, Infinite Learning
              </h2>
              <p className="text-slate-600 mt-1">
                Jumpstart your career with these free expert-led lessons.
              </p>
            </div>
          </div>
          <CourseGrid courses={freeCourses} />
        </div>
        <div className="mt-10">
          <WhyChooseUs />
        </div>
      </section>
    </main>
  );
}
