import { cookies } from 'next/headers';
const API_URL = process.env.API_URL;

export const getCourses = async (searchTerm?: string) => {
  const cookieStore = await cookies();
  try {
    const response = await fetch(
      `${API_URL}/course${searchTerm ? `?searchTerm=${searchTerm}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        next: { revalidate: 60 },
        cache: 'no-cache',
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return { error: { message: data.message } };
    }

    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return { error: { message: 'Failed to fetch courses' } };
  }
};
export const getCourseById = async (course_id: string) => {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${API_URL}/course/${course_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      cache: 'no-cache',
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: { message: data.message } };
    }

    return data;
  } catch (error) {
    console.error('Error fetching course:', error);
    return { error: { message: 'Failed to fetch course' } };
  }
};
export const getModules = async (course_id: string) => {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${API_URL}/module/${course_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      next: {
        tags: ['modules'],
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: { message: data.message } };
    }

    return data;
  } catch (error) {
    console.error('Error fetching modules:', error);
    return { error: { message: 'Failed to fetch modules' } };
  }
};

export const getLectures = async (module_id: string) => {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${API_URL}/lecture/${module_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      next: {
        tags: ['modules'],
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: { message: data.message } };
    }

    return data;
  } catch (error) {
    console.error('Error fetching modules:', error);
    return { error: { message: 'Failed to fetch modules' } };
  }
};
