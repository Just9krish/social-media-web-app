'use client';

import Image from 'next/image';
import thread from '@/public/assets/thread.svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { UserLoginInput, userLoginSchema } from '@/schema/AuthSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useTransition } from 'react';

export default function Login() {
  const form = useForm<UserLoginInput>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isLoading, startTransition] = useTransition();

  const onSubmit = (data: UserLoginInput) => {
    startTransition(async () => {
      try {
        const res = await axios.post('/api/auth/login', data);

        toast({
          title: 'Login Success',
          description: res.data.message,
        });
      } catch (error: any) {
        toast({
          title: 'Login Failed',
          description: error.response.data.message || error.message,
        });
      }
    });
  };

  return (
    <section className="bg-background">
      <div className="flex w-screen items-center justify-center h-screen p-4">
        <div className="bg-muted p-6 rounded-md w-full md:w-1/3">
          <div className="flex justify-center">
            <Image src={thread} alt="thread logo" width={28} height={28} />
          </div>
          <h4>Login</h4>
          <p>Welcome back</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading} type="submit">
                Submit
              </Button>
            </form>
          </Form>
          <div className="mt-5">
            <p>
              Don&apos;t have an account? <Link href="/signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
