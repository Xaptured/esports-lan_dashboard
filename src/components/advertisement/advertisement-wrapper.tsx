'use client';

import { Advertisement } from '@/schemas/advertisement';
import React from 'react';
import AdvertisementContent from './advertisement-content';
import { Box, Typography } from '@mui/material';

interface AdvertisementWrapperProps {
  ads: Advertisement[];
}

export default function AdvertisementWrapper({
  ads,
}: AdvertisementWrapperProps) {
  if (!ads?.length) {
    return (
      <Box textAlign="center" py={3}>
        <Typography variant="body1" color="text.secondary">
          No active advertisements available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={2}
      px={2}
      py={3}
    >
      {ads.map((ad) => (
        <AdvertisementContent key={ad.advertiserName} ad={ad} />
      ))}
    </Box>
  );
}
