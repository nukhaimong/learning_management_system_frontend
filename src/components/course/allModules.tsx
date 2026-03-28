import Link from 'next/link';

interface Module {
  id: string;
  title: string;
}

interface ModulesListProps {
  modules: Module[];
  courseId: string;
}

export const ModulesList = ({ modules, courseId }: ModulesListProps) => {
  return (
    <div className="border p-4 rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Modules</h2>

      {modules.length === 0 && (
        <p className="text-sm text-gray-500">No modules yet</p>
      )}

      <div className="space-y-3">
        {modules.map((module) => (
          <div
            key={module.id}
            className="p-3 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{module.title}</p>
            </div>

            <div className="flex gap-2">
              {/* CREATE LECTURE BUTTON */}
              <Link
                href={`/instructor-dashboard/all-courses/${courseId}/${module.id}`}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded"
              >
                + Lecture
              </Link>

              <button className="text-blue-500 text-sm">Edit</button>

              <button className="text-red-500 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
