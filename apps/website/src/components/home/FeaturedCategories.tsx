'use client';

import Link from 'next/link';

export function FeaturedCategories() {
  const categories = [
    {
      name: 'Website Templates',
      count: '2,543 items',
      href: '/templates?category=website',
      image: '/images/4 (2).jpg',
    },
    {
      name: 'WordPress',
      count: '1,876 items',
      href: '/templates?category=wordpress',
      image: '/images/4 (3).jpg',
    },
    {
      name: 'E-commerce',
      count: '1,234 items',
      href: '/templates?category=ecommerce',
      image: '/images/4 (4).jpg',
    },
    {
      name: 'UI Kits',
      count: '987 items',
      href: '/templates?category=uikits',
      image: '/images/4 (5).jpg',
    },
    {
      name: 'Marketing',
      count: '654 items',
      href: '/templates?category=marketing',
      image: '/images/4 (6).jpg',
    },
    {
      name: 'CMS Themes',
      count: '432 items',
      href: '/templates?category=cmsthemes',
      image: '/images/4 (7).jpg',
    },
  ];

  return (
    <div className='bg-slate-50 py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Browse by Category
          </h2>
          <p className='text-gray-600 text-lg'>
            Find the perfect template for your specific needs
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className='group relative overflow-hidden rounded-lg aspect-[16/9] hover:shadow-xl transition-shadow duration-300'
            >
              <div
                className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105'
                style={{ backgroundImage: `url("${category.image}")` }}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
              <div className='absolute bottom-0 left-0 right-0 p-6'>
                <h3 className='text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors'>
                  {category.name}
                </h3>
                <p className='text-sm text-white/80'>{category.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
