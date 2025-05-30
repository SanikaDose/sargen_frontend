'use client';
import Edit from '@mui/icons-material/Edit';
import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { ImageUploaderProps } from './ImageUpload.d';
import styles from './style.module.css';
const ImageUploader: React.FC<ImageUploaderProps> = ({ imageProp }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  // this is an image uploader component that allows users to upload an image and display it as an avatar. If no image is uploaded, it defaults to a specified image path.
  // If imageProp is provided, it will be used as the default image.
  const avatarSrc = image || imageProp || '/images/default-logo-image.png';

  return (
    <div className={styles.avatarStack}>
      <div className={styles.avatarWrapper}>
        <Avatar src={avatarSrc} alt="Uploaded Avatar" className={styles.avatarImage} />
        <label htmlFor="avatar-upload" className={styles.avtarUpload}>
          <input
            accept="image/*"
            id="avatar-upload"
            type="file"
            onChange={handleImageChange}
            className={styles.hiddenInput}
          />
          <IconButton component="span" className={styles.editButton} aria-label="edit avatar">
            <Edit fontSize="inherit" />
          </IconButton>
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
