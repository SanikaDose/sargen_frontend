'use client';

import theme from '@/theme/theme';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import * as React from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
