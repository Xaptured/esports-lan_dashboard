'use client';

import { Advertisement } from '@/schemas/advertisement';
import React from 'react';
import AdvertisementContent from './advertisement-content';
import { Box, Grid, Typography } from '@mui/material';

interface AdvertisementWrapperProps {
  ads: Advertisement[];
}

export default function AdvertisementWrapper({
  ads,
}: AdvertisementWrapperProps) {
  return (
    // <Box
    //   display="flex"
    //   flexWrap="wrap"
    //   justifyContent="space-around"
    //   gap={3}
    //   px={2}
    //   py={3}
    // >
    //   {ads.map((ad) => (
    //     <AdvertisementContent key={ad.advertiserName} ad={ad} />
    //   ))}
    // </Box>
    <Grid
      container
      spacing={6}
      justifyContent="center"
      alignItems="start"
      sx={{
        padding: '1%',
        marginTop: '0%',
      }}
    >
      {ads.map((ad) => (
        <Grid item xl={4} lg={4} md={4}>
          <AdvertisementContent key={ad.advertiserName} ad={ad} />
        </Grid>
      ))}
    </Grid>
  );
}
