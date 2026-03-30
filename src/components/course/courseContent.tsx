'use client';

import { useState } from 'react';
import { Play, ChevronDown, ChevronRight } from 'lucide-react';

interface Lecture {
  id: string;
  title: string;
  video_url: string;
}

interface Module {
  id: string;
  title: string;
  lectures: Lecture[];
}

interface CourseContentProps {
  modules: Module[];
}

const CourseContent = ({ modules }: CourseContentProps) => {
  const [openModules, setOpenModules] = useState<string[]>([
    modules[0]?.id || '',
  ]);
  const [activeLectureId, setActiveLectureId] = useState<string>(
    modules[0]?.lectures[0]?.id || '',
  );

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  const handleLectureClick = (lecture: Lecture, moduleTitle: string) => {
    setActiveLectureId(lecture.id);

    // Dispatch event to update video player
    const event = new CustomEvent('lectureChange', {
      detail: {
        lecture: lecture,
        moduleTitle: moduleTitle,
      },
    });
    window.dispatchEvent(event);
  };

  // Find module title for a lecture
  const getModuleTitle = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    return module?.title || '';
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {modules.map((module) => (
        <div key={module.id} className="border-b">
          <button
            onClick={() => toggleModule(module.id)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              {openModules.includes(module.id) ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
              <span className="font-medium text-sm">{module.title}</span>
            </div>
            <span className="text-xs text-gray-500">
              {module.lectures.length} lectures
            </span>
          </button>

          {openModules.includes(module.id) && (
            <div className="pb-2">
              {module.lectures.map((lecture, index) => (
                <button
                  key={lecture.id}
                  onClick={() => handleLectureClick(lecture, module.title)}
                  className={`w-full px-4 py-2 flex items-center gap-3 transition-colors ${
                    activeLectureId === lecture.id
                      ? 'bg-blue-50 border-l-4 border-l-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Play
                    className={`w-3 h-3 ${
                      activeLectureId === lecture.id
                        ? 'text-blue-500'
                        : 'text-gray-400'
                    }`}
                  />
                  <div className="flex-1 text-left">
                    <p
                      className={`text-sm ${
                        activeLectureId === lecture.id
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-700'
                      }`}
                    >
                      {lecture.title}
                    </p>
                    <p className="text-xs text-gray-400">Lecture {index + 1}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseContent;
