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

  MuiTypography: {
    styleOverrides: {
      root: {
        // global typography defaults
        color: '#212121',
      },
      h1: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      h6: {
        fontSize: '0.875rem',
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.43,
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.66,
        color: '#757575',
      },
    },
  },
};
