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

interface CreateLectureFormProps {
  targetLectureId?: string; // If provided, we insert after this ID
  onSuccess?: () => void; // Callback to close popups
}

export default function CreateLectureForm({
  targetLectureId,
  onSuccess,
}: CreateLectureFormProps) {
  const router = useRouter();
  const params = useParams();
  const moduleId = params.module_id as string;

  const form = useForm({
    defaultValues: {
      title: '',
      video_url: null as unknown as File,
    } as LectureFormData,
    validators: {
      onSubmit: lectureSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = 'uploading';
      try {
        toast.loading(
          targetLectureId ? 'Inserting lecture...' : 'Uploading lecture...',
          { id: toastId },
        );

        const formData = new FormData();
        const metaData = {
          title: value.title,
          module_id: moduleId,
        };

        formData.append('data', JSON.stringify(metaData));
        formData.append('video_url', value.video_url);

        // Logic switch: Call insertLecture if targetLectureId exists
        const res = targetLectureId
          ? await courseService.insertLecture(targetLectureId, formData)
          : await courseService.createLecture(formData);

        if (res.error) {
          toast.error(res.error.message || 'Operation failed', { id: toastId });
          return;
        }

        toast.success(
          targetLectureId ? 'Lecture inserted!' : 'Lecture created!',
          { id: toastId },
        );

        form.reset();
        router.refresh();
        if (onSuccess) onSuccess(); // Close the modal/popup
      } catch (error) {
        toast.error('Upload failed', { id: toastId });
      }
    },
  });

  return (
    <div className="w-full max-w-md p-2 bg-card">
      <h2 className="text-xl font-bold mb-6">
        {targetLectureId ? 'Insert New Lecture' : 'Create Lecture'}
      </h2>

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
                placeholder="e.g. Advanced TypeScript Patterns"
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
          {targetLectureId ? 'Insert After' : 'Create Lecture'}
        </Button>
      </form>
    </div>
  );
}
