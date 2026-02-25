import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '@/lib/api';
import {
  clearAuthCookies,
  getAuthToken,
  getUserRole,
  setAuthCookies,
  type UserRole,
} from '@/lib/authCookies';

export interface AuthUser {
  _id?: string;
  email?: string;
  username?: string;
  roles?: string[];
}

interface AuthState {
  user: AuthUser | null;
  role: UserRole;
  loading: boolean;
  error: string | null;
  hydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  role: null,
  loading: false,
  error: null,
  hydrated: false,
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await authApi.login(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || err?.message || 'Login failed',
      );
    }
  },
);

export const hydrateAuthThunk = createAsyncThunk(
  'auth/hydrateAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const role = getUserRole();
      if (!token) {
        return { user: null, role };
      }

      const res = await authApi.profile();
      return { user: res?.user || null, role };
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to load profile';
      return rejectWithValue(msg);
    }
  },
);

export const fetchProfileThunk = createAsyncThunk(
  'auth/profile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.profile();
      return res;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to load profile',
      );
    }
  },
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (
    payload: { email: string; username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await authApi.register(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || err?.message || 'Signup failed',
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    logout(state) {
      clearAuthCookies();
      state.user = null;
      state.role = null;
      state.error = null;
      state.loading = false;
      state.hydrated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        const payload = action.payload || null;
        const token: string | null = payload?.token || null;
        const roles: string[] = payload?.roles || [];
        const role = (roles?.[0] as UserRole) || null;
        if (token && role) setAuthCookies({ token, role });
        state.user = payload;
        state.role = role;
        state.hydrated = true;
      })
      .addCase(loginThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || 'Login failed';
        state.hydrated = true;
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        const payload = action.payload || null;
        const token: string | null = payload?.token || null;
        const roles: string[] = payload?.roles || [];
        const role = (roles?.[0] as UserRole) || null;
        if (token && role) setAuthCookies({ token, role });
        state.user = payload;
        state.role = role;
        state.hydrated = true;
      })
      .addCase(registerThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || 'Signup failed';
        state.hydrated = true;
      })
      .addCase(fetchProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
        state.hydrated = true;
      })
      .addCase(fetchProfileThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || 'Failed to load profile';
        state.hydrated = true;
      })
      .addCase(hydrateAuthThunk.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
        state.role = action.payload?.role || null;
        state.hydrated = true;
      })
      .addCase(hydrateAuthThunk.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.role = null;
        state.hydrated = true;
      });
  },
});

export const { clearAuthError, logout } = authSlice.actions;
export default authSlice.reducer;

export { hydrateAuthThunk, loginThunk, registerThunk, fetchProfileThunk };
