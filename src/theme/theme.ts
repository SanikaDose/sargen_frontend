// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { inputsCustomizations } from './customizations/inputs';
import { navigationCustomizations } from './customizations/navigation';
import sargenTheme from './customizations/sargenTheme';
import { surfacesCustomizations } from './customizations/surfaces';
import { colorSchemes, shadows, shape, typography } from './themePrimitives';

/**
 * Add the custom or overrided properties of the material ui components
 *
 *
 *
 *
 */
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
  colorSchemes,
  typography: {
    ...typography,
  },
  shadows,
  shape,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    ...sargenTheme,
    ...inputsCustomizations,
    ...dataDisplayCustomizations,
    ...feedbackCustomizations,
    ...navigationCustomizations,
    ...surfacesCustomizations,
  },
});

export default theme;
