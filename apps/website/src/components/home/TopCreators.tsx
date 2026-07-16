'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function TopCreators() {
  const creators = [
    {
      name: 'ArtemSemkin',
      templates: 245,
      sales: '12.5K',
      avatar: 'AS',
      featuredTemplate: 'Rhye - AJAX Portfolio WordPress Theme',
    },
    {
      name: 'Jane Smith',
      templates: 189,
      sales: '9.8K',
      avatar: 'JS',
      featuredTemplate: 'Modern Corporate Theme',
    },
    {
      name: 'Mike Johnson',
      templates: 156,
      sales: '7.2K',
      avatar: 'MJ',
      featuredTemplate: 'SaaS Dashboard UI Kit',
    },
  ];

  return (
    <div className='bg-white py-16 border-t border-gray-200'>
      <div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h2 className='text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2'>
              Featured creator
            </h2>
            <p className='text-gray-600'>
              Meet our top template creators and their work
            </p>
          </div>
          <Link
            href='/creators'
            className='inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors'
          >
            View All
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {creators.map((creator) => (
            <Link
              key={creator.name}
              href='/creators'
              className='group'
            >
              <motion.div
                whileHover={{ y: -4 }}
                className='bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-gray-300'
              >
                <div className='flex items-start gap-4 mb-4'>
                  <div className='inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-600 via-indigo-600 to-cyan-500 text-white text-xl font-bold flex-shrink-0'>
                    {creator.avatar}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h3 className='font-extrabold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors truncate'>
                      {creator.name}
                    </h3>
                    <p className='text-sm text-gray-500'>
                      {creator.templates} templates
                    </p>
                  </div>
                </div>
                <div className='space-y-2'>
                  <p className='text-xs text-gray-400 uppercase tracking-wide font-semibold'>
                    Featured template
                  </p>
                  <p className='text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors'>
                    {creator.featuredTemplate}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
