'use client';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import { title } from 'process';
import React from 'react';
import Image from 'next/image';
import { TeamCardProps } from '@/types/Props';

export default function TeamCard(props: TeamCardProps) {
  const theme = useTheme();
  return (
    <Card sx={{ minWidth: 400, boxShadow: 3, height: 'auto' }}>
      <Box style={{ position: 'relative', height: 200, width: '100%' }}>
        <Image
          src="/wallpaperflare.com_wallpaper (4).jpg"
          alt={title}
          layout="fill"
          objectFit="cover"
          style={{ borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
        />
      </Box>

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
          {props.team?.teamName}
        </Typography>
        {props.team?.teammateEmails.map((email) => (
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
            {email}
          </Typography>
        ))}
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        {props.onDelete && (
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              props.onDelete &&
              props.index !== undefined &&
              props.onDelete(props.index)
            }
          >
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
