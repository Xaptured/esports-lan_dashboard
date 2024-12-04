'use client';

import { EventCardWrapperVersionTwoProps } from '@/types/Props';
import ApproveEventCard from '@/components/events/approve-event-card';
import { Box, Container, Stack, useTheme } from '@mui/material';
import React from 'react';

export default function ApproveEventCardWrapper(
  props: EventCardWrapperVersionTwoProps
) {
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
          {props.data &&
            props.data.map((value) => (
              <ApproveEventCard eventName={value.eventName} />
            ))}
        </Stack>
      </Container>
    </Box>
  );
}
