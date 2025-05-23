import React from 'react';
import { Tooltip, Typography } from '@mui/material';

interface TooltipLabelProps {
  label: string;
  children: React.ReactNode;
}

const TooltipLabel: React.FC<TooltipLabelProps> = ({ label, children }) => (
  <Tooltip title={label}>
    <span style={{ cursor: 'help' }}>{children}</span>
  </Tooltip>
);

export default TooltipLabel;
