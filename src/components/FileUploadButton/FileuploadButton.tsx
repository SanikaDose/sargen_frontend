// components/FileUploadButton.tsx
'use client';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import { Button, Grid } from '@mui/material';
import React from 'react';
import { FileUploadButtonProps } from './FileUploadButton.types';

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onFileSelect,
  label = 'Upload File',
  accept = '.pdf',
  size = 'medium',
  buttonVariant = 'contained',
  iconSize,
  buttonColor = 'primary',
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file); // ✅ Ensure this line exists
    }

    console.log('File input changed:', e.target.files);
  };

  return (
    <>
      <input ref={fileInputRef} type="file" hidden accept={accept} onChange={handleFileChange} />
      <Button variant={buttonVariant} onClick={handleClick} size={size} color={buttonColor}>
        <Grid
          container
          size={{ xs: 12, md: 12 }}
          sx={{
            alignItems: 'center',
          }}
        >
          <Grid size={{ xs: 4, md: 12 }} padding="normal">
            <AssignmentAddIcon sx={{ fontSize: iconSize ? iconSize : '50%', width: 50, height: 50 }} />
          </Grid>
          <Grid size={{ xs: 8, md: 12 }}>{label}</Grid>
        </Grid>
      </Button>
    </>
  );
};

export default FileUploadButton;
