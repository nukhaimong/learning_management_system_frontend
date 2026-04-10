import { cookies } from 'next/headers';
const API_URL = process.env.API_URL;

export const getMe = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('better-auth.session_token')?.value;

  try {
    const res = await fetch(`${API_URL}/auth/get-me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    return await res.json();
  } catch (error) {
    return { error: { message: 'Network error' } };
  }
};
