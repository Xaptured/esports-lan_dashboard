'use client';
import React from 'react';
import { CustomInfiniteMovingCard } from './custom-infinite-moving-card';
import { CustomBackgroundGradient } from './custom-background-gradient';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { GAMES } from '@/constants/games.content';

export default function Partners() {
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
      className={`h-auto w-full ${gridTheme} p-4 relative flex items-center justify-center`}
    >
      <Box
        className={`absolute pointer-events-none inset-0 flex items-center justify-center ${radialTheme} [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]`}
      ></Box>
      <Box>
        <Typography
          variant="h1"
          align="center"
          gutterBottom={false}
          noWrap={false}
          sx={{
            color: theme.palette.text.primary,
            textDecoration: 'none',
            zIndex: 20,
            marginTop: '8%',
            position: 'relative',
          }}
        >
          Sponsors
        </Typography>
        <CustomInfiniteMovingCard />
        <Typography
          variant="h1"
          align="center"
          gutterBottom={false}
          noWrap={false}
          sx={{
            color: theme.palette.text.primary,
            textDecoration: 'none',
            zIndex: 20,
            marginTop: '3%',
          }}
        >
          Games
        </Typography>
        <Box>
          <Grid container spacing={6} sx={{ padding: '4%' }}>
            {GAMES.map((game) => (
              <Grid item xl={3} lg={4} md={6}>
                <CustomBackgroundGradient
                  name={game.name}
                  description={game.description}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
