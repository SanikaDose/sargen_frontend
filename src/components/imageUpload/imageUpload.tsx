import React, { useState } from 'react';
import { Avatar, IconButton, Box, Stack } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import styles from '../imageUpload/style.module.css'; // Adjust the path as necessary';
const imageUploader: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.avatarStack}>
      <div className={styles.avatarWrapper}>
        <Avatar src={image || '/images/default-logo-image.png'} alt="Uploaded Avatar" className={styles.avatarImage} />
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

export default imageUploader;
