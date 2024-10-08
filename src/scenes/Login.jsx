import React, { useState } from 'react';
import Authservice from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slice/authSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().email({ message: 'Provide a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

function Login() {
  const form =
    useForm <
    z.infer <
    typeof formSchema >>
      {
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: '',
          password: '',
        },
      };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const create_session = async (data) => {
    setError('');
    try {
      const session = await Authservice.login(data);
      if (session) {
        const userData = await Authservice.getAccount();
        if (userData) {
          dispatch(login({ userData }));
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]"></span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(create_session)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="UserEmail" {...field} />
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
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Login</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
export default Login;
