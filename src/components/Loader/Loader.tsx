'use client';

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import styles from './Loader.module.css';
import { LoaderProps } from './Loader.types';
import clsx from 'clsx';

const Loader: React.FC<LoaderProps> = ({
  loading,
  backdrop = false,
  backdropColor = 'rgba(0, 0, 0, 0.5)',
  size = 40,
  color = 'primary',
  thickness = 3.6,
  className,
}) => {
  if (!loading) return null;

  const loaderElement = (
    <div className={clsx(styles.loaderWrapper, className)}>
      <CircularProgress size={size} color={color} thickness={thickness} />
    </div>
  );

  if (backdrop) {
    return (
      <Backdrop
        open
        className={styles.backdrop}
        sx={{ backgroundColor: backdropColor }}
      >
        {loaderElement}
      </Backdrop>
    );
  }

  return loaderElement;
};

export default Loader;
