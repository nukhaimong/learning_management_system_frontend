'use client';

import { useState, useEffect } from 'react';
import LecturePlayer from './lecturePlayer';

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

interface LecturePlayerWrapperProps {
  modules: Module[];
}

const LecturePlayerWrapper = ({ modules }: LecturePlayerWrapperProps) => {
  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);
  const [currentModuleTitle, setCurrentModuleTitle] = useState('');

  // Set first lecture as default
  useEffect(() => {
    if (modules.length > 0 && modules[0].lectures.length > 0) {
      setCurrentLecture(modules[0].lectures[0]);
      setCurrentModuleTitle(modules[0].title);
    }
  }, [modules]);

  // Listen for lecture change events
  useEffect(() => {
    const handleLectureChange = (event: CustomEvent) => {
      const { lecture, moduleTitle } = event.detail;
      setCurrentLecture(lecture);
      setCurrentModuleTitle(moduleTitle);
    };

    window.addEventListener(
      'lectureChange',
      handleLectureChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        'lectureChange',
        handleLectureChange as EventListener,
      );
    };
  }, []);

  if (!currentLecture) {
    return (
      <div className="bg-black rounded-lg overflow-hidden flex items-center justify-center aspect-video">
        <p className="text-white">No lecture available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <LecturePlayer
        videoUrl={currentLecture.video_url}
        title={currentLecture.title}
        moduleTitle={currentModuleTitle}
      />
    </div>
  );
};

export default LecturePlayerWrapper;
