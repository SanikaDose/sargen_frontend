// src/components/responsive-tabs/responsive-tabs.tsx

import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

export interface ResponsiveTabsProps {
  tabs: string[];
  defaultIndex?: number;
  onTabChange?: (index: number) => void;
}

export const ResponsiveTabs: React.FC<ResponsiveTabsProps> = ({ tabs, defaultIndex = 0, onTabChange }) => {
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
        {tabs.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
    </Box>
  );
};
