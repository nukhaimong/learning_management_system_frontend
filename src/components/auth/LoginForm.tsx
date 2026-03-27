'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { authService } from '@/services/auth/auth.service';
import { useRouter } from 'next/navigation';

// Zod schema
const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginFormData,

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: async ({ value }) => {
      console.log('Login Data:', value);
      const toastId = 'logging';
      const { email, password } = value;
      try {
        toast.loading('Loging...', { id: toastId });
        const login = await authService.login(email, password);

        if (login.error && login.error.message === 'Email not verified') {
          toast.dismiss();
          router.push(`/verify-email?email=${encodeURIComponent(email)}`);
          return;
        }
        if (login.error) {
          toast.error(login.error.message || 'hedar error', { id: toastId });
          return;
        }
        // if (login.data.emailVerified !== true) {
        //   toast.dismiss();
        //   router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        //   return;
        // }
        toast.success(login.message, { id: toastId });
        router.push('/');
      } catch (error) {
        console.log('Internal Server Error: ', error);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* EMAIL */}
        <form.Field name="email">
          {(field) => (
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Enter your email"
              />
              {field.state.meta.errors?.map((err, i) => (
                <p key={i} className="text-red-500 text-sm mt-1">
                  {err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        {/* PASSWORD */}
        <form.Field name="password">
          {(field) => (
            <div>
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Enter your password"
              />
              {field.state.meta.errors?.map((err, i) => (
                <p key={i} className="text-red-500 text-sm mt-1">
                  {err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        {/* SUBMIT */}
        <Button
          type="submit"
          className="w-full"
          disabled={form.state.isSubmitting}
        >
          {form.state.isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
