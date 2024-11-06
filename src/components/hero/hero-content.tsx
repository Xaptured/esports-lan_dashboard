'use client';

import { Typography, Container, useTheme } from '@mui/material';
import React from 'react';
import CenterButton from '../button/center-button';
import SendIcon from '@mui/icons-material/Send';
import { HeroContentProps } from '@/types/HeroProps';

export default function HeroContent({
  navigationRef,
  headingContent,
  bodyOne,
  bodyTwo,
}: HeroContentProps) {
  const theme = useTheme();
  const scrollToSection = (
    currentRef: React.MutableRefObject<any> | undefined
  ) => {
    if (currentRef && currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
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
        {headingContent}
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
          {bodyOne}
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
          {bodyTwo}
        </Typography>
        {navigationRef && (
          <CenterButton
            buttonText="Get Started"
            size="large"
            icon={true}
            rightIcon={<SendIcon />}
            buttonType="button"
            handleClick={() => scrollToSection(navigationRef)}
          />
        )}
      </Container>
    </Container>
  );
}
