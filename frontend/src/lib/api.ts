import axios from 'axios';
import { BooksResponse, BooksQuery, Book } from '@/types';
import { getAuthToken } from '@/lib/authCookies';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getAuthToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const booksApi = {
  getBooks: async (params: BooksQuery = {}): Promise<BooksResponse> => {
    const { data } = await api.get('/books', { params });
    return data;
  },
  getBookById: async (id: string): Promise<Book> => {
    const { data } = await api.get(`/books/${id}`);
    return data;
  },
};

export const authorsApi = {
  getAuthors: async (): Promise<any[]> => {
    const { data } = await api.get('/authers');
    return data;
  },
  getAuthorById: async (id: string): Promise<any> => {
    const { data } = await api.get(`/authers/${id}`);
    return data;
  },
};

export const authApi = {
  register: async (payload: {
    email: string;
    username: string;
    password: string;
  }) => {
    const { data } = await api.post('/auth/register', payload);
    return data;
  },
  login: async (payload: { email: string; password: string }) => {
    const { data } = await api.post('/auth/login', payload);
    return data;
  },
  profile: async () => {
    const { data } = await api.get('/auth/profile');
    return data;
  },
};

export const passwordApi = {
  forgotPassword: async (email: string) => {
    const { data } = await api.post('/password/forgot-password', { email });
    return data;
  },
  resetPassword: async (userId: string, token: string, password: string) => {
    const { data } = await api.post(
      `/password/reset-password/${userId}/${token}`,
      { password },
    );
    return data;
  },
};

export type { BooksResponse, BooksQuery };
