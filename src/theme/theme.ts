import { createTheme } from '@mui/material/styles';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { sargenComponents, sargenPalette } from './customizations/sargenTheme';
import { surfacesCustomizations } from './customizations/surfaces';
import { colorSchemes, shadows, shape, typography } from './themePrimitives';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1500,
      xl: 1636,
    },
  },
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
    cssVarPrefix: 'template',
  },

  palette: sargenPalette,

  colorSchemes,
  typography,
  shadows,
  shape,

  components: {
    ...sargenComponents,
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.MuiButton-contained': {
            backgroundColor: sargenPalette.primary.main,
            color: sargenPalette.primary.contrastText,
            '&:hover': {
              backgroundColor: sargenPalette.primary.dark,
            },
          },
        },
      },
    },

    // ...inputsCustomizations,
    ...dataDisplayCustomizations,
    ...feedbackCustomizations,

    ...surfacesCustomizations,
  },
});

export default theme;
