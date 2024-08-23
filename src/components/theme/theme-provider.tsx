'use client';

import { useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../../../theme';
import { useAtom } from 'jotai/react';
import { isDarkMode } from '@/atoms/primitive';

export default function ThemeProviderWrapper({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useAtom(isDarkMode);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
