'use client';

import Link from 'next/link';

export function CTASection() {
  return (
    <div className='bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-cyan-500 text-white py-20'>
      <div className='px-4 sm:px-6 lg:px-8 text-center'>
        <h2 className='text-3xl font-bold mb-4'>Ready to Start Selling?</h2>
        <p className='text-lg text-white/90 mb-8 max-w-2xl mx-auto'>
          Join thousands of creators who are earning money by selling their
          templates on Craftify. It's free to get started!
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/creators/join'
            className='inline-flex items-center justify-center rounded-lg bg-white text-indigo-600 px-8 py-3 text-base font-bold hover:bg-gray-100 transition-colors'
          >
            Become a Creator
          </Link>
          <Link
            href='/pricing'
            className='inline-flex items-center justify-center rounded-lg border-2 border-white text-white px-8 py-3 text-base font-bold hover:bg-white/10 transition-colors'
          >
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
