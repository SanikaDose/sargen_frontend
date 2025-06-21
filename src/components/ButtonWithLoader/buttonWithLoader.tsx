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
  width,
  height,
  backgroundColor = '#1976d2',
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      variant="contained"
      style={{
        width: fullWidth ? '100%' : width,
        height,
        backgroundColor,
      }}
      fullWidth={fullWidth}
    >
      <div className={clsx(styles.buttonContent)}>
        {loading && <CircularProgress size={loaderSize} thickness={loaderThickness} sx={{ color: loaderColor }} />}
        {!loading && label}
      </div>
    </Button>
  );
};

export default ButtonWithLoader;
