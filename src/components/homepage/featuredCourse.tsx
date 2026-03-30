import { PlayCircle } from 'lucide-react';
import Link from 'next/link';

interface GridProps {
  courses: any[];
}

export default function CourseGrid({ courses }: GridProps) {
  if (!courses?.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {courses.map((course) => (
        <div
          key={course.id}
          className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Thumbnail */}
          <div className="aspect-video relative overflow-hidden bg-slate-100">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-slate-900 shadow-sm">
              {course.isFree ? 'FREE' : `৳${course.course_fee}`}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {course.title}
            </h3>

            <p className="text-xs text-slate-500 line-clamp-2 h-8 leading-relaxed italic">
              {course.description}
            </p>

            <Link href={`/course/${course.id}`} className="block">
              <button className="w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100">
                <PlayCircle className="w-4 h-4" />
                Get Started
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
