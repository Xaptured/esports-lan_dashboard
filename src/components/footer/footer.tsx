'use client';

import {
  Box,
  Grid,
  Typography,
  useTheme,
  Container,
  Paper,
} from '@mui/material';
import React from 'react';
import { Globe } from './globe';
import Link from 'next/link';
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaCopyright,
} from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import styles from './footer.module.css';

const ICON_SIZE = 60;

export default function Footer() {
  const theme = useTheme();
  const radialTheme =
    theme.palette.mode === 'dark'
      ? 'bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'
      : 'bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]';
  return (
    <Box className={`h-auto w-full`}>
      <Box>
        <Grid container spacing={6} sx={{ padding: '4%' }}>
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
            <Typography variant="h2" align="center" noWrap={false}>
              Connect with me
            </Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              gap={5}
              pt={8}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={5}
              >
                <Link
                  href="mailto:jagdeeshkumar19011999@gmail.com"
                  target="_blank"
                  className={`${styles.icon}`}
                  rel="noreferrer"
                >
                  <IoIosMail className="icon" size={ICON_SIZE} />
                </Link>
                <Paper
                  elevation={24}
                  sx={{ background: 'transparent', padding: '3%' }}
                  variant="elevation"
                  className={`${styles.connectMe}`}
                >
                  <Typography variant="body2" align="center" noWrap={false}>
                    Click on the icon if you have any question or wanna connect
                    with me.
                  </Typography>
                </Paper>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={5}
              >
                <Link
                  href="https://github.com/Xaptured"
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.icon}`}
                >
                  <FaGithub className="icon" size={ICON_SIZE} />
                </Link>
                <Paper
                  elevation={24}
                  sx={{ background: 'transparent', padding: '3%' }}
                  variant="elevation"
                  className={`${styles.connectMe}`}
                >
                  <Typography variant="body2" align="center" noWrap={false}>
                    Click on the icon if you have any idea on which we can work
                    together.
                  </Typography>
                </Paper>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={5}
              >
                <Link
                  href="https://github.com/Xaptured"
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.icon}`}
                >
                  <FaLinkedin className="icon" size={ICON_SIZE} />
                </Link>
                <Paper
                  elevation={24}
                  sx={{ background: 'transparent', padding: '3%' }}
                  variant="elevation"
                  className={`${styles.connectMe}`}
                >
                  <Typography variant="body2" align="center" noWrap={false}>
                    Click on the icon if you like my work or you wanna discuss
                    about Job Offers.
                  </Typography>
                </Paper>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={5}
              >
                <Link
                  href="https://www.instagram.com/xaptured__007/"
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.icon}`}
                >
                  <FaInstagram className="icon" size={ICON_SIZE} />
                </Link>
                <Paper
                  elevation={24}
                  sx={{ background: 'transparent', padding: '3%' }}
                  variant="elevation"
                  className={`${styles.connectMe}`}
                >
                  <Typography variant="body2" align="center" noWrap={false}>
                    Click on the icon if you wanna see some of my cool and fancy
                    clicks.
                  </Typography>
                </Paper>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={5}
              >
                <Link
                  href="https://www.youtube.com/channel/UCDKMpLyKzruI-q_aXS5l_Uw"
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.icon}`}
                >
                  <FaYoutube className="icon" size={ICON_SIZE} />
                </Link>
                <Paper
                  elevation={24}
                  sx={{ background: 'transparent', padding: '3%' }}
                  variant="elevation"
                  className={`${styles.connectMe}`}
                >
                  <Typography variant="body2" align="center" noWrap={false}>
                    Click on the icon if you wanna see my gaming and editing
                    skills.
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xl={7}
            lg={7}
            md={7}
            sx={{
              display: {
                xs: 'none', // Hide on extra-small screens
                sm: 'none',
                md: 'block', // Show on small screens and larger
                lg: 'block',
              },
            }}
          >
            <Globe />
          </Grid>
        </Grid>
      </Box>
      <Box className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-8 h-[1px] w-full" />
      <Container>
        <Typography
          variant="body2"
          align="center"
          noWrap={false}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '4%',
          }}
        >
          <FaCopyright
            className="copyright_icon"
            style={{ marginRight: '1%', marginTop: '0.5%' }}
          />
          Copyright 2024. All rights reserved by Xaptured. Created by Jack with
          Love.
        </Typography>
      </Container>
    </Box>
  );
}
