'use client';

import React from 'react';

interface CourseActionButtonsProps {
  courseId: string;
}

const CourseActionButtons: React.FC<CourseActionButtonsProps> = ({
  courseId,
}) => {
  const handleAddToFavorites = (id: string) => {
    console.log(`Adding course ${id} to favorites...`);
    // Add your API call or state logic here
  };

  const handleEnrollNow = (id: string) => {
    console.log(`Enrolling in course ${id}...`);
    // Add your enrollment/payment logic here
  };

  return (
    <div className="flex gap-4 mt-6">
      <button
        onClick={() => handleAddToFavorites(courseId)}
        className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
      >
        Add to Favorites
      </button>
      <button
        onClick={() => handleEnrollNow(courseId)}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Enroll Now
      </button>
    </div>
  );
};

export default CourseActionButtons;
