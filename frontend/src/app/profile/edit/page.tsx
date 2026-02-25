'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Pencil, Save, Info } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileSchema, type EditProfileValues } from '@/lib/validation';

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, hydrated } = useAppSelector((s) => s.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditProfileValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (hydrated && !user) {
      router.replace('/login');
    }
  }, [hydrated, user, router]);

  useEffect(() => {
    reset({
      username: user?.username || '',
      email: user?.email || '',
    });
  }, [user?.username, user?.email, reset]);

  if (!hydrated) return null;
  if (!user) return null;

  return (
    <div className='relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/25 bg-white/20 p-4 backdrop-blur-xl sm:p-6'>
      <motion.div
        aria-hidden
        className='pointer-events-none absolute -inset-24 opacity-70'
        animate={{ rotate: [0, -8, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(closest-side, rgba(245,158,11,0.18), transparent 70%), radial-gradient(closest-side, rgba(236,72,153,0.20), transparent 70%), radial-gradient(closest-side, rgba(99,102,241,0.20), transparent 70%)',
        }}
      />

      <div className='relative mx-auto max-w-3xl space-y-4'>
        <Link
          href='/profile'
          className='inline-flex items-center gap-2 text-sm font-extrabold text-indigo-700'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to profile
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className='rounded-3xl border border-white/30 bg-white/35 p-6 shadow-sm backdrop-blur-xl sm:p-8'
        >
          <div className='flex items-start justify-between gap-4'>
            <div className='min-w-0'>
              <div className='inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/40 px-3 py-1 text-xs font-extrabold text-indigo-950'>
                <Pencil className='h-4 w-4 text-fuchsia-700' />
                Edit Profile
              </div>
              <h1 className='mt-4 text-4xl font-extrabold tracking-tight text-indigo-950'>
                Update your info
              </h1>
              <p className='mt-2 text-sm font-semibold text-indigo-950/80'>
                This is a UI placeholder. You can connect it to your backend
                update endpoint later.
              </p>
            </div>
          </div>

          <div className='mt-6 rounded-2xl border border-white/35 bg-white/40 p-4 text-sm font-semibold text-indigo-950/80'>
            <div className='flex items-start gap-2'>
              <Info className='mt-0.5 h-4 w-4 text-fuchsia-700' />
              <div>
                Saving is not wired to the backend yet. When you create the
                update endpoint, we can connect this form in minutes.
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(async () => {
              toast(
                'Edit profile request is ready. Backend endpoint is not connected yet.',
                {
                  title: 'Not wired yet',
                  variant: 'info',
                },
              );
            })}
            className='mt-6 space-y-4'
          >
            <div>
              <label className='mb-2 block text-sm font-extrabold text-indigo-950/80'>
                Username
              </label>
              <Input
                placeholder='Your name'
                {...register('username')}
              />
              {errors.username?.message && (
                <div className='mt-2 text-sm font-semibold text-rose-700'>
                  {errors.username.message}
                </div>
              )}
            </div>

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

            <Button
              type='submit'
              className='w-full'
              size='lg'
              disabled={isSubmitting}
            >
              <span className='inline-flex items-center gap-2'>
                <Save className='h-4 w-4' />
                {isSubmitting ? 'Saving...' : 'Save changes'}
              </span>
            </Button>
          </form>
        </motion.section>
      </div>
    </div>
  );
}
