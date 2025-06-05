import { DrawerProps } from '@mui/material/Drawer';
import React from 'react';
export interface SideBarProps {
  onCloseTrigger: (toTrigger: boolean) => void;
  open?: boolean;
  drawerList?: { label?: string; toNavigate?: string }[];
  drawerType?: DrawerProps['variant'];
}
