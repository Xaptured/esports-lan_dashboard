import { createTheme, responsiveFontSizes  } from '@mui/material/styles';
import {poppins, pirataOne} from './src/app/fonts'

const lightTheme = responsiveFontSizes(createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#f0f0f0',
    },
    text: {
      primary: '#000000',
      secondary: '#4f4f4f',
    },
    primary: {
      main: '#000000',
      light: '#4f4f4f',
      dark: '#9e9e9e'
    },
    secondary: {
      main: '#9e9e9e',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: poppins.style.fontFamily,
    h1: {
      fontFamily: pirataOne.style.fontFamily,
      fontSize: '5.1rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0.1rem'
    },
    h2: {
      fontFamily: pirataOne.style.fontFamily,
      fontSize: '2.8rem',
      fontWeight: 300,
      lineHeight: 1.3,
      letterSpacing: '0.1rem'
    },
    h3: {
      fontFamily: pirataOne.style.fontFamily,
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: pirataOne.style.fontFamily,
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontFamily: pirataOne.style.fontFamily,
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    h6: {
      fontFamily: pirataOne.style.fontFamily,
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.7,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    body1: {
      fontSize: '1.3rem',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.75,
      textTransform: 'uppercase',
    },
  },
}));

const darkTheme = responsiveFontSizes(createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
    primary: {
      main: '#ffffff',
      light: '#b3b3b3',
      dark: '#4f4f4f'
    },
    secondary: {
      main: '#4f4f4f',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: poppins.style.fontFamily,
    h1: {
      fontFamily: pirataOne.style.fontFamily,
      fontSize: '5.1rem',
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: '0.1rem'
    },
    h2: {
      fontFamily: pirataOne.style.fontFamily,
      fontSize: '2.8rem',
      fontWeight: 300,
      lineHeight: 1.3,
      letterSpacing: '0.1rem'
    },
    h3: {
      fontFamily: pirataOne.style.fontFamily,
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: pirataOne.style.fontFamily,
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontFamily: pirataOne.style.fontFamily,
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    h6: {
      fontFamily: pirataOne.style.fontFamily,
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.7,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    body1: {
      fontSize: '1.3rem',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.75,
      textTransform: 'uppercase',
    },
  },
}));

export { lightTheme, darkTheme };
