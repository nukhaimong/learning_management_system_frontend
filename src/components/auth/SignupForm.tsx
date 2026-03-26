'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Zod schema
const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['Learner', 'Instructor']),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'Learner',
    } as SignupFormData,

    validators: {
      onSubmit: signupSchema,
    },

    onSubmit: async ({ value }) => {
      console.log('Signup Data:', value);
      // 👉 Call your backend API here
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* NAME */}
        <form.Field name="name">
          {(field) => (
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Enter your name"
              />
              {field.state.meta.errors?.map((err, i) => (
                <p key={i} className="text-red-500 text-sm mt-1">
                  {err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

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

        {/* ROLE */}
        <form.Field name="role">
          {(field) => (
            <div>
              <label className="text-sm font-medium">Role</label>
              <select
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value as 'Learner' | 'Instructor')
                }
                className="w-full mt-1 border rounded-md p-2 bg-background"
              >
                <option value="Learner">Learner</option>
                <option value="Instructor">Instructor</option>
              </select>
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
          {form.state.isSubmitting ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
}
