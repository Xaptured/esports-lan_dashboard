'use client';

import { Box, Container, Typography, useTheme } from '@mui/material';
import React from 'react';
import { SparklesPreview } from './sparkles-preview';
import SendIcon from '@mui/icons-material/Send';
import { pirataOne } from '../../app/fonts';
import CenterButton from '../button/center-button';

export default function Hero() {
  const theme = useTheme();
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mb: 2, mt: 17 }}>
        <Typography
          variant="h1"
          align="center"
          gutterBottom={false}
          noWrap={false}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            fontSize: '90px',
          }}
          className={pirataOne.className}
        >
          Single stop for LAN Event Management
        </Typography>
        <Container maxWidth="md">
          <Typography
            variant="body1"
            align="center"
            gutterBottom={false}
            noWrap={false}
            sx={{
              mt: 1,
              color: theme.palette.text.secondary,
              textDecoration: 'none',
            }}
          >
            Platform for Organizers, Participants, Partners and Audience who can
            collaborate with each other and increase the bounderies of ESport
            events.
          </Typography>
          <CenterButton
            buttonText="Get Started"
            size="large"
            icon={true}
            rightIcon={<SendIcon />}
          />
        </Container>
      </Container>
      <SparklesPreview />
    </Box>
  );
}
