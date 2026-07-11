'use client';

import { Search, LayoutGrid, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export function HeroSection({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: HeroSectionProps) {
  return (
    <div className='relative overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left Side - Content */}
          <div className='space-y-6 text-left'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight'>
              The #1 marketplace for premium web templates
            </h1>
            <p className='text-base sm:text-lg'>
              Discover thousands of professionally designed templates for
              websites, apps, and more. Start your next project with confidence.
            </p>

            {/* Search Box */}
            <form
              onSubmit={onSearchSubmit}
              className='relative max-w-xl'
            >
              <input
                type='text'
                placeholder='Search templates...'
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className='w-full pl-12 pr-4 py-4 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg'
              />
              <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
              <button
                type='submit'
                className='absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-cyan-500 hover:from-fuchsia-700 hover:via-indigo-700 hover:to-cyan-600 text-white rounded-md font-medium transition-colors'
              >
                Search
              </button>
            </form>

            {/* Quick Links */}
            <div className='flex flex-wrap gap-3'>
              <Link
                href='/templates?category=website'
                className='inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-sm font-medium transition-colors'
              >
                <LayoutGrid className='h-4 w-4' />
                Website Templates
              </Link>
              <Link
                href='/templates?category=wordpress'
                className='inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-sm font-medium transition-colors'
              >
                <LayoutGrid className='h-4 w-4' />
                WordPress Themes
              </Link>
              <Link
                href='/templates?category=ecommerce'
                className='inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-sm font-medium transition-colors'
              >
                <ShoppingCart className='h-4 w-4' />
                E-commerce
              </Link>
            </div>

            {/* Additional Description */}
            <p className='text-sm max-w-lg'>
              Join our community of creators and buyers. Browse through our
              extensive collection of high-quality templates designed by
              professionals. Whether you're building a website, an app, or an
              online store, we have the perfect template for your needs.
            </p>
          </div>

          {/* Right Side - Images */}
          <div className='hidden lg:grid grid-cols-2 gap-4'>
            <div className='space-y-4'>
              <div className='aspect-[4/3] rounded-lg overflow-hidden shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300'>
                <div
                  className='w-full h-full bg-cover bg-center'
                  style={{
                    backgroundImage: 'url(/images/4.webp)',
                  }}
                />
              </div>
              <div className='aspect-[4/3] rounded-lg overflow-hidden shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300'>
                <div
                  className='w-full h-full bg-cover bg-center'
                  style={{
                    backgroundImage: 'url(/images/1.webp)',
                  }}
                />
              </div>
            </div>
            <div className='space-y-4 mt-8'>
              <div className='aspect-[4/3] rounded-lg overflow-hidden shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300'>
                <div
                  className='w-full h-full bg-cover bg-center'
                  style={{ backgroundImage: 'url(/images/2.webp)' }}
                />
              </div>
              <div className='aspect-[4/3] rounded-lg overflow-hidden shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300'>
                <div
                  className='w-full h-full bg-cover bg-center'
                  style={{
                    backgroundImage: 'url(/images/3.webp)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
