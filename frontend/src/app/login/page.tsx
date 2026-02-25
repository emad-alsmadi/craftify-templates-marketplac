'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearAuthError, loginThunk } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginValues } from '@/lib/validation';
import { useToast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { loading, error, user, hydrated } = useAppSelector((s) => s.auth);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const onSubmit = handleSubmit(async (values) => {
    dispatch(clearAuthError());
    const res = await dispatch(loginThunk(values));
    if ((res as any)?.meta?.requestStatus === 'fulfilled') {
      toast('Logged in successfully.', {
        title: 'Success',
        variant: 'success',
      });
      router.push('/welcome');
    }
  });

  return (
    <div className='relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/25 bg-white/20 p-4 backdrop-blur-xl sm:p-6'>
      <motion.div
        aria-hidden
        className='pointer-events-none absolute -inset-24 opacity-70'
        animate={{ rotate: [0, 8, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(closest-side, rgba(236,72,153,0.25), transparent 70%), radial-gradient(closest-side, rgba(99,102,241,0.25), transparent 70%), radial-gradient(closest-side, rgba(34,211,238,0.20), transparent 70%)',
        }}
      />

      <div className='relative grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className='hidden overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-fuchsia-600/80 via-indigo-600/80 to-cyan-500/80 p-10 text-white shadow-sm lg:block'
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className='inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold'>
              <Sparkles className='h-4 w-4' />
              Welcome back
            </div>
            <h1 className='mt-4 text-4xl font-extrabold tracking-tight'>
              Sign in to your account
            </h1>
            <p className='mt-3 text-sm text-white/90'>
              Access your profile and continue exploring books with a modern
              experience.
            </p>

            <div className='mt-8 grid gap-3'>
              {[
                'Animated, vibrant UI with smooth transitions',
                'Catalog filters, pagination and detail pages',
                'Auth flows ready to plug into your backend',
              ].map((t) => (
                <div
                  key={t}
                  className='rounded-2xl bg-white/12 p-4 text-sm font-semibold'
                >
                  {t}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.05 }}
          className='rounded-3xl border border-white/30 bg-white/35 p-6 shadow-sm backdrop-blur-xl sm:p-8'
        >
          <div className='flex items-start justify-between gap-3'>
            <div>
              <div className='text-2xl font-extrabold tracking-tight text-indigo-950'>
                Login
              </div>
              <div className='mt-1 text-sm font-semibold text-indigo-950/80'>
                Enter your credentials to continue.
              </div>
            </div>
            {hydrated && user && (
              <div className='rounded-full border border-white/35 bg-emerald-500/15 px-3 py-1 text-xs font-extrabold text-emerald-900'>
                Signed
              </div>
            )}
          </div>

          <form
            onSubmit={onSubmit}
            className='mt-6 space-y-4'
          >
            <div>
              <label className='mb-2 block text-sm font-extrabold text-indigo-950/80'>
                Email
              </label>
              <Input
                type='email'
                placeholder='you@example.com'
                {...register('email')}
              />
              {errors.email?.message && (
                <div className='mt-2 text-sm font-semibold text-rose-700'>
                  {errors.email.message}
                </div>
              )}
            </div>
            <div>
              <label className='mb-2 block text-sm font-extrabold text-indigo-950/80'>
                Password
              </label>
              <Input
                type='password'
                placeholder='••••••••'
                {...register('password')}
              />
              {errors.password?.message && (
                <div className='mt-2 text-sm font-semibold text-rose-700'>
                  {errors.password.message}
                </div>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className='rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-sm font-semibold text-rose-900'
              >
                {error}
              </motion.div>
            )}

            <Button
              type='submit'
              className='w-full'
              disabled={loading || isSubmitting}
            >
              {loading || isSubmitting ? (
                <span className='inline-flex items-center gap-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </Button>

            <div className='flex items-center justify-between text-sm'>
              <Link
                className='font-extrabold text-indigo-700 hover:underline'
                href='/signup'
              >
                Create account
              </Link>
              <Link
                className='font-extrabold text-fuchsia-700 hover:underline'
                href='/password/forgot-password'
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </motion.section>
      </div>
    </div>
  );
}
