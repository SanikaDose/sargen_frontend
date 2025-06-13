// theme/customizations/sargenTheme.ts
import { Theme } from '@mui/material/styles';

export const sargenPalette = {
  primary: {
    main: '#047af2',
    dark: '#0356b0',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#D6E9FF',
    dark: '#aacdf7',
    contrastText: '#212121',
  },
  error: {
    main: '#F44336',
    dark: '#d32f2f',
    contrastText: '#ffffff',
  },
  success: {
    main: '#4CAF50',
    dark: '#388e3c',
    contrastText: '#ffffff',
  },
  background: {
    default: '#FAFAFA',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#acacac',
  },
  grey: {
    100: '#F5F5F7',
    800: '#6E7275',
  },
};

export const sargenComponents = {
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
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
  MuiPaper: {
    variants: [
      {
        props: { variant: 'outlined' as const },
        style: {
          border: '1px solid #e0e0e0',
          borderRadius: 8,
        },
      },
    ],
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: 'none',
      },
    },
  },
  // Fix stepper alignment by styling both icon and connector
  MuiStepIcon: {
    styleOverrides: {
      root: {
        '& .MuiStepIcon-active': { color: 'red' },
      },
    },
  },
};
