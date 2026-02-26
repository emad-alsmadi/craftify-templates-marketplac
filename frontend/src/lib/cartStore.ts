'use client';

import { useCallback, useSyncExternalStore } from 'react';

export type CartItem = {
  bookId: string;
  title: string;
  price: number;
  cover: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
};

const SERVER_SNAPSHOT: CartState = { items: [] };

const STORAGE_KEY = 'book_store_cart_v1';

const emitter = new EventTarget();

// system deploy and subscribers for create change all tabs web
function emit() {
  emitter.dispatchEvent(new Event('change'));
}

function safeParse(json: string | null): CartState {
  if (!json) return { items: [] };
  try {
    const parsed = JSON.parse(json) as CartState;
    if (!parsed || !Array.isArray(parsed.items)) return { items: [] };
    return {
      items: parsed.items
        .filter((x: any) => x && typeof x.bookId === 'string')
        .map((x: any) => ({
          bookId: String(x.bookId),
          title: String(x.title ?? ''),
          price: Number(x.price ?? 0),
          cover: String(x.cover ?? ''),
          qty: Math.max(1, Number(x.qty ?? 1)),
        })),
    };
  } catch {
    return { items: [] };
  }
}

function readState(): CartState {
  //this function is called on the server and client
  // and important in next js beacase the code load on server SSR & ISR
  if (typeof window === 'undefined') return { items: [] };
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
}

let cachedClientState: CartState = { items: [] };
let cacheInitialized = false;

// Get current status of cart
function getClientSnapshot(): CartState {
  if (typeof window === 'undefined') return SERVER_SNAPSHOT;
  if (!cacheInitialized) {
    cachedClientState = readState();
    cacheInitialized = true;
  }
  return cachedClientState;
}

// Update current status of cart
function writeState(next: CartState) {
  if (typeof window === 'undefined') return;
  cachedClientState = next;
  cacheInitialized = true;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emit();
}
// Subscribe to changes
export function subscribeCart(callback: () => void) {
  const handler = () => callback();
  emitter.addEventListener('change', handler);
  if (typeof window !== 'undefined') {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        cachedClientState = readState();
        cacheInitialized = true;
        callback();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      emitter.removeEventListener('change', handler);
      window.removeEventListener('storage', onStorage);
    };
  }
  return () => emitter.removeEventListener('change', handler);
}

export function getCartState(): CartState {
  return getClientSnapshot();
}

export function clearCart() {
  writeState({ items: [] });
}

export function removeFromCart(bookId: string) {
  const state = readState();
  writeState({ items: state.items.filter((i) => i.bookId !== bookId) });
}

export function setCartQty(bookId: string, qty: number) {
  const q = Math.max(1, Math.floor(qty));
  const state = readState();
  writeState({
    items: state.items.map((i) => (i.bookId === bookId ? { ...i, qty: q } : i)),
  });
}

export function addToCart(item: Omit<CartItem, 'qty'> & { qty?: number }) {
  const state = readState();
  const qty = Math.max(1, Math.floor(item.qty ?? 1));

  const existing = state.items.find((i) => i.bookId === item.bookId);
  if (existing) {
    writeState({
      items: state.items.map((i) =>
        i.bookId === item.bookId ? { ...i, qty: i.qty + qty } : i,
      ),
    });
    return;
  }

  writeState({
    items: [
      ...state.items,
      {
        bookId: item.bookId,
        title: item.title,
        price: item.price,
        cover: item.cover,
        qty,
      },
    ],
  });
}
export function getCartCount(state: CartState) {
  return state.items.reduce((sum, i) => sum + i.qty, 0);
}

export function getCartSubtotal(state: CartState) {
  return state.items.reduce((sum, i) => sum + i.qty * i.price, 0);
}

export function useCart() {
  const state = useSyncExternalStore(
    subscribeCart,
    getCartState,
    () => SERVER_SNAPSHOT,
  );

  const actions = {
    addToCart: useCallback(addToCart, []),
    removeFromCart: useCallback(removeFromCart, []),
    setCartQty: useCallback(setCartQty, []),
    clearCart: useCallback(clearCart, []),
  };

  return {
    state,
    count: getCartCount(state),
    subtotal: getCartSubtotal(state),
    ...actions,
  };
}
