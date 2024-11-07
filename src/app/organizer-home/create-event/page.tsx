'use client';

import CreateEventForm from '@/components/events/create-event-form';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import React from 'react';

export default function Events() {
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
      <Paper
        elevation={0}
        sx={{ background: 'transparent', padding: '3%' }}
        variant="elevation"
        className="backdrop-blur-sm"
      >
        <Typography
          variant="body1"
          align="center"
          gutterBottom={false}
          noWrap={false}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Create your brand new LAN event!
        </Typography>
        <Box className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-8 h-[1px] w-full" />
        <CreateEventForm className="" />
      </Paper>
    </Box>
  );
}
