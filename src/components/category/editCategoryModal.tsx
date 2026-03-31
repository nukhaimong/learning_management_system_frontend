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

interface EditCategoryModalProps {
  category: { id: string; title: string };
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditCategoryModal({
  category,
  isOpen,
  onClose,
  onSuccess,
}: EditCategoryModalProps) {
  const form = useForm({
    defaultValues: {
      title: category.title,
    } as CategoryFormData,

    validators: {
      onSubmit: categorySchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = 'updating-category';
      try {
        toast.loading('Updating category...', { id: toastId });

        const response = await categoryService.updateCategory(
          category.id,
          value.title,
        );

        if (response.error) {
          toast.error(response.error.message || 'Failed to update category', {
            id: toastId,
          });
          return;
        }

        toast.success(response.message, { id: toastId });
        onSuccess();
        onClose();
      } catch (error) {
        console.error('Internal Server Error: ', error);
        toast.error('An unexpected error occurred', { id: toastId });
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-w-md w-full mx-4">
        <div className="bg-card border rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Edit Category</h2>

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
                      {typeof err === 'string' ? err : err?.message}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={form.state.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={form.state.isSubmitting}
              >
                {form.state.isSubmitting ? 'Updating...' : 'Update Category'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
