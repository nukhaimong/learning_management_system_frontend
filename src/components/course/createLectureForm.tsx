// app/courses/[id]/modules/[module_id]/CreateLectureForm.tsx
'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { courseService } from '@/services/course/course.service';

const lectureSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  video_url: z.instanceof(File, { message: 'Video file is required' }),
});

type LectureFormData = z.infer<typeof lectureSchema>;

export default function CreateLectureForm() {
  const router = useRouter();
  const params = useParams();
  const moduleId = params.module_id as string;

  const form = useForm({
    defaultValues: {
      title: '',
      video_url: null as unknown as File,
    } as LectureFormData,
    validators: {
      onSubmit: lectureSchema as any,
    },
    onSubmit: async ({ value }) => {
      const toastId = 'uploading';
      try {
        toast.loading('Uploading lecture...', { id: toastId });

        const formData = new FormData();
        const metaData = {
          title: value.title,
          module_id: moduleId,
        };
        formData.append('data', JSON.stringify(metaData));
        formData.append('video_url', value.video_url);

        const res = await courseService.createLecture(formData);

        if (res.error) {
          toast.error(res.error.message || 'Upload failed', { id: toastId });
          return;
        }

        toast.success('Lecture created successfully!', { id: toastId });
        form.reset();
        router.refresh();
      } catch (error) {
        toast.error('Upload failed', { id: toastId });
      }
    },
  });

  return (
    <div className="max-w-md p-6 border rounded-xl shadow-sm bg-card">
      <h2 className="text-xl font-bold mb-6">Create Lecture</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field name="title">
          {(field) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Lecture Title</label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter lecture title"
              />
              {field.state.meta.errors?.map((err, i) => (
                <p key={i} className="text-red-500 text-xs">
                  {err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Field name="video_url">
          {(field) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">Video File</label>
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

        <Button type="submit" className="w-full">
          Create Lecture
        </Button>
      </form>
    </div>
  );
}
