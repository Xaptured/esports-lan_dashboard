'use client';

import { Box, Grid, useTheme } from '@mui/material';
import React from 'react';
import { CustomCardSpotlight } from './custom-card-spotlight';
import { ABOUT_US_CONTENT } from '@/constants/about-us-content';

export default function AboutUs() {
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={12}
          justifyContent="center"
          alignItems="center"
          sx={{
            padding: '4%',
          }}
        >
          <Grid item xl={2}></Grid>
          <Grid item xl={8}>
            <CustomCardSpotlight
              header={ABOUT_US_CONTENT[0].head}
              body={ABOUT_US_CONTENT[0].body}
            />
          </Grid>
          <Grid item xl={2}></Grid>
          {ABOUT_US_CONTENT.slice(1).map((content, index) => (
            <Grid item xl={4}>
              <CustomCardSpotlight
                header={content.head}
                body={content.body}
                key={index}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
