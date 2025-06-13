'use client';
import React from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import styles from './style.module.css';
import { FileActionButtonProps } from './FileActionButton.types';
import VisibilityIcon from '@mui/icons-material/Visibility';
const FileActionButton = ({
  icon,
  label,
  showIcon = true,
  showLabel = true,
  width,
  height,
  variant = 'contained',
  color = '#1976d2',
  onClick,
  loading = false,
}: FileActionButtonProps) => {
  const getIcon = () => {
    if (icon === 'upload') return <CloudUploadIcon />;
    if (icon === 'download') return <DownloadIcon />;
    if (icon === 'view') return <VisibilityIcon />;
    return null;
  };

  return (
    <Button
      //  disabled={loading}
      variant={variant}
      onClick={onClick}
      startIcon={showIcon ? getIcon() : null}
      style={{ width, height, backgroundColor: color }}
      className={styles.button}
    >
      {/* {loading ? 'Loading...' : showLabel ? label : null} */}
      {showLabel ? label : null}
    </Button>
  );
};

export default FileActionButton;
