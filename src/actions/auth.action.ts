'use server';

import { authService } from '@/services/auth/auth.service';

export const loginAction = async (email: string, password: string) => {
  return await authService.login(email, password);
};
