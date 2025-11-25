import { Advertisement } from '@/schemas/advertisement';
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';

export default function AdvertisementContent({ ad }: { ad: Advertisement }) {
  return (
    <Card
      sx={{
        width: { xs: '100%', sm: 350, md: 400 },
        borderRadius: 2,
        boxShadow: 3,
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': { transform: 'scale(1.02)' },
      }}
    >
      <CardActionArea
        href={ad.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box position="relative" width="100%" height={200}>
          <Image
            src={ad.targetUrl}
            alt={ad.altText || `${ad.advertiserName} Ad`}
            fill
            sizes="(max-width: 600px) 100vw, 400px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
        <Box p={1.5}>
          <Typography
            variant="subtitle1"
            textAlign="center"
            fontWeight={500}
            color="text.primary"
          >
            {ad.advertiserName}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
