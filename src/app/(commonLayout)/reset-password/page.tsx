'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, Shield, Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '@/services/auth/auth.service';
import Link from 'next/link';

const resetPasswordSchema = z
  .object({
    otp: z.string().min(6, 'OTP must be at least 6 characters'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!email) {
      toast.error('No email provided. Please request OTP again.');
      router.push('/forgot-password');
    }
  }, [email, router]);

  const form = useForm({
    defaultValues: {
      otp: '',
      newPassword: '',
      confirmPassword: '',
    } as ResetPasswordFormData,

    validators: {
      onSubmit: resetPasswordSchema,
    },

    onSubmit: async ({ value }) => {
      if (!email) {
        toast.error('Email is required');
        return;
      }

      const toastId = 'reset-password';
      try {
        setIsSubmitting(true);
        toast.loading('Resetting password...', { id: toastId });

        const response = await authService.resetPassword(
          email,
          value.otp,
          value.newPassword,
        );

        if (response.error) {
          toast.error(response.error.message || 'Failed to reset password', {
            id: toastId,
          });
          return;
        }

        toast.success(
          'Password reset successfully! Please login with your new password.',
          {
            id: toastId,
          },
        );

        // Redirect to login page after success
        router.push('/login');
      } catch (error) {
        console.error('Reset password error:', error);
        toast.error('An unexpected error occurred', { id: toastId });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  if (!email) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
          <p className="text-muted-foreground text-sm">
            Enter the OTP sent to <span className="font-semibold">{email}</span>{' '}
            and create a new password.
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
          {/* OTP Field */}
          <form.Field name="otp">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code (OTP)</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
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

          {/* New Password Field */}
          <form.Field name="newPassword">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isSubmitting}
                    className={
                      field.state.meta.errors?.length ? 'border-red-500' : ''
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {field.state.meta.errors?.map((err, i) => (
                  <p key={i} className="text-red-500 text-xs">
                    {typeof err === 'string' ? err : err?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

          {/* Confirm Password Field */}
          <form.Field name="confirmPassword">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isSubmitting}
                    className={
                      field.state.meta.errors?.length ? 'border-red-500' : ''
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
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
                Resetting Password...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Reset Password
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Didn't receive OTP? Request again
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
