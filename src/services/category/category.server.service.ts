import { cookies } from 'next/headers';
const API_URL = process.env.API_URL;

export const getCategories = async () => {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_URL}/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      cache: 'no-cache',
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: { message: data.message } };
    }
    return data;
  } catch (error) {
    return { error: { message: 'Internal Server Error' } };
  }
};
