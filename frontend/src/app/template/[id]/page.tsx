'use client';

import { useParams, useRouter } from 'next/navigation';
import { Book } from '@/types';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import {
  Loader2,
  ArrowLeft,
  Sparkles,
  User,
  Globe,
  Calendar,
  Tag,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useBookById } from '@/lib/booksQuery';
import { useCart } from '@/lib/cartStore';

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const cart = useCart();

  const id = params.id as string | undefined;
  const bookQuery = useBookById(id);
  const book: Book | null = bookQuery.data || null;
  const loading = bookQuery.isLoading;
  const error = (bookQuery.error as any)?.message || null;

  if (loading) {
    return (
      <div className='flex items-center justify-center rounded-3xl border border-white/40 bg-white/50 p-12 shadow-sm backdrop-blur-xl'>
        <Loader2 className='h-7 w-7 animate-spin text-fuchsia-600' />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className='space-y-4'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-sm font-extrabold text-indigo-700'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to Templates
        </Link>
        <div className='rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-900'>
          <div className='text-lg font-extrabold'>Template Not Found</div>
          <div className='mt-2 text-sm font-semibold'>
            {error || "Sorry, we couldn't find this template."}
          </div>
        </div>
      </div>
    );
  }

  const authorName =
    typeof book.author === 'string' ? book.author : book.author.name;
  const authorCountry =
    typeof book.author === 'string' ? null : book.author.country || null;
  const authorBio =
    typeof book.author === 'string' ? null : book.author.bio || null;

  const handleAddToCart = () => {
    cart.addToCart({
      bookId: book._id,
      title: book.title,
      price: book.price,
      cover: book.cover,
      qty: 1,
    });
    toast('Added to cart.', {
      title: 'Cart',
      variant: 'success',
    });
  };

  return (
    <div className='relative overflow-hidden rounded-3xl border border-white/25 bg-white/20 p-4 backdrop-blur-xl sm:p-6'>
      <motion.div
        aria-hidden
        className='pointer-events-none absolute -inset-24 opacity-70'
        animate={{ rotate: [0, 9, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(closest-side, rgba(99,102,241,0.22), transparent 70%), radial-gradient(closest-side, rgba(236,72,153,0.20), transparent 70%), radial-gradient(closest-side, rgba(34,211,238,0.18), transparent 70%)',
        }}
      />

      <div className='relative mx-auto max-w-6xl space-y-6'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-sm font-extrabold text-indigo-700'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to Templates
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className='grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start'
        >
          <div className='space-y-4'>
            <div className='rounded-3xl border border-white/30 bg-white/30 p-3 backdrop-blur-xl'>
              <motion.div
                className='relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white/20'
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 45vw'
                  priority
                />
                <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent' />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className='absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold text-white backdrop-blur'
                >
                  <Sparkles className='h-4 w-4' />
                  Featured
                </motion.div>
              </motion.div>
            </div>

            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='rounded-3xl border border-white/30 bg-white/30 p-5'>
                <div className='flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-950/70'>
                  <Calendar className='h-4 w-4 text-indigo-700' />
                  Updated
                </div>
                <div className='mt-2 text-sm font-extrabold text-indigo-950'>
                  {new Date(book.updatedAt).toLocaleDateString()}
                </div>
              </div>
              <div className='rounded-3xl border border-white/30 bg-white/30 p-5'>
                <div className='flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-950/70'>
                  <Tag className='h-4 w-4 text-fuchsia-700' />
                  Price
                </div>
                <div className='mt-2 text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 via-indigo-700 to-cyan-700'>
                  ${book.price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='rounded-3xl border border-white/30 bg-white/35 p-6 shadow-sm backdrop-blur-xl sm:p-8'>
              <div className='inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/40 px-3 py-1 text-xs font-extrabold text-indigo-950'>
                <User className='h-4 w-4 text-cyan-700' />
                {authorName}
              </div>

              <h1 className='mt-4 text-4xl font-extrabold tracking-tight text-indigo-950'>
                {book.title}
              </h1>
              <p className='mt-3 text-sm font-semibold leading-7 text-indigo-950/80'>
                {book.description}
              </p>

              <div className='mt-6 grid gap-3 sm:grid-cols-2'>
                <Button
                  className='w-full rounded-full bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-500 text-white shadow-md transition hover:brightness-110 active:brightness-95'
                  size='lg'
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  className='w-full bg-white/40 text-indigo-950 hover:bg-white/55'
                  size='lg'
                  onClick={() => router.back()}
                >
                  Go back
                </Button>
              </div>
            </div>

            <div className='grid gap-4 lg:grid-cols-2'>
              <motion.section
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className='rounded-3xl border border-white/30 bg-gradient-to-br from-fuchsia-500/10 via-indigo-500/10 to-cyan-500/10 p-6'
              >
                <div className='text-sm font-extrabold text-indigo-950'>
                  Template details
                </div>
                <div className='mt-4 grid gap-3'>
                  <div className='rounded-2xl border border-white/30 bg-white/25 p-4'>
                    <div className='text-xs font-extrabold uppercase tracking-wider text-indigo-950/70'>
                      Template ID
                    </div>
                    <div className='mt-1 break-all text-sm font-extrabold text-indigo-950'>
                      {book._id}
                    </div>
                  </div>
                  <div className='rounded-2xl border border-white/30 bg-white/25 p-4'>
                    <div className='text-xs font-extrabold uppercase tracking-wider text-indigo-950/70'>
                      Created
                    </div>
                    <div className='mt-1 text-sm font-extrabold text-indigo-950'>
                      {new Date(book.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.section>

              <motion.section
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className='rounded-3xl border border-white/30 bg-gradient-to-br from-amber-500/12 via-rose-500/10 to-fuchsia-500/12 p-6'
              >
                <div className='text-sm font-extrabold text-indigo-950'>
                  About the author
                </div>
                <div className='mt-4 space-y-3'>
                  {authorBio ? (
                    <div className='rounded-2xl border border-white/30 bg-white/25 p-4 text-sm font-semibold leading-7 text-indigo-950/80'>
                      {authorBio}
                    </div>
                  ) : (
                    <div className='rounded-2xl border border-white/30 bg-white/25 p-4 text-sm font-semibold text-indigo-950/80'>
                      Author information is not available.
                    </div>
                  )}

                  {authorCountry && (
                    <div className='inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/35 px-4 py-2 text-sm font-extrabold text-indigo-950'>
                      <Globe className='h-4 w-4 text-emerald-700' />
                      {authorCountry}
                    </div>
                  )}

                  {typeof book.author !== 'string' && (
                    <Link
                      href={`/creators/${book.author._id}`}
                      className='inline-flex items-center justify-center rounded-full border border-white/35 bg-white/40 px-4 py-2 text-sm font-extrabold text-indigo-950 transition hover:bg-white/55'
                    >
                      Open author profile
                    </Link>
                  )}
                </div>
              </motion.section>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
