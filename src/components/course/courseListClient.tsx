'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Edit, Trash2, LayoutGrid, Eye, EyeOff } from 'lucide-react';
import { courseService } from '@/services/course/course.service';
import { Course } from '@/types';
import EditCourseForm from '@/components/course/editCourseForm';

export default function CourseListClient({
  initialData,
}: {
  initialData: Course[];
}) {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleTogglePublish = async (
    courseId: string,
    currentStatus: boolean,
  ) => {
    const toastId = 'publish-course';
    const newStatus = !currentStatus;

    try {
      toast.loading(
        newStatus ? 'Publishing course...' : 'Unpublishing course...',
        { id: toastId },
      );

      const formData = new FormData();
      const metaData = { isPublished: newStatus };
      formData.append('data', JSON.stringify(metaData));

      const res = await courseService.updateCourse(courseId, formData);

      if (res?.error) {
        toast.error(res.error.message || 'Failed to update status', {
          id: toastId,
        });
        return;
      }

      toast.success(
        newStatus ? 'Course is now live!' : 'Course moved to drafts',
        { id: toastId },
      );
      router.refresh();
    } catch (err: any) {
      // Catching unexpected network or code errors
      toast.error(err?.message || 'A network error occurred', { id: toastId });
    }
  };

  // Function to handle deletion with detailed error reporting
  const handleDelete = async () => {
    if (!selectedCourse) return;
    const toastId = 'deleting-course';

    try {
      toast.loading('Deleting course...', { id: toastId });
      const res = await courseService.deleteCourse(selectedCourse.id);

      if (res?.error) {
        toast.error(res.error.message || 'Could not delete course', {
          id: toastId,
        });
        return;
      }

      toast.success('Course permanently removed', { id: toastId });
      setIsDeleteDialogOpen(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message || 'Delete failed due to a server error', {
        id: toastId,
      });
    }
  };

  return (
    <div className="grid gap-4">
      {initialData?.map((course) => (
        <div
          key={course.id}
          className="border rounded-xl p-5 flex justify-between items-center bg-white shadow-sm transition-hover hover:border-blue-200"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg text-slate-800">
                {course.title}
              </h2>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  course.isPublished
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}
              >
                {course.isPublished ? 'Published' : 'Draft'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Level:{' '}
              <span className="font-medium text-slate-700">{course.level}</span>{' '}
              | Fee:{' '}
              <span className="font-medium text-slate-700">
                {course.isFree ? 'Free' : `৳${course.course_fee}`}
              </span>
            </p>
          </div>

          <div className="flex gap-2">
            {/* Toggle Status Button */}
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 min-w-[110px] transition-colors ${
                course.isPublished
                  ? 'text-slate-600 hover:bg-slate-50'
                  : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300'
              }`}
              onClick={() =>
                handleTogglePublish(course.id, !!course.isPublished)
              }
            >
              {course.isPublished ? (
                <>
                  <EyeOff className="w-4 h-4" /> Unpublish
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" /> Publish
                </>
              )}
            </Button>

            <Link
              href={`/instructor-dashboard/all-courses/${course.id}`}
              className="no-underline"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                Modules
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              className="text-amber-600 flex items-center gap-2 border-amber-200 hover:bg-amber-50 hover:border-amber-300"
              onClick={() => {
                setSelectedCourse(course);
                setIsEditDialogOpen(true);
              }}
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>

            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => {
                setSelectedCourse(course);
                setIsDeleteDialogOpen(true);
              }}
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      ))}

      {/* Edit Dialog - Fixed at 5xl for X-axis width */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-5xl w-[95vw] overflow-y-auto max-h-[90vh] p-0 border-none rounded-2xl overflow-hidden">
          <div className="p-8 bg-white">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-3xl font-bold text-slate-900">
                Course Configuration
              </DialogTitle>
              <DialogDescription className="text-slate-500">
                Update your course content, pricing, and visibility settings
                below.
              </DialogDescription>
            </DialogHeader>
            {selectedCourse && (
              <EditCourseForm
                course={selectedCourse}
                onSuccess={() => {
                  setIsEditDialogOpen(false);
                  router.refresh();
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Confirm Deletion</DialogTitle>
            <DialogDescription className="py-2">
              This action is permanent. Are you sure you want to delete{' '}
              <span className="font-bold text-slate-900">
                "{selectedCourse?.title}"
              </span>
              ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Keep Course
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
