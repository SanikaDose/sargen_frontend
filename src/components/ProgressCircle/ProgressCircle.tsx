// ProgressCircle.tsx
import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface ProgressCircleProps {
  value: number;        // percentage (0–100)
  size?: number;        // diameter in px
  thickness?: number;   // stroke width
  color?: string;       // circle color
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  size = 100,
  thickness = 4,
  color = '#1976d2',
}) => {
  return (
    <Box
      position="relative"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={thickness}
        style={{ color }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressCircle;
