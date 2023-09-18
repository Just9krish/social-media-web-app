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

export default function Login() {
  const form = useForm<UserLoginInput>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: UserLoginInput) => {
    console.log(data);
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

              <Button type="submit">Submit</Button>
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
