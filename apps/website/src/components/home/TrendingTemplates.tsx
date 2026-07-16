'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TemplateCard } from '@/components/page/template/TemplateCard';
import { Template } from '@/types';

interface TrendingTemplatesProps {
  templates: Template[];
  loading: boolean;
  error: string | null;
  gridVariants: any;
  itemVariants: any;
}

export function TrendingTemplates({
  templates,
  loading,
  error,
  gridVariants,
  itemVariants,
}: TrendingTemplatesProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className='bg-white py-16 border-t border-gray-200'
    >
      <div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='flex items-center justify-between mb-8'
        >
          <div>
            <h2 className='text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2'>
              Featured Templates
            </h2>
            <p className='text-gray-600'>Hand-picked templates by our team</p>
          </div>
          <Link
            href='/templates?sort=popular'
            className='inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors group'
          >
            View All
            <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
          </Link>
        </motion.div>

        {!loading && !error && templates && (
          <motion.div
            variants={gridVariants}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, margin: '-50px' }}
            className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          >
            {templates.slice(0, 4).map((template: Template) => (
              <motion.div
                key={template._id}
                variants={itemVariants}
              >
                <TemplateCard template={template} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
