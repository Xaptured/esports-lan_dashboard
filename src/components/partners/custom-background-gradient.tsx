'use client';
import React from 'react';
import { BackgroundGradient } from '../ui/background-gradient';
import { CustomBackgroundGradientProps } from '@/types/CustomBackgroundGradientProps';
import { Typography, useTheme } from '@mui/material';

export function CustomBackgroundGradient(props: CustomBackgroundGradientProps) {
  const theme = useTheme();
  const background =
    theme.palette.mode === 'dark' ? 'dark:bg-zinc-900' : 'bg-white';
  return (
    <div>
      <BackgroundGradient
        className={`rounded-[22px] h-auto w-auto p-1 sm:p-10 ${background}`}
      >
        <Typography
          variant="body1"
          align="center"
          gutterBottom={false}
          noWrap={false}
          sx={{
            color: theme.palette.text.primary,
            textDecoration: 'none',
          }}
          className="text-base sm:text-xl mb-2 "
        >
          {props.name}
        </Typography>
        <Typography
          variant="body1"
          align="center"
          gutterBottom={false}
          noWrap={false}
          sx={{
            color: theme.palette.text.primary,
            textDecoration: 'none',
          }}
          className="text-sm"
        >
          {props.description}
        </Typography>
      </BackgroundGradient>
    </div>
  );
}
