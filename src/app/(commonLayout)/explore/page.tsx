import { getCategories } from '@/services/category/category.server.service';
import { getCourses } from '@/services/course/course.server.service';
import { Category, Course } from '@/types';
import React from 'react';

const Explore = async () => {
  const categoriesData = await getCategories();
  const coursesData = await getCourses();
  const courses: Course[] = coursesData?.data || [];
  const categories: Category[] = categoriesData?.data || [];

  return <div>This is explore page</div>;
};

export default Explore;
