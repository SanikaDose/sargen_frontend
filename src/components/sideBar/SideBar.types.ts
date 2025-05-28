import { DrawerProps } from '@mui/material/Drawer';
import React from 'react';
export interface SideBarProps {
  onCloseTrigger: (toTrigger: boolean) => void;
  open?: boolean;
  drawerList?: React.ReactNode[];
  drawerType?: DrawerProps['variant'];
}
