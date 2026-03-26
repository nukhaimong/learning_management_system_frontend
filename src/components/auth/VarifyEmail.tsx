'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';

// Zod validation schema
const verifyEmailSchema = z.object({
  email: z.email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get('email') || '';

  const form = useForm({
    defaultValues: {
      email: emailFromQuery, // pre-fill email
      otp: '',
    } as VerifyEmailFormData,
    validators: {
      onSubmit: verifyEmailSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = 'verifying';
      try {
        toast.loading('Verifying email...', { id: toastId });
        const verify = await authService.verifyEmail(value.email, value.otp);

        if (verify.error) {
          toast.error(verify.error.message || 'Verification failed', {
            id: toastId,
          });
          return;
        }

        toast.success(verify.message, { id: toastId });
        router.push('/');
      } catch (error) {
        console.error('Verification error:', error);
        toast.error('Internal Server Error', { id: toastId });
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Verify Email</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* EMAIL FIELD */}
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
                disabled // optional: prevent changing email
              />
              {field.state.meta.errors?.map((err, i) => (
                <p key={i} className="text-red-500 text-sm mt-1">
                  {err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        {/* OTP FIELD */}
        <form.Field name="otp">
          {(field) => (
            <div>
              <label className="text-sm font-medium">OTP</label>
              <Input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Enter 6-digit OTP"
              />
              {field.state.meta.errors?.map((err, i) => (
                <p key={i} className="text-red-500 text-sm mt-1">
                  {err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          className="w-full"
          disabled={form.state.isSubmitting}
        >
          {form.state.isSubmitting ? 'Verifying...' : 'Verify Email'}
        </Button>
      </form>
    </div>
  );
}
