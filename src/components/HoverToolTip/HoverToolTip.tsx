import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import {TooltipLabelProps} from './HoverToolTip.types'

const TooltipLabel: React.FC<TooltipLabelProps> = ({ label, children }) => (
  <Tooltip title={label}>
    <span style={{ cursor: 'help' }}>{children}</span>
  </Tooltip>
);

export default TooltipLabel;
