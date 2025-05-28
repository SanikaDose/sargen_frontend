// theme/sargenTheme.ts
import { createTheme } from '@mui/material/styles';

const sargenTheme = createTheme({
  palette: {
    primary: {
      main: '#2D7FF9', // blue
    },
    secondary: {
      main: '#D6E9FF', // lightBlue
    },
    error: {
      main: '#F44336', // red
    },
    success: {
      main: '#4CAF50', // green
    },
    background: {
      default: '#FAFAFA', // offWhite
      paper: '#FFFFFF', // white
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#acacac',
    },
    grey: {
      100: '#F5F5F7', // gray
      800: '#6E7275', // darkGray
    },
  },
  breakpoints: {
    values: {
      xs: 0, // iPhone, Pixel 2 XL
      sm: 600, // Pixel 3, iPad Portrait
      md: 768, // iPad Landscape, iPad Pro Portrait
      lg: 1024, // iPad Pro Landscape
      xl: 1280, // MacBook Air 13", Full HD
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        'html,body': {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          margin: 0,
          padding: 0,
        },
      }),
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: '56px',
          minHeight: '56px',
        },
      },
    },
  },
});

export default sargenTheme;
