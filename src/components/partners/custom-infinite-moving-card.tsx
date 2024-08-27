'use client';

import React from 'react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import { testimonials } from '@/constants/partner-content';

export function CustomInfiniteMovingCard() {
  return (
    <div className="h-[15rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
    </div>
  );
}
