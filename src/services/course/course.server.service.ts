import { cookies } from 'next/headers';
const API_URL = process.env.API_URL;

export const getCourses = async () => {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${API_URL}/course`, {
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
    console.error('Error fetching courses:', error);
    return { error: { message: 'Failed to fetch courses' } };
  }
};
