'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { courseService } from '@/services/course/course.service';
import { categoryService } from '@/services/category/category.service';
import { useEffect, useState } from 'react';
import { Course } from '@/types';

// Schema for Editing: Most fields are optional
const editCourseSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().min(20).optional(),
  thumbnail: z.instanceof(File).optional().nullable(),
  intro_video: z.instanceof(File).optional().nullable(),
  course_fee: z.number().min(0).optional(),
  isFree: z.boolean().optional(),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  category_id: z.string().optional(),
});

type EditFormData = z.infer<typeof editCourseSchema>;

interface EditCourseFormProps {
  course: Course;
  onSuccess: () => void;
}

export default function EditCourseForm({
  course,
  onSuccess,
}: EditCourseFormProps) {
  const [categories, setCategories] = useState<{ id: string; title: string }[]>(
    [],
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryService.getCategories();
      if (res.data) {
        setCategories(
          res.data.map((item: any) => ({ id: item.id, title: item.title })),
        );
      }
    };
    fetchCategories();
  }, []);

  const form = useForm({
    defaultValues: {
      title: course.title,
      description: course.description,
      thumbnail: null,
      intro_video: null,
      course_fee: course.course_fee || 0,
      isFree: course.isFree || false,
      level: (course.level as any) || 'Beginner',
      category_id: course.category_id || '',
    } as EditFormData,
    onSubmit: async ({ value }) => {
      const toastId = 'updating-course';
      try {
        toast.loading('Updating course...', { id: toastId });

        const formData = new FormData();
        const metaData: any = {};

        // Only add text fields to metadata if they differ from original
        if (value.title !== course.title) metaData.title = value.title;
        if (value.description !== course.description)
          metaData.description = value.description;
        if (value.level !== course.level) metaData.level = value.level;
        if (value.category_id !== course.category_id)
          metaData.category_id = value.category_id;

        metaData.isFree = value.isFree;
        metaData.course_fee = value.isFree ? 0 : value.course_fee;

        // Append files only if selected
        if (value.thumbnail) formData.append('thumbnail', value.thumbnail);
        if (value.intro_video)
          formData.append('intro_video', value.intro_video);

        formData.append('data', JSON.stringify(metaData));

        const res = await courseService.updateCourse(course.id, formData);

        if (res.error) {
          toast.error(res.error.message || 'Update failed', { id: toastId });
          return;
        }

        toast.success('Course updated successfully!', { id: toastId });
        onSuccess();
      } catch (error) {
        toast.error('Update failed', { id: toastId });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4 py-4"
    >
      <form.Field name="title">
        {(field) => (
          <div className="space-y-1">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="w-full border rounded-md p-2 text-sm min-h-[100px]"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="isFree">
          {(field) => (
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
              />
              <label className="text-sm">Is Free Course</label>
            </div>
          )}
        </form.Field>

        <form.Field name="course_fee">
          {(field) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Fee (৳)</label>
              <Input
                type="number"
                value={field.state.value}
                disabled={form.state.values.isFree}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
            </div>
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="level">
          {(field) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Level</label>
              <select
                className="w-full border rounded-md p-2 text-sm"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as any)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          )}
        </form.Field>

        <form.Field name="category_id">
          {(field) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Category</label>
              <select
                className="w-full border rounded-md p-2 text-sm"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t pt-4">
        <form.Field name="thumbnail">
          {(field) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">
                New Thumbnail (Optional)
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  field.handleChange(e.target.files?.[0] || null)
                }
              />
            </div>
          )}
        </form.Field>

        <form.Field name="intro_video">
          {(field) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">
                New Intro Video (Optional)
              </label>
              <Input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  field.handleChange(e.target.files?.[0] || null)
                }
              />
            </div>
          )}
        </form.Field>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        Update Course
      </Button>
    </form>
  );
}
