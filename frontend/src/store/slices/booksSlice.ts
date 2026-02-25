import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BooksQuery, BooksResponse } from '@/types';
import { booksApi } from '@/lib/api';

interface BooksState {
  query: BooksQuery;
  data: BooksResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  query: { page: 1, limit: 12, sort: 'createdAt' },
  data: null,
  loading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk<BooksResponse, BooksQuery>(
  'books/fetchBooks',
  async (query) => {
    return await booksApi.getBooks(query);
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<Partial<BooksQuery>>) {
      state.query = { ...state.query, ...action.payload };
    },
    resetQuery(state) {
      state.query = { page: 1, limit: 12, sort: 'createdAt' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch books';
      });
  },
});

export const { setQuery, resetQuery } = booksSlice.actions;
export default booksSlice.reducer;
