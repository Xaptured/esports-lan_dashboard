'use client';
import { Box, useTheme } from '@mui/material';
import React from 'react';
import UsersContent from './users-content';

export default function Users() {
  const theme = useTheme();
  const gridTheme =
    theme.palette.mode === 'dark'
      ? 'bg-black bg-grid-white/[0.2]'
      : 'bg-white bg-grid-black/[0.2]';
  const radialTheme =
    theme.palette.mode === 'dark'
      ? 'bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'
      : 'bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]';
  return (
    <Box
      className={`h-auto w-full ${gridTheme} relative flex items-center justify-center`}
    >
      <Box
        className={`absolute pointer-events-none inset-0 flex items-center justify-center ${radialTheme} [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]`}
      ></Box>
      <UsersContent />
    </Box>
  );
}
