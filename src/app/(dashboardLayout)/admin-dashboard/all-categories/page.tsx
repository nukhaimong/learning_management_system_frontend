'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { EditCategoryModal } from '@/components/category/editCategoryModal';
import { DeleteCategoryModal } from '@/components/category/deleteCategoryModal';
import { categoryService } from '@/services/category/category.service';

interface Category {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

const AllCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getCategories();
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Manage Categories
          </h2>
          <Badge variant="secondary" className="px-3 py-1">
            Loading...
          </Badge>
        </div>
        <div className="p-8 text-center text-muted-foreground">
          Loading categories...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Manage Categories
          </h2>
          <Badge variant="secondary" className="px-3 py-1">
            {categories?.length} Total
          </Badge>
        </div>

        <div className="p-0">
          <Table>
            <TableCaption className="pb-4">
              A list of categories for your Learning Management System App.
            </TableCaption>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[80px] text-center">#</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.length > 0 ? (
                categories?.map((category, index) => (
                  <TableRow
                    key={category.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <TableCell className="text-center font-medium text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-foreground">
                        {category.title}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(category.createdAt).toLocaleDateString(
                        'en-GB',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        },
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6 space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600"
                        onClick={() =>
                          setEditingCategory({
                            id: category.id,
                            title: category.title,
                          })
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600"
                        onClick={() =>
                          setDeletingCategory({
                            id: category.id,
                            title: category.title,
                          })
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No categories found. Start by adding one!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          isOpen={!!editingCategory}
          onClose={() => setEditingCategory(null)}
          onSuccess={handleRefresh}
        />
      )}

      {/* Delete Modal */}
      {deletingCategory && (
        <DeleteCategoryModal
          categoryId={deletingCategory.id}
          categoryTitle={deletingCategory.title}
          isOpen={!!deletingCategory}
          onClose={() => setDeletingCategory(null)}
          onSuccess={handleRefresh}
        />
      )}
    </>
  );
};

export default AllCategories;
