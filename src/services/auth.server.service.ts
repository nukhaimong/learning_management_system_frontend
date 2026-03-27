import { cookies } from 'next/headers';
const API_URL = process.env.API_URL;

let callCount = 0;

export const getMe = async () => {
  const cookieStore = await cookies();
  callCount++;
  const start = Date.now();
  console.log(`🔵 getMe called #${callCount} at ${new Date().toISOString()}`);
  try {
    const res = await fetch(`${API_URL}/auth/get-me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      cache: 'no-cache',
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        error: {
          message: data.message || 'Something went wrong to get user',
        },
      };
    }
    console.log(`🟢 getMe #${callCount} took ${Date.now() - start}ms`);
    return data;
  } catch (error) {
    console.error('Internal Server Error: ', error);
    return { error: { message: 'Internal Server Error: ', error } };
  }
};
