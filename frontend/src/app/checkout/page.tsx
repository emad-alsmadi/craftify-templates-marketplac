'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Loader2, Truck, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { useCart } from '@/lib/cartStore';
import { useCreateOrderMutation } from '@/lib/ordersQuery';
import {
  getUserFacingErrorMessage,
  logErrorForDev,
} from '@/lib/userFacingError';
import { getAuthToken } from '@/lib/authCookies';

type CheckoutValues = {
  name: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  notes: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const cart = useCart();
  const createOrder = useCreateOrderMutation();

  const items = cart.state.items;
  const subtotal = cart.subtotal;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      city: '',
      zip: '',
      notes: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(async (values) => {
    const token = getAuthToken();
    if (!token) {
      toast('Please log in to continue.', {
        title: 'Login required',
        variant: 'info',
      });
      router.push('/login');
      return;
    }

    if (items.length === 0) {
      toast('Your cart is empty.', { title: 'Checkout', variant: 'error' });
      router.push('/');
      return;
    }

    try {
      const order = await createOrder.mutateAsync({
        items: items.map((i) => ({ book: i.bookId, qty: i.qty })),
        shippingAddress: {
          name: values.name,
          phone: values.phone,
          address: values.address,
          city: values.city,
          zip: values.zip,
          notes: values.notes,
        },
        shippingPrice: 0,
        taxPrice: 0,
      });

      cart.clearCart();
      toast('Order created successfully.', {
        title: 'Success',
        variant: 'success',
      });
      router.push(`/orders/${order._id}`);
    } catch (err: any) {
      logErrorForDev(err);
      const msg = getUserFacingErrorMessage(err, 'Checkout failed');
      toast(msg, { title: 'Checkout failed', variant: 'error' });
    }
  });

  return (
    <div className='space-y-6'>
      <div className='rounded-3xl border border-white/40 bg-white/55 p-6 shadow-sm backdrop-blur-xl'>
        <div className='inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/40 px-3 py-1 text-xs font-extrabold text-indigo-950'>
          <Truck className='h-4 w-4 text-fuchsia-700' />
          Checkout
        </div>
        <h1 className='mt-4 text-3xl font-extrabold tracking-tight text-indigo-950 sm:text-4xl'>
          Shipping details
        </h1>
        <p className='mt-2 text-sm font-semibold text-indigo-950/80'>
          Orders are placed without payment for now.
        </p>
      </div>

      <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className='rounded-3xl border border-white/30 bg-white/35 p-6 shadow-sm backdrop-blur-xl'
        >
          <form
            onSubmit={onSubmit}
            className='space-y-4'
          >
            <div>
              <label className='mb-2 block text-sm font-extrabold text-indigo-950/80'>
                Full name
              </label>
              <Input
                placeholder='Your name'
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name?.message && (
                <div className='mt-2 text-sm font-semibold text-rose-700'>
                  {errors.name.message}
                </div>
              )}
            </div>

            <div>
              <label className='mb-2 block text-sm font-extrabold text-indigo-950/80'>
                Phone
              </label>
              <Input
                placeholder='+1 555 555 555'
                {...register('phone', { required: 'Phone is required' })}
              />
              {errors.phone?.message && (
                <div className='mt-2 text-sm font-semibold text-rose-700'>
                  {errors.phone.message}
                </div>
              )}
            </div>

            <div>
              <label className='mb-2 block text-sm font-extrabold text-indigo-950/80'>
                Address
              </label>
              <Input
                placeholder='Street, building, apartment'
                {...register('address', { required: 'Address is required' })}
              />
              {errors.address?.message && (
                <div className='mt-2 text-sm font-semibold text-rose-700'>
                  {errors.address.message}
                </div>
              )}
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <div>
                <label className='mb-2 block text-sm font-extrabold text-indigo-950/80'>
                  City
                </label>
                <Input
                  placeholder='City'
                  {...register('city', { required: 'City is required' })}
                />
                {errors.city?.message && (
                  <div className='mt-2 text-sm font-semibold text-rose-700'>
                    {errors.city.message}
                  </div>
                )}
              </div>
              <div>
                <label className='mb-2 block text-sm font-extrabold text-indigo-950/80'>
                  ZIP
                </label>
                <Input
                  placeholder='ZIP'
                  {...register('zip', { required: 'ZIP is required' })}
                />
                {errors.zip?.message && (
                  <div className='mt-2 text-sm font-semibold text-rose-700'>
                    {errors.zip.message}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm font-extrabold text-indigo-950/80'>
                Notes
              </label>
              <Input
                placeholder='Optional notes'
                {...register('notes')}
              />
            </div>

            <Button
              type='submit'
              size='lg'
              disabled={isSubmitting || createOrder.isPending}
              className='w-full rounded-full bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-500 text-white shadow-md transition hover:brightness-110 active:brightness-95'
            >
              {isSubmitting || createOrder.isPending ? (
                <span className='inline-flex items-center gap-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Placing order...
                </span>
              ) : (
                'Place order'
              )}
            </Button>
          </form>
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className='rounded-3xl border border-white/30 bg-white/35 p-6 shadow-sm backdrop-blur-xl'
        >
          <div className='flex items-center gap-2 text-sm font-extrabold text-indigo-950'>
            <ShoppingBag className='h-4 w-4 text-cyan-700' />
            Order summary
          </div>

          <div className='mt-4 space-y-3'>
            <div className='flex items-center justify-between text-sm font-semibold text-indigo-950/80'>
              <span>Items</span>
              <span>{items.length}</span>
            </div>
            <div className='flex items-center justify-between text-sm font-semibold text-indigo-950/80'>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className='flex items-center justify-between text-sm font-semibold text-indigo-950/70'>
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className='flex items-center justify-between text-sm font-semibold text-indigo-950/70'>
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className='h-px bg-indigo-900/10' />
            <div className='flex items-center justify-between text-base font-extrabold text-indigo-950'>
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
