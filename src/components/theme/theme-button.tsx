'use client';

import { IconButton } from '@mui/material';
import { Brightness2, LightMode } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useSetAtom } from 'jotai/react';
import { isDarkMode } from '@/atoms/primitive';

export default function ThemeButton() {
  const theme = useTheme();
  const setDarkMode = useSetAtom(isDarkMode);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <header>
      <IconButton
        onClick={toggleDarkMode}
        sx={{ color: theme.palette.text.primary }}
      >
        {theme.palette.mode === 'dark' ? <LightMode /> : <Brightness2 />}
      </IconButton>
    </header>
  );
}
