'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { courseService } from '@/services/course/course.service';

const moduleSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title is too long'),
});

type ModuleFormData = z.infer<typeof moduleSchema>;

export default function CreateModuleForm() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.course_id as string;

  const form = useForm({
    defaultValues: {
      title: '',
    } as ModuleFormData,

    validators: {
      onSubmit: moduleSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = 'creating-module';

      try {
        toast.loading('Creating module...', { id: toastId });

        const res = await courseService.createModule(courseId, value.title);

        if (res.error) {
          toast.error(res.error.message || 'Failed to create module', {
            id: toastId,
          });
          return;
        }

        toast.success(res.message, { id: toastId });
        form.reset();
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('Unexpected error', { id: toastId });
      }
    },
  });

  return (
    <div className="max-w-md p-6 border rounded-xl shadow-sm bg-card">
      <h2 className="text-xl font-bold mb-6">Create Module</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field name="title">
          {(field) => (
            <div>
              <label className="text-sm font-medium mb-1 block">
                Module Title
              </label>

              <Input
                type="text"
                placeholder="e.g. Introduction"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={
                  field.state.meta.errors?.length ? 'border-red-500' : ''
                }
              />

              {field.state.meta.errors?.map((err, i) => (
                <p key={i} className="text-red-500 text-xs mt-1">
                  {typeof err === 'string' ? err : err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <Button type="submit" className="w-full">
          {form.state.isSubmitting ? 'Creating...' : 'Create Module'}
        </Button>
      </form>
    </div>
  );
}
