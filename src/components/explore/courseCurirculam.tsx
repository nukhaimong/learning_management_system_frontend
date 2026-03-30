'use client';

import React, { useState } from 'react';

interface Lecture {
  id: string;
  title: string;
}

interface Module {
  id: string;
  title: string;
  lectures: Lecture[];
}

const CourseCurriculum = ({ modules }: { modules: Module[] }) => {
  // Store the IDs of open modules in an array to allow multiple to be open
  const [openModules, setOpenModules] = useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  return (
    <div className="space-y-4">
      {modules?.map((module) => (
        <div key={module.id} className="border rounded-lg overflow-hidden">
          {/* Module Header */}
          <button
            onClick={() => toggleModule(module.id)}
            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors font-medium text-lg"
          >
            <span>{module.title}</span>
            <span>{openModules.includes(module.id) ? '−' : '+'}</span>
          </button>

          {/* Lectures List (Conditional Rendering) */}
          {openModules.includes(module.id) && (
            <div className="bg-white border-t">
              {module.lectures?.map((lecture, index) => (
                <div
                  key={lecture.id}
                  className="p-3 px-6 border-b last:border-b-0 hover:bg-blue-50 cursor-pointer transition-colors text-sm text-gray-700 flex items-center gap-3"
                >
                  <span className="text-gray-400">{index + 1}.</span>
                  {lecture.title}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseCurriculum;
