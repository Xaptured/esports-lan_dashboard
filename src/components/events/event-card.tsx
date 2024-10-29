'use client';

import { EventCardProps } from '@/types/EventCardProps';
import { Typography, useTheme } from '@mui/material';
import React from 'react';
import { BackgroundGradient } from '../ui/background-gradient';
import CenterButton from '../button/center-button';
import { useRouter } from 'next/navigation';

export default function EventCard(props: EventCardProps) {
  const theme = useTheme();
  const router = useRouter();
  const background =
    theme.palette.mode === 'dark' ? 'dark:bg-zinc-900' : 'bg-white';

  return (
    <>
      <BackgroundGradient
        className={`rounded-[22px] h-auto w-auto p-1 sm:p-10 ${background}`}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom={false}
          noWrap={false}
          sx={{
            color: theme.palette.text.primary,
            textDecoration: 'none',
          }}
        >
          {props.heading}
        </Typography>
        <Typography
          variant="body2"
          align="center"
          gutterBottom={false}
          noWrap={false}
          sx={{
            color: theme.palette.text.primary,
            textDecoration: 'none',
          }}
          className="mt-6 mb-6"
        >
          {props.description}
        </Typography>
        <CenterButton
          buttonType="submit"
          buttonText="Let's Go"
          size="large"
          styleString="w-full"
          icon={false}
          padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
          fontSize="16"
          handleClick={() => router.push(props.navigationURL)}
        />
      </BackgroundGradient>
    </>
  );
}
