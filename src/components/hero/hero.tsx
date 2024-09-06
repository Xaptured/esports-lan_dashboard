import { Box, useTheme } from '@mui/material';
import React from 'react';
import { SparklesPreview } from './sparkles-preview';
import { HeroProps } from '@/types/HeroProps';
import HeroContent from './hero-content';

export default function Hero(props: HeroProps) {
  const theme = useTheme();

  return (
    <Box>
      <HeroContent formsRef={props.formsRef} />
      <SparklesPreview />
    </Box>
  );
}
