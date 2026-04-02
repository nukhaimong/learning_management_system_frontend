'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { courseService } from '@/services/course/course.service';
const reviewSchema = z.object({
  content: z
    .string()
    .min(10, 'Review must be at least 10 characters')
    .max(500, 'Review is too long'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  courseId: string;
}

export function ReviewForm({ courseId }: ReviewFormProps) {
  const form = useForm({
    defaultValues: {
      content: '',
    } as ReviewFormData,

    validators: {
      onSubmit: reviewSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = 'submitting-review';
      try {
        toast.loading('Submitting review...', { id: toastId });

        const response = await courseService.createReviews(
          courseId,
          value.content,
        );

        if (response.error) {
          toast.error(response.error.message || 'Failed to submit review', {
            id: toastId,
          });
          return;
        }

        toast.success(response.message, { id: toastId });
        form.reset();
      } catch (error) {
        console.error('Internal Server Error: ', error);
        toast.error('An unexpected error occurred', { id: toastId });
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
      className="space-y-4"
    >
      <form.Field name="content">
        {(field) => (
          <div>
            <label className="text-3xl font-medium mb-1 block">
              Your Review
            </label>
            <textarea
              placeholder="Write your review..."
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                field.state.meta.errors?.length
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {field.state.meta.errors?.map((err, i) => (
              <p key={i} className="text-red-500 text-xs mt-1">
                {typeof err === 'string' ? err : err?.message}
              </p>
            ))}
          </div>
        )}
      </form.Field>

      <button
        type="submit"
        disabled={form.state.isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 w-full"
      >
        {form.state.isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
