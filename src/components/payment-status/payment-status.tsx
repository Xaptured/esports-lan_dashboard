'use client';

import { motion } from 'framer-motion';
import React from 'react';
import CenterButton from '../button/center-button';
import { SuccessLamp } from '../ui/success-lamp';
import { PendingLamp } from '../ui/pending-lamp';
import { FailedLamp } from '../ui/failed-lamp';
import { useRouter } from 'next/navigation';
import { Typography, useTheme } from '@mui/material';

export default function PaymentStatusWithLamp(props: {
  status: string | null;
  color: string;
}) {
  const router = useRouter();
  const theme = useTheme();
  const backToAudienceHome = () => router.push('/audience-home');
  return (
    <>
      {props.color === 'green' && (
        <SuccessLamp>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Your payment is {props.status?.toLowerCase()}
            <br />
            <Typography
              variant="body1"
              align="center"
              gutterBottom={false}
              noWrap={false}
              sx={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
                letterSpacing: '1px',
                marginTop: '1%',
              }}
            >
              Your participated event has been moved to registered events.
            </Typography>
            <CenterButton
              buttonType="button"
              buttonText="Back to home"
              size="large"
              styleString="w-80"
              icon={false}
              padding={{ left: 0, top: 1, right: 0, bottom: 1 }}
              fontSize="20"
              margin={{
                top: 10,
                bottom: 10,
              }}
              handleClick={backToAudienceHome}
            />
          </motion.h1>
        </SuccessLamp>
      )}
      {props.color === 'yellow' && (
        <PendingLamp>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Your payment is {props.status?.toLowerCase()}
            <br />
            <Typography
              variant="body1"
              align="center"
              gutterBottom={false}
              noWrap={false}
              sx={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
                letterSpacing: '1px',
                marginTop: '1%',
              }}
            >
              Your participated event will either move to registered events or
              future events.
            </Typography>
            <CenterButton
              buttonType="button"
              buttonText="Back to home"
              size="large"
              styleString="w-80"
              icon={false}
              padding={{ left: 0, top: 1, right: 0, bottom: 1 }}
              fontSize="20"
              margin={{
                top: 10,
                bottom: 10,
              }}
              handleClick={backToAudienceHome}
            />
          </motion.h1>
        </PendingLamp>
      )}
      {props.color === 'red' && (
        <FailedLamp>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Your payment is {props.status?.toLowerCase()}
            <br />
            <Typography
              variant="body1"
              align="center"
              gutterBottom={false}
              noWrap={false}
              sx={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
                letterSpacing: '1px',
                marginTop: '1%',
              }}
            >
              Your participated event is still in future events.
            </Typography>
            <CenterButton
              buttonType="button"
              buttonText="Back to home"
              size="large"
              styleString="w-80"
              icon={false}
              padding={{ left: 0, top: 1, right: 0, bottom: 1 }}
              fontSize="20"
              margin={{
                top: 10,
                bottom: 10,
              }}
              handleClick={backToAudienceHome}
            />
          </motion.h1>
        </FailedLamp>
      )}
    </>
  );
}
