'use server';

import { authService } from '@/services/auth.service';
import { Exo } from 'next/font/google';

export const loginAction = async (email: string, password: string) => {
  return await authService.login(email, password);
};
