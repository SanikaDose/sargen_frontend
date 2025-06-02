import React, { useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import styles from './style.module.css';

interface ImageUploaderProps {
  imageProp?: string;
  onUpload?: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageProp, onUpload }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
      onUpload?.(file); // trigger upload from parent
    }
  };

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
