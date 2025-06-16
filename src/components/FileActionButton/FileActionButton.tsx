'use client';
import React from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { FileActionButtonProps } from './FileActionButton.types';

const FileActionButton = ({
  icon,
  width = '40px',
  height = '40px',
  variant = 'contained',
  color = '#1976d2',
  onClick,
}: FileActionButtonProps) => {
  const getIcon = () => {
    if (icon === 'upload') return <CloudUploadIcon />;
    if (icon === 'download') return <DownloadIcon />;
    if (icon === 'view') return <VisibilityIcon />;
    return null;
  };

  return (
    <Button
      variant={variant}
      onClick={onClick}
      // sx={{
      //   width,
      //   height,
      //   minWidth: 0,
      //   padding: 0,
      //   backgroundColor: color,
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      // }}
      style={{ width, height, backgroundColor: color }}
    >
      {getIcon()}
    </Button>
  );
};

export default FileActionButton;
