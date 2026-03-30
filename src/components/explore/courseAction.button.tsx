'use client';

import { courseService } from '@/services/course/course.service';
import { enrollmentService } from '@/services/enrollment/enrollment.service';
import React from 'react';
import { toast } from 'sonner';

interface CourseActionButtonsProps {
  courseId: string;
}

const CourseActionButtons: React.FC<CourseActionButtonsProps> = ({
  courseId,
}) => {
  const handleAddToFavorites = async (id: string) => {
    try {
      const toastId = 'add-to-favorites-toast';
      toast.loading('Adding to favorites...', { id: toastId });
      const res = await courseService.addTofavorites(id);
      if (res.error) {
        toast.error(res.error.message, { id: toastId });
      } else {
        toast.success(res.message, { id: toastId });
      }
    } catch (error) {
      const toastId = 'add-to-favorites-toast';
      toast.error('Failed to add course to favorites.', { id: toastId });
    }
  };

  const handleEnrollNow = async (id: string) => {
    try {
      const toastId = 'enroll-now-toast';
      toast.loading('Enrolling in course...', { id: toastId });
      const res = await enrollmentService.enrollInCourse(id);
      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }
      toast.success(res.message + 'redirecto to payment', { id: toastId });

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error('Payment URL not found, please try again', { id: toastId });
      }
    } catch (error) {
      const toastId = 'enroll-now-toast';
      toast.error('Failed to enroll in course.', { id: toastId });
    }
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
