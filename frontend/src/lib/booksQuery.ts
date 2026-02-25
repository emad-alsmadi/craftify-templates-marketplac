import { useQuery } from '@tanstack/react-query';
import { booksApi } from '@/lib/api';
import type { BooksQuery, BooksResponse, Book } from '@/types';

export function booksListKey(query: BooksQuery) {
  return ['books', 'list', query] as const;
}

export function bookByIdKey(id: string) {
  return ['books', 'byId', id] as const;
}

export function useBooks(query: BooksQuery) {
  return useQuery<BooksResponse>({
    queryKey: booksListKey(query),
    queryFn: async () => {
      return await booksApi.getBooks(query);
    },
    staleTime: 30_000,
    retry: 1,
  });
}

export function useBookById(id?: string) {
  return useQuery<Book>({
    queryKey: id ? bookByIdKey(id) : ['books', 'byId', 'missing'],
    queryFn: async () => {
      if (!id) throw new Error('Missing book id');
      return await booksApi.getBookById(id);
    },
    enabled: Boolean(id),
    staleTime: 60_000,
    retry: 1,
  });
}
