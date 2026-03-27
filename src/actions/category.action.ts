import { categoryService } from '@/services/category/category.service';

export const createCategory = async (title: string) => {
  return categoryService.createCategory(title);
};
