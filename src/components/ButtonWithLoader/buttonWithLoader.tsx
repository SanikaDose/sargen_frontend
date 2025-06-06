'use client';

import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import clsx from 'clsx';
import styles from './buttonWithLoader.module.css';
import { ButtonWithLoaderProps } from './buttonWithLoader.types';

const ButtonWithLoader: React.FC<ButtonWithLoaderProps> = ({
  label,
  onClick,
  loading = false,
  loaderSize = 20,
  loaderThickness = 4,
  loaderColor = 'green',
  width = '150px',
  height = '40px',
  backgroundColor = '#1976d2',
  disabled = false,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      variant="contained"
      style={{ width, height, backgroundColor }}
    >
      <div className={clsx(styles.buttonContent)}>
        {loading && (
          <CircularProgress
  size={loaderSize}
  thickness={loaderThickness}
  sx={{ color: loaderColor }} 
/>
        )}
        {!loading && label}
      </div>
    </Button>
  );
};

export default ButtonWithLoader;
