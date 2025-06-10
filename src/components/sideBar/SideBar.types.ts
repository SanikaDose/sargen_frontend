import { DrawerProps } from '@mui/material/Drawer';
import { SvgIconComponent } from '@mui/icons-material';

import React from 'react';
export interface SideBarProps {
  onCloseTrigger: (toTrigger: boolean) => void;
  open?: boolean;
  drawerList?: { label?: string; toNavigate?: string; Icon: SvgIconComponent }[];
  drawerType?: DrawerProps['variant'];
}
