'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { courseService } from '@/services/course/course.service';
import { categoryService } from '@/services/category/category.service';
import { useEffect, useState } from 'react';

const courseSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  thumbnail: z.instanceof(File, { message: 'Thumbnail image is required' }),
  intro_video: z.instanceof(File, { message: 'Intro video is required' }),
  course_fee: z.number().min(0, 'Fee cannot be negative'),
  isFree: z.boolean(),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  category_id: z.uuid('category must be a uuid').min(1, 'Category is required'),
});

export default function CreateCourseForm() {
  const [categories, setCategories] = useState<{ id: string; title: string }[]>(
    [],
  );
  const fetchCategories = async () => {
    const categoriesData = await categoryService.getCategories();
    const formattedData = categoriesData.data.map(
      (item: { id: string; title: string }) => ({
        id: item.id,
        title: item.title,
      }),
    );
    setCategories(formattedData);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      thumbnail: null as unknown as File,
      intro_video: null as unknown as File,
      course_fee: 0,
      isFree: false,
      level: 'Beginner' as const,
      category_id: '',
    },
    validators: {
      onSubmit: courseSchema as any,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      const toastId = 'uploading';
      try {
        toast.loading('Uploading assets and creating course...', {
          id: toastId,
        });

        const formData = new FormData();
        formData.append('thumbnail', value.thumbnail);
        formData.append('intro_video', value.intro_video);

        const metaData = {
          title: value.title,
          description: value.description,
          course_fee: value.isFree ? 0 : value.course_fee,
          isFree: value.isFree,
          level: value.level,
          category_id: value.category_id,
        };

        formData.append('data', JSON.stringify(metaData));

        const res = await courseService.createCourse(formData);
        if (res.error) {
          toast.error(res.error.message || 'Upload failed', { id: toastId });
          return;
        }

        toast.success('Course created successfully!', { id: toastId });
        form.reset();
      } catch (error) {
        toast.error('Upload failed', { id: toastId });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <form.Field name="title">
        {(field) => (
          <div className="space-y-1">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter course title"
            />
            {field.state.meta.errors?.map((err, i) => (
              <p key={i} className="text-red-500 text-xs">
                {err?.message}
              </p>
            ))}
          </div>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="w-full border rounded-md p-2"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter course description"
            />
            {field.state.meta.errors?.map((err, i) => (
              <p key={i} className="text-red-500 text-xs">
                {err?.message}
              </p>
            ))}
          </div>
        )}
      </form.Field>

      <form.Field name="isFree">
        {(field) => (
          <div className="flex items-center gap-2">
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
            <label className="text-sm font-medium">Course Fee</label>
            <Input
              type="number"
              value={field.state.value === 0 ? '' : field.state.value}
              onChange={(e) => {
                const val = e.target.value;

                // allow empty input
                if (val === '') {
                  field.handleChange(0);
                  return;
                }
                const cleaned = String(Number(val));
                field.handleChange(Number(cleaned));
              }}
              disabled={form.state.values.isFree}
            />
            {field.state.meta.errors?.map((err, i) => (
              <p key={i} className="text-red-500 text-xs">
                {err?.message}
              </p>
            ))}
          </div>
        )}
      </form.Field>

      <form.Field name="level">
        {(field) => (
          <div className="space-y-1">
            <label className="text-sm font-medium">Level</label>
            <select
              className="w-full border rounded-md p-2"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* THUMBNAIL FILE UPLOAD */}
        <form.Field name="thumbnail">
          {(field) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Thumbnail Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) field.handleChange(file);
                }}
              />
              {field.state.meta.errors?.map((err, i) => (
                <p key={i} className="text-red-500 text-xs">
                  {err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        {/* VIDEO FILE UPLOAD */}
        <form.Field name="intro_video">
          {(field) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Intro Video</label>
              <Input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) field.handleChange(file);
                }}
              />
              {field.state.meta.errors?.map((err, i) => (
                <p key={i} className="text-red-500 text-xs">
                  {err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>
        <form.Field name="category_id">
          {(field) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Category</label>
              <select
                className="w-full border rounded-md p-2"
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

              {field.state.meta.errors?.map((err, i) => (
                <p key={i} className="text-red-500 text-xs">
                  {err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>
      </div>
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Create Course
      </button>
    </form>
  );
}
