import Link from 'next/link';
import { getCourses } from '@/services/course/course.server.service';
import { revalidatePath } from 'next/cache';
import { Course, CourseData } from '@/types';

const AllCourses = async () => {
  const { data }: CourseData = await getCourses();

  async function handleDelete(courseId: string) {
    'use server';
    // call your delete API here
    revalidatePath('/instructor-dashboard/all-courses');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">All Courses</h1>

      {(!data || data.length === 0) && <p>No courses found. Create one!</p>}

      <div className="grid gap-4">
        {data?.map((course: Course) => (
          <div
            key={course.id}
            className="border rounded-xl p-4 flex justify-between items-center"
          >
            {/* LEFT SIDE */}
            <div className="space-y-1">
              <h2 className="font-semibold text-lg">{course.title}</h2>

              <p className="text-sm text-gray-500">{course.description}</p>

              <p className="text-xs text-gray-400">
                Instructor: {course.instructor.name}
              </p>

              <p className="text-sm">
                {course.isFree ? 'Free' : `৳ ${course.course_fee}`}
              </p>

              <p className="text-xs">Level: {course.level}</p>
            </div>

            {/* RIGHT SIDE ACTIONS */}
            <div className="flex gap-2">
              {/* Modules */}
              <Link
                href={`/instructor-dashboard/all-courses/${course.id}`}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Modules
              </Link>

              {/* Edit */}
              <Link
                href={`/instructor-dashboard/all-courses/${course.id}/edit`}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </Link>

              {/* Delete */}
              <form action={handleDelete.bind(null, course.id)}>
                <button
                  type="submit"
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
