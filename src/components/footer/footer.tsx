'use client';

import { Box, Grid, useTheme } from '@mui/material';
import React from 'react';
import { Globe } from './globe';
import { PARTICPANT, ORGANIZER, AUDIENCE } from '@/constants/users-content';
import { CustomCardSpotlight } from '../about-us/custom-card-spotlight';
import CustomUsersIcon from '../users/custom-users-icon';

export default function Footer() {
  const theme = useTheme();
  const radialTheme =
    theme.palette.mode === 'dark'
      ? 'bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'
      : 'bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]';
  return (
    <Box className={`h-auto w-full`}>
      <Box
        className={`absolute pointer-events-none inset-0 flex items-center justify-center ${radialTheme} [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]`}
      ></Box>
      <Box>
        <Grid container spacing={6} sx={{ padding: '4%' }}>
          <Grid item xl={4}>
            Footer content
          </Grid>
          <Grid item xl={8}>
            {/* <Globe /> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
