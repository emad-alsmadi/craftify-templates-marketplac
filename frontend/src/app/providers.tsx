'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ToastProvider } from '@/components/ui/Toast';
import { useAppDispatch } from '@/store/hooks';
import { hydrateAuthThunk } from '@/store/slices/authSlice';

function HydrateAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateAuthThunk());
  }, [dispatch]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ToastProvider>
        <HydrateAuth />
        {children}
      </ToastProvider>
    </Provider>
  );
}
