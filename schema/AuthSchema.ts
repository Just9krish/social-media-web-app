import { z } from 'zod';

export const userLoginSchema = z.object({
  email: z
    .string({ required_error: 'Email is Required' })
    .email({ message: 'Email must be a valid email' }),
  password: z
    .string({ required_error: 'Password is Required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export type UserLoginInput = z.infer<typeof userLoginSchema>;

export const userSignupSchema = z
  .object({
    email: z.string().email({ message: 'Email must be a valid email' }),
    name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type UserSignupInput = z.infer<typeof userSignupSchema>;
