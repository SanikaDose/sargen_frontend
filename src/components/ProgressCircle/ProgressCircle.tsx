import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { ProgressCircleProps } from './ProgressCircle.types';
import styles from './style.module.css';

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  size = 100,
  thickness = 4,
  color = '#1976d2',
}) => {
  return (
    <Box className={styles.container}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={thickness}
        style={{ color }}
      />
      <Box className={styles.overlay}>
        <Typography variant="caption" component="div" color="textSecondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressCircle;
