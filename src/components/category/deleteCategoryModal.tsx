'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { categoryService } from '@/services/category/category.service';

interface DeleteCategoryModalProps {
  categoryId: string;
  categoryTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteCategoryModal({
  categoryId,
  categoryTitle,
  isOpen,
  onClose,
  onSuccess,
}: DeleteCategoryModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const toastId = 'deleting-category';
    try {
      setIsDeleting(true);
      toast.loading('Deleting category...', { id: toastId });

      const response = await categoryService.deleteCategory(categoryId);

      if (response.error) {
        toast.error(response.error.message || 'Failed to delete category', {
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
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-w-md w-full mx-4">
        <div className="bg-card border rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Delete Category</h2>
          <p className="text-muted-foreground mb-6">
            Are you sure you want to delete category{' '}
            <span className="font-semibold text-foreground">
              "{categoryTitle}"
            </span>
            ? This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="flex-1"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Category'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
