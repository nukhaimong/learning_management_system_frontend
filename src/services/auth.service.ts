import { error } from 'console';

const API_URL = process.env.API_URL;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

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
  signup: async (payload: SignupPayload) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: { message: data.message || 'Something went wrong' } };
      }
      return data;
    } catch (error) {
      console.error('something went wrong: ', error);
      return { error: { message: 'Internal Server Error' } };
    }
  },
  verifyEmail: async (email: string, otp: string) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: { message: data.message || 'Something went wrong' } };
      }
      return data;
    } catch (error) {
      console.error('something went wrong: ', error);
      return { error: { message: 'Internal Server Error' } };
    }
  },
};
