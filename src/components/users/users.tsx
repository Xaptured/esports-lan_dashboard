'use client';
import { Box, Grid, useTheme } from '@mui/material';
import React from 'react';
import CustomUsersIcon from './custom-users-icon';
import { CustomCardSpotlight } from '../about-us/custom-card-spotlight';
import { AUDIENCE, ORGANIZER, PARTICPANT } from '@/constants/users-content';

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
      <Box>
        <Grid container spacing={6} sx={{ padding: '4%' }}>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <CustomUsersIcon flexPosition="end" tagLine="PARTICIPANT" />
          </Grid>
          <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
            <CustomCardSpotlight body={PARTICPANT} />
          </Grid>
          <Grid item xl={1} lg={1} md={1} sm={0} xs={0} />

          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <CustomUsersIcon flexPosition="end" tagLine="ORGANIZER" />
          </Grid>
          <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
            <CustomCardSpotlight body={ORGANIZER} />
          </Grid>
          <Grid item xl={1} lg={1} md={1} sm={0} xs={0} />
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <CustomUsersIcon flexPosition="end" tagLine="AUDIENCE" />
          </Grid>
          <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
            <CustomCardSpotlight body={AUDIENCE} />
          </Grid>
          <Grid item xl={1} lg={1} md={1} sm={0} xs={0} />
        </Grid>
      </Box>
    </Box>
  );
}
