'use client';

import { useEffect, useState } from 'react';
import { authorsApi } from '@/lib/api';
import { Author } from '@/types';
import { Loader2 } from 'lucide-react';
import { AuthorCard } from '@/components/cards/AuthorCard';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await authorsApi.getAuthors();
        setAuthors(data as Author[]);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch authors');
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center rounded-2xl border border-white/60 bg-white/70 p-10 shadow-sm backdrop-blur'>
        <Loader2 className='h-6 w-6 animate-spin text-indigo-600' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800'>
        {error}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='rounded-3xl border border-white/40 bg-white/55 p-6 shadow-sm backdrop-blur-xl'>
        <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
          Authors
        </h1>
        <p className='mt-1 text-sm font-semibold text-gray-700'>
          Explore authors featured in the bookstore catalog.
        </p>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {authors.map((a) => (
          <AuthorCard
            key={a._id}
            author={a}
          />
        ))}
      </div>
    </div>
  );
}
