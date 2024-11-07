'use client';

import ApproveEventCard from '@/components/events/approve-event-card';
import { Box, Container, Stack, useTheme } from '@mui/material';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import React from 'react';
import styles from './scroll-bar.module.css';

export default function ApproveEvents() {
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
      className={`h-full w-full ${gridTheme} relative flex items-center justify-center`}
    >
      <Box
        className={`absolute pointer-events-none inset-0 flex items-center justify-center ${radialTheme}`}
      ></Box>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <ApproveEventCard />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
