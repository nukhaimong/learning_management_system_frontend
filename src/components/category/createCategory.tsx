'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { categoryService } from '@/services/category/category.service';

const categorySchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(30, 'Title is too long'),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function CreateCategoryForm() {
  const form = useForm({
    defaultValues: {
      title: '',
    } as CategoryFormData,

    validators: {
      onSubmit: categorySchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = 'creating-category';
      try {
        toast.loading('Creating category...', { id: toastId });

        const response = await categoryService.createCategory(value.title);

        if (response.error) {
          toast.error(response.error.message || 'Failed to create category', {
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
    <div className="max-w-md p-6 border rounded-xl shadow-sm bg-card">
      <h2 className="text-xl font-bold mb-6">Add New Category</h2>

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
                Category Title
              </label>
              <Input
                type="text"
                placeholder="e.g. Fast Food, Desi, Healthy"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={
                  field.state.meta.errors?.length ? 'border-red-500' : ''
                }
              />
              {field.state.meta.errors?.map((err, i) => (
                <p key={i} className="text-red-500 text-xs mt-1">
                  {/* Accessing message property from the Zod error object */}
                  {typeof err === 'string' ? err : err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <Button
          type="submit"
          className="w-full"
          disabled={form.state.isSubmitting}
        >
          {form.state.isSubmitting ? 'Processing...' : 'Create Category'}
        </Button>
      </form>
    </div>
  );
}
