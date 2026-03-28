import { ModulesList } from '@/components/course/allModules';
import CreateModuleForm from '@/components/course/createModuleForm';
import { getModules } from '@/services/course/course.server.service';
import { revalidateTag } from 'next/cache';

export default async function ModulesPage({
  params,
}: {
  params: Promise<{ course_id: string }>;
}) {
  const { course_id } = await params;

  const { data: modules } = await getModules(course_id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {/* LEFT */}
      <CreateModuleForm />

      {/* RIGHT */}
      <ModulesList modules={modules} courseId={course_id} />
    </div>
  );
}
