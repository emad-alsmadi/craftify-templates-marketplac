import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/lib/api';
import type { Order } from '@/types';

export const ORDERS_MY_KEY = ['orders', 'my'] as const;

export function orderByIdKey(id: string) {
  return ['orders', 'byId', id] as const;
}

export function useCreateOrderMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      items: { book: string; qty: number }[];
      shippingAddress: {
        name: string;
        phone: string;
        address: string;
        city: string;
        zip: string;
        notes?: string;
      };
      shippingPrice?: number;
      taxPrice?: number;
    }) => {
      return await ordersApi.createOrder(payload);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ORDERS_MY_KEY });
    },
  });
}

export function useMyOrders() {
  return useQuery<Order[]>({
    queryKey: ORDERS_MY_KEY,
    queryFn: async () => {
      return await ordersApi.getMyOrders();
    },
    staleTime: 30_000,
    retry: 1,
    placeholderData: keepPreviousData,
  });
}

export function useOrderById(id?: string) {
  return useQuery<Order>({
    queryKey: id ? orderByIdKey(id) : ['orders', 'byId', 'missing'],
    queryFn: async () => {
      if (!id) throw new Error('Missing order id');
      return await ordersApi.getOrderById(id);
    },
    enabled: Boolean(id),
    staleTime: 30_000,
    retry: 1,
  });
}
