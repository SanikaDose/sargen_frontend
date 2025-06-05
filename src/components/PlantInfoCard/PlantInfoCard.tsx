import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Box, Divider, Button, CircularProgress } from '@mui/material';
import defaulImage from '../../../public/images/default-logo-image.png';
import Edit from '@mui/icons-material/Edit';
import ProgressCircle from '../ProgressCircle/ProgressCircle';
import ImageUploader from '../ImageUpload/ImageUpload';
import styles from './style.module.css';
import { PlantInfoCardProps, PlantData } from './PlantInfoCard.d';

const PlantInfoCard = ({ data, editPlantOnClick, onClick }: PlantInfoCardProps) => {
  const plantData = data;

  return (
    <Box className={styles.card}>
      <Box className={styles.header}>
        <Typography className={`${styles.title} ${styles.titleSm} ${styles.titleMd}`}>{plantData?.name}</Typography>
        <Typography className={styles.editButton} onClick={editPlantOnClick}>
          <Edit />
        </Typography>
      </Box>

      {/* Content */}
      <Box className={styles.content}>
        <Box className={styles.plantImage}>
          <ImageUploader imageProp={plantData?.plantLogo} />
        </Box>

        {/* Info Grid */}
        <Box className={styles.infoGrid}>
          <Typography className={styles.textLabel}>
            Location: <b>{plantData?.location}</b>
          </Typography>
          <Typography className={styles.textLabel}>
            Reg No.: <b>{plantData?.registrationNo}</b>
          </Typography>
          <Typography className={styles.textLabel}>
            GSTIN: <b>{plantData?.gstin}</b>
          </Typography>
          <Typography className={styles.textLabel}>
            Plant Age: <b>{plantData?.age} years</b>
          </Typography>
          <Typography className={styles.textLabel}>
            Revenue: <b>₹{+(plantData?.revenue ?? 0)}</b>
          </Typography>
          <Typography className={styles.textLabel}>
            Employees: <b>{plantData?.numberOfEmployees}</b>
          </Typography>
          <Typography className={styles.textLabel}>
            Lines: <b>{plantData?.numberOfLines}</b>
          </Typography>
        </Box>
      </Box>

      {/* Dates */}
      <Box className={styles.dates}>
        <Typography className={styles.datesTitle}>Dates</Typography>
        <Divider sx={{ marginBottom: 1 }} />
        <Box>
          <Typography className={styles.textLabel}>
            Plant Created: {new Date(plantData?.createdAt ?? '').toLocaleDateString()}
          </Typography>
          <Typography className={styles.textLabel}>
            Plant Updated: {new Date(plantData?.updatedAt ?? '').toLocaleDateString()}
          </Typography>
        </Box>
      </Box>

      {/* Status */}
      <Box className={styles.status}>
        <Box>
          <Typography className={styles.statusLabel}>Status</Typography>
          <Divider sx={{ marginBottom: 1 }} />
          <Button
            children={'Start Assesment'}
            color={'secondary'}
            variant={'text'}
            sx={{ bgcolor: '#10557C33' }}
            onClick={onClick}
          />
        </Box>
        <Box className={styles.progressCircle}>
          <ProgressCircle color="#1976d2" size={60} thickness={4} value={75} />
        </Box>
      </Box>
    </Box>
  );
};

export default PlantInfoCard;
