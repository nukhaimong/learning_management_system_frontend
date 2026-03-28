import { Routes } from '@/types/routes.type';

export const LearnerRoutes: Routes[] = [
  {
    title: 'My Learning',
    items: [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'All Enrollments',
        url: '/dashboard/all-enrollments',
      },
    ],
  },
];
export const adminRoutes: Routes[] = [
  {
    title: 'Manage Application',
    items: [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Create Category',
        url: '/admin-dashboard/create-category',
      },
      {
        title: 'See all categories',
        url: '/admin-dashboard/all-categories',
      },
    ],
  },
];
export const instructorRoutes: Routes[] = [
  {
    title: 'Manage Course',
    items: [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'create course',
        url: '/instructor-dashboard/create-course',
      },
      {
        title: 'all courses',
        url: '/instructor-dashboard/all-courses',
      },
    ],
  },
];
