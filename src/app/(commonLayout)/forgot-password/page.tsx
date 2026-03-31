'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '@/services/auth/auth.service';
import Link from 'next/link';

const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
    } as ForgotPasswordFormData,

    validators: {
      onSubmit: forgotPasswordSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = 'forgot-password';
      try {
        setIsSubmitting(true);
        toast.loading('Sending OTP...', { id: toastId });

        const response = await authService.forgotPassword(value.email);

        if (response.error) {
          toast.error(response.error.message || 'Failed to send OTP', {
            id: toastId,
          });
          return;
        }

        toast.success('OTP sent successfully! Check your email.', {
          id: toastId,
        });

        // Redirect to reset password page with email
        router.push(`/reset-password?email=${encodeURIComponent(value.email)}`);
      } catch (error) {
        console.error('Forgot password error:', error);
        toast.error('An unexpected error occurred', { id: toastId });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email address and we'll send you a verification code to
            reset your password.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="email" className="mb-2">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isSubmitting}
                  className={
                    field.state.meta.errors?.length ? 'border-red-500' : ''
                  }
                />
                {field.state.meta.errors?.map((err, i) => (
                  <p key={i} className="text-red-500 text-xs">
                    {typeof err === 'string' ? err : err?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

          <Button
            type="submit"
            className="w-full gap-2"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending OTP...
              </>
            ) : (
              <>
                Get OTP
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
