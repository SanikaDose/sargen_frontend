// src/components/responsive-tabs/responsive-tabs.tsx

import * as React from 'react';
import { Tabs, Tab, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material';

export interface ResponsiveTabsProps {
  tabs: {
    label: string;
    icon?: React.ReactElement;
  }[];
  defaultIndex?: number;
  onTabChange?: (index: number) => void;
  tabSx?: SxProps<Theme>;
}

export const ResponsiveTabs: React.FC<ResponsiveTabsProps> = ({ tabs, defaultIndex = 0, onTabChange, tabSx = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [value, setValue] = React.useState(defaultIndex);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onTabChange?.(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="responsive tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            icon={tab.icon}
            label={isMobile ? undefined : tab.label}
            iconPosition="start"
            sx={{
              minWidth: 80,
              ...tabSx,
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};
