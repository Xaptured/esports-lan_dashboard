import { Box } from '@mui/material';
import React from 'react';
import { SparklesPreview } from './sparkles-preview';
import { HeroProps } from '@/types/HeroProps';
import HeroContent from './hero-content';

export default function Hero({
  navigationRef,
  headingContent,
  bodyOne,
  bodyTwo,
}: HeroProps) {
  return (
    <Box sx={{ height: '71vh' }}>
      <HeroContent
        navigationRef={navigationRef}
        headingContent={headingContent}
        bodyOne={bodyOne}
        bodyTwo={bodyTwo}
      />
      <SparklesPreview />
    </Box>
  );
}
