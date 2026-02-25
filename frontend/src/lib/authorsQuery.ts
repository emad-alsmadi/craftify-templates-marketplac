import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { authorsApi } from '@/lib/api';
import type { Author, AuthorsQuery, AuthorsResponse } from '@/types';

export const AUTHORS_LIST_KEY = ['authors', 'list'] as const;

export function authorsListKey(query: AuthorsQuery) {
  return ['authors', 'list', query] as const;
}

export function authorByIdKey(id: string) {
  return ['authors', 'byId', id] as const;
}

export function useAuthors(query: AuthorsQuery) {
  return useQuery<AuthorsResponse>({
    queryKey: authorsListKey(query),
    queryFn: async () => {
      return await authorsApi.getAuthors(query);
    },
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    retry: 1,
  });
}

export function useAuthorById(id?: string) {
  return useQuery<Author>({
    queryKey: id ? authorByIdKey(id) : ['authors', 'byId', 'missing'],
    queryFn: async () => {
      if (!id) throw new Error('Missing author id');
      const data = await authorsApi.getAuthorById(id);
      return data as Author;
    },
    enabled: Boolean(id),
    staleTime: 60_000,
    retry: 1,
  });
}
