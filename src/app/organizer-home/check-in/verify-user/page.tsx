'use client';

import { AudienceVerifyForm } from '@/components/audience-form/audience-verify-form';
import { LiveUpdatesForm } from '@/components/live-updates-form/live-updates-form';
import { TournamentImagesForm } from '@/components/forms/tournament-images-form';
import { Paper, Typography, Box, useTheme, Button } from '@mui/material';
import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type ViewState = 'MENU' | 'VERIFY' | 'UPDATES' | 'IMAGES';

export default function VerifyUser() {
  const theme = useTheme();
  const [view, setView] = useState<ViewState>('MENU');

  const gridTheme =
    theme.palette.mode === 'dark'
      ? 'bg-black bg-grid-white/[0.2]'
      : 'bg-white bg-grid-black/[0.2]';
  const radialTheme =
    theme.palette.mode === 'dark'
      ? 'bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'
      : 'bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]';

  const renderContent = () => {
    switch (view) {
      case 'VERIFY':
        return (
          <>
            <NavHeader
              title="Verify audience on the day of LAN event!"
              onBack={() => setView('MENU')}
            />
            <AudienceVerifyForm />
          </>
        );
      case 'UPDATES':
        return (
          <>
            <NavHeader
              title="Updates for Audience"
              onBack={() => setView('MENU')}
            />
            <LiveUpdatesForm />
          </>
        );
      case 'IMAGES':
        return (
          <>
            <NavHeader
              title="Upload Tournament Images"
              onBack={() => setView('MENU')}
            />
            <TournamentImagesForm />
          </>
        );
      default:
        return (
          <Box className="flex flex-col gap-4 w-full max-w-md">
            <Typography variant="h3" align="center" sx={{ mb: 3 }}>
              Organizer Actions
            </Typography>
            <MenuButton onClick={() => setView('VERIFY')}>
              Verify Audience
            </MenuButton>
            <MenuButton onClick={() => setView('UPDATES')}>
              Updates for Audience
            </MenuButton>
            <MenuButton onClick={() => setView('IMAGES')}>
              Upload Image
            </MenuButton>
          </Box>
        );
    }
  };

  return (
    <Box
      className={`h-full w-full ${gridTheme} relative flex items-center justify-center`}
      sx={{ minHeight: '80vh' }}
    >
      <Box
        className={`absolute pointer-events-none inset-0 flex items-center justify-center ${radialTheme}`}
      ></Box>
      <Paper
        elevation={0}
        sx={{
          background:
            theme.palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.2)'
              : 'rgba(255, 255, 255, 0.2)',
          padding: '3%',
          width: view === 'MENU' ? 'auto' : '40%',
          minWidth: view === 'MENU' ? '300px' : '500px',
        }}
        variant="elevation"
        className="backdrop-blur-md transition-all duration-300"
      >
        {renderContent()}
      </Paper>
    </Box>
  );
}

const MenuButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      size="large"
      onClick={onClick}
      fullWidth
      sx={{
        py: 1.5,
        my: 1,
        textTransform: 'none',
        fontSize: '1rem',
        borderRadius: '25px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
        boxShadow: theme.shadows[4],
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
        },
      }}
    >
      {children}
    </Button>
  );
};

const NavHeader = ({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) => (
  <Box sx={{ mb: 4 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{ mr: 2 }}
        color="inherit"
      >
        Back
      </Button>
    </Box>
    <Typography
      variant="body1"
      align="center"
      gutterBottom={false}
      noWrap={false}
      sx={{
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      {title}
    </Typography>
    <Box className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-8 h-[1px] w-full" />
  </Box>
);
