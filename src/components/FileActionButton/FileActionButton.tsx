// FileActionButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import styles from './style.module.css';
import { FileActionButtonProps } from './FileActionButton.types';

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
}: FileActionButtonProps) => {
  const getIcon = () => {
    if (icon === 'upload') return <CloudUploadIcon />;
    if (icon === 'download') return <DownloadIcon />;
    return null;
  };

  return (
    <Button
      variant={variant}
      onClick={onClick}
      startIcon={showIcon ? getIcon() : null}
      style={{ width, height, backgroundColor: color }}
      className={styles.button}
    >
      {showLabel ? label : null}
    </Button>
  );
};

export default FileActionButton;
