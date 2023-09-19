'use client';

import Image from 'next/image';
import thread from '@/public/assets/thread.svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { UserSignupInput, userSignupSchema } from '@/schema/AuthSchema';
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
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';


export default function Signup() {
  const form = useForm<UserSignupInput>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      username: '',
      confirmPassword: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: UserSignupInput) => {
    try {
      setIsLoading(true);

      const res = await axios.post("/api/auth/signup", data);

      setIsLoading(false);
      toast({
        title: "Signup Success",
        description: res.data.message,
      });
      router.push("/login");

    }
    catch (error) {
      setIsLoading(false);
      console.log(error);
    }
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
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
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
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Re-Enter your passowrd" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading} type="submit">Submit</Button>
            </form>
          </Form>
          <div className="mt-5">
            <p>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
