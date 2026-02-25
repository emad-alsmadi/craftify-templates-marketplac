'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { navItems, Navbar } from '@/components/navigation/Navbar';
import { cn } from '@/lib/utils';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading, hydrated } = useAppSelector((s) => s.auth);

  return (
    <div className='min-h-screen bg-[radial-gradient(1100px_500px_at_10%_0%,rgba(245,158,11,0.22),transparent_55%),radial-gradient(1000px_460px_at_95%_15%,rgba(217,70,239,0.20),transparent_55%),radial-gradient(900px_520px_at_40%_120%,rgba(34,211,238,0.22),transparent_55%)]'>
      <Navbar />

      <div className='mx-auto max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8'>
        <main className='min-w-0 pb-20 md:pb-0'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className='min-w-0'
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <nav className='fixed inset-x-0 bottom-0 z-50 border-t border-white/30 bg-white/65 backdrop-blur-xl md:hidden'>
        <div className='mx-auto flex max-w-7xl items-center justify-around px-2 py-2'>
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold',
                  active ? 'text-fuchsia-700' : 'text-indigo-700/70',
                )}
              >
                <Icon className={cn('h-5 w-5', active && 'text-fuchsia-700')} />
                {item.label}
              </Link>
            );
          })}

          {!hydrated || !user ? (
            <Link
              href='/login'
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold',
                pathname === '/login'
                  ? 'text-fuchsia-700'
                  : 'text-indigo-700/70',
              )}
            >
              <LogIn
                className={cn(
                  'h-5 w-5',
                  pathname === '/login' && 'text-fuchsia-700',
                )}
              />
              Login
            </Link>
          ) : (
            <>
              <Link
                href='/profile'
                className={cn(
                  'flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold',
                  pathname === '/profile'
                    ? 'text-fuchsia-700'
                    : 'text-indigo-700/70',
                )}
              >
                {loading && !user ? (
                  <span className='inline-flex h-5 w-5 animate-pulse rounded-full bg-indigo-900/20' />
                ) : (
                  <User
                    className={cn(
                      'h-5 w-5',
                      pathname === '/profile' && 'text-fuchsia-700',
                    )}
                  />
                )}
                {user?.username || 'Profile'}
              </Link>
              <button
                type='button'
                onClick={() => {
                  dispatch(logout());
                  router.push('/');
                }}
                className='flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-indigo-700/70'
              >
                <LogOut className='h-5 w-5' />
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
