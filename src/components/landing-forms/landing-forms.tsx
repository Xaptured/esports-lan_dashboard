'use client';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { LandingForm } from './landing-form';

export default function LandingForms() {
  const theme = useTheme();
  const gridTheme =
    theme.palette.mode === 'dark'
      ? 'bg-black bg-grid-white/[0.2]'
      : 'bg-white bg-grid-black/[0.2]';
  const radialTheme =
    theme.palette.mode === 'dark'
      ? 'bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'
      : 'bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]';
  const gradientTheme = theme.palette.mode === 'dark' ? 'to-black' : 'to-white';
  return (
    <Box
      className={`h-auto w-full ${gridTheme} relative flex items-center justify-center`}
    >
      <Box
        className={`absolute pointer-events-none inset-0 flex items-center justify-center ${radialTheme} [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]`}
      ></Box>

      <Container maxWidth="xl" sx={{ flexGrow: 1, zIndex: 20, mt: '5%' }}>
        <Typography
          variant="h1"
          align="center"
          gutterBottom={false}
          noWrap={false}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Start your journey
        </Typography>
        <Grid
          container
          spacing={12}
          justifyContent="center"
          alignItems="center"
          sx={{
            padding: '3%',
          }}
        >
          <Grid item xl={6} lg={6}>
            <Paper
              elevation={24}
              sx={{ background: 'transparent', padding: '3%' }}
              variant="outlined"
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
                Already ESports-Arena or ESports-LAN user?
              </Typography>

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
                Then login directly!
              </Typography>
              <Box className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-8 h-[1px] w-full" />
              <LandingForm buttonText="Login" isRegister={false} />
            </Paper>
          </Grid>
          <Grid item xl={6} lg={6}>
            <Paper
              elevation={24}
              sx={{ background: 'transparent', padding: '3%' }}
              variant="outlined"
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
                Wanna be a part of ESports-LAN?
              </Typography>

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
                Register here as audience to support your team at LAN.
              </Typography>
              <Box className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-8 h-[1px] w-full" />
              <LandingForm buttonText="Sign Up" isRegister={true} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Box
        className={`absolute w-full bottom-0 inset-x-0 h-20 bg-gradient-to-b pointer-events-none select-none from-transparent ${gradientTheme}`}
      />
    </Box>
  );
}
