const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
import { SignupPayload } from '@/types';
import Cookies from 'js-cookie';

export const authService = {
  // login: async (email: string, password: string) => {
  //   try {
  //     const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify({
  //         email,
  //         password,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       return { error: { message: data.message || 'something went wrong' } };
  //     }
  //     return data;
  //   } catch (error) {
  //     console.error('something went wrong: ', error);
  //     return { error: { message: 'Internal Server Error' } };
  //   }
  // },
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

      const result = await res.json();

      if (!res.ok) {
        return { error: { message: result.message || 'Something went wrong' } };
      }

      if (res.ok && result.data.token) {
        Cookies.set('better-auth.session_token', result.data.token, {
          expires: 7, // 7 days
          secure: true,
          sameSite: 'none',
          path: '/',
        });
      }

      return result;
    } catch (error) {
      console.error('something went wrong: ', error);
      return { error: { message: 'Internal Server Error' } };
    }
  },
  getMe: async () => {
    const token = Cookies.get('better-auth.session_token');
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/get-me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
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
      return data;
    } catch (error) {
      console.error('Internal Server Error: ', error);
      return { error: { message: 'Internal Server Error: ', error } };
    }
  },
  forgotPassword: async (email: string) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
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
  resetPassword: async (email: string, otp: string, newPassword: string) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword }),
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
  login: async (email: string, password: string) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        return { error: { message: result.message || 'Something went wrong' } };
      }

      if (res.ok && result.data.token) {
        Cookies.set('better-auth.session_token', result.data.token, {
          expires: 7, // 7 days
          secure: true,
          sameSite: 'none',
          path: '/',
        });
      }

      return result;
    } catch (error) {
      console.error('Login error:', error);
    }
  },
};
