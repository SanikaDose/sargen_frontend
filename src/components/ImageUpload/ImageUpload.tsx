import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Avatar, IconButton } from '@mui/material';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import styles from './style.module.css';
interface ImageUploaderProps {
  imageProp?: string;
  onUpload?: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageProp, onUpload }) => {
  const [image, setImage] = useState<string | null>(null);
  const pathname = usePathname();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
      onUpload?.(file); // trigger upload from parent
    }
  };

  const avatarSrc = image || imageProp || '/images/default-avatar-profile.png';
  const isPlantOverview = pathname?.includes('/PlantOverview');
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
          {!isPlantOverview && (
            <IconButton component="span" className={styles.editButton} aria-label="edit avatar">
              <EditOutlinedIcon fontSize="inherit" />
            </IconButton>
          )}
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
