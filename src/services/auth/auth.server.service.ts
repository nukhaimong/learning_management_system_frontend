import { cookies } from 'next/headers';
const API_URL = process.env.API_URL;

export const getMe = async () => {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_URL}/auth/get-me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      cache: 'no-store',
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        error: {
          message: data.message || 'Something went wrong to get user',
        },
      };
    }

    return data;
  } catch (error) {
    console.error('Internal Server Error: ', error);
    return { error: { message: 'Internal Server Error: ', error } };
  }
};
