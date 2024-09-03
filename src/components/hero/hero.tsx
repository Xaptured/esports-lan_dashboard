'use client';

import { Box, Container, Typography, useTheme } from '@mui/material';
import React from 'react';
import { SparklesPreview } from './sparkles-preview';
import SendIcon from '@mui/icons-material/Send';
import CenterButton from '../button/center-button';
import { HeroProps } from '@/types/HeroProps';

export default function Hero(props: HeroProps) {
  const theme = useTheme();
  const scrollToSection = (currentRef: React.MutableRefObject<any>) => {
    if (currentRef && currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mb: 2, mt: 22 }}>
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
            Welcome to ESports-LAN—where passion meets performance.
          </Typography>
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
            Join us as we redefine the world of LAN gaming, one event at a time.
          </Typography>
          <CenterButton
            buttonText="Get Started"
            size="large"
            icon={true}
            rightIcon={<SendIcon />}
            buttonType="button"
            handleClick={() => scrollToSection(props.formsRef)}
          />
        </Container>
      </Container>
      <SparklesPreview />
    </Box>
  );
}
