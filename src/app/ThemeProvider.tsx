'use client';

import sargenTheme from '@/theme/customizations/sargenTheme';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import * as React from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={sargenTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
