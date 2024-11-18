'use client';

import { Card, CardContent, Typography, useTheme } from '@mui/material';
import { title } from 'process';
import React from 'react';
import Image from 'next/image';

export default function TeamCard() {
  const theme = useTheme();
  return (
    <Card sx={{ minWidth: 400, boxShadow: 3, height: 'auto' }}>
      <div style={{ position: 'relative', height: 200, width: '100%' }}>
        <Image
          src="/wallpaperflare.com_wallpaper (4).jpg"
          alt={title}
          layout="fill"
          objectFit="cover"
          style={{ borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
        />
      </div>

      <CardContent>
        <Typography
          variant="body1"
          align="center"
          gutterBottom={false}
          noWrap={false}
          sx={{
            color: theme.palette.text.primary,
            textDecoration: 'none',
          }}
        >
          Team Name
        </Typography>
        {[1, 2, 3, 4].map(() => (
          <Typography
            variant="body2"
            align="center"
            gutterBottom={false}
            noWrap={false}
            sx={{
              color: theme.palette.text.primary,
              textDecoration: 'none',
            }}
          >
            Player Name
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}
