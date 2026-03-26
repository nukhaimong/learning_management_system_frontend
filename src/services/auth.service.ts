const API_URL = process.env.API_URL;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: { message: data.message || 'something went wrong' } };
      }
      return data;
    } catch (error) {
      console.error('something went wrong: ', error);
      return { error: { message: 'Internal Server Error' } };
    }
  },
};
