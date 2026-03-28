// app/courses/[id]/modules/[module_id]/page.tsx
import AllLectures from '@/components/course/allLectures';
import CreateLectureForm from '@/components/course/createLectureForm';
import { getLectures } from '@/services/course/course.server.service';

const Page = async ({ params }: { params: Promise<{ module_id: string }> }) => {
  const { module_id } = await params;
  const { data } = await getLectures(module_id);
  const lectures = data || [];

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Module Lectures</h1>
        <p className="text-gray-600 mt-1">
          Create and manage lectures for this module
        </p>
      </div>

      {/* Create Lecture Form */}
      <div className="mb-8">
        <CreateLectureForm />
      </div>

      {/* All Lectures List */}
      <div>
        <AllLectures lectures={lectures} />
      </div>
    </div>
  );
};

export default Page;
