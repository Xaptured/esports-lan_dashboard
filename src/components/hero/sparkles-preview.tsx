'use client';
import React from 'react';
import { SparklesCore } from '../ui/sparkles';
import { Box, useTheme } from '@mui/material';

export function SparklesPreview() {
  const theme = useTheme();
  return (
    <Box className="w-full flex flex-col items-center overflow-hidden rounded-md">
      <Box className="w-[40rem] h-60 relative">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor={theme.palette.mode === 'dark' ? '#ffffff' : '#000000'}
        />
        <Box
          className={`absolute inset-0 w-full h-full ${
            theme.palette.mode === 'dark'
              ? 'bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]'
              : 'bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,black)]'
          }`}
        ></Box>
        {/* <Box className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></Box> */}
      </Box>
    </Box>
  );
}
