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
  backgroundColor = 'rgba(29, 140, 252, 0.781)',
  disabled = false,
  fullWidth = false,
  type,
  variant = 'contained',
  className,
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      variant={variant}
      style={{
        width: fullWidth ? '100%' : width,
        height,
        backgroundColor,
      }}
      fullWidth={fullWidth}
      className={clsx(className, styles.buttonContent)}
    >
      <div className={clsx(styles.buttonContent)}>
        {loading && <CircularProgress size={loaderSize} thickness={loaderThickness} sx={{ color: loaderColor }} />}
        {!loading && label}
      </div>
    </Button>
  );
};

export default ButtonWithLoader;
