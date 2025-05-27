import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Box, Divider, Button, CircularProgress } from '@mui/material';
import defaulImage from '../../../public/images/default-logo-image.png';
import Edit from '@mui/icons-material/Edit';
import ProgressCircle from '../ProgressCircle/ProgressCircle';
import ImageUploader from '../ImageUpload/ImageUpload';
import styles from './style.module.css';
import { PlantInfoCardProps, PlantData } from './PlantInfoCard.d';

const defaultPlantData: PlantData = {
  name: 'Unknown Plant',
  plantLogo: defaulImage.src,
  location: 'Unknown N/A',
  registrationNo: 'Unknown N/A',
  age: 100,
  gstin: '675454354',
  revenue: '1010210',
  numberOfEmployees: 3514350,
  numberOfLines: 55550,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  assessmentStartDate: new Date().toISOString(),
  debriefDate: new Date().toISOString(),
  assessmentCompletionPercentage: 565460,
};

const PlantInfoCard = ({ data, onClick }: PlantInfoCardProps) => {
  const plantData = data ?? defaultPlantData;

  return (
    <Box className={styles.card}>
      <Box className={styles.header}>
        <Typography className={`${styles.title} ${styles.titleSm} ${styles.titleMd}`}>{plantData.name}</Typography>
        <Typography className={styles.editButton} onClick={() => alert('Edit Plant Info')}>
          <Edit />
        </Typography>
      </Box>

      {/* Content */}
      <Box className={styles.content}>
        <ImageUploader imageProp={plantData.plantLogo} />

        {/* Info Grid */}
        <Box className={styles.infoGrid}>
          <Typography className={styles.textLabel}>
            Location: <b>{plantData.location}</b>
          </Typography>
          <Typography className={styles.textLabel}>
            Registration No.: <b>{plantData.registrationNo}</b>
          </Typography>
          <Typography className={styles.textLabel}>
            GST IN: <b>{plantData.gstin}</b>
          </Typography>
          <Typography className={styles.textLabel}>
            Plant Age: <b>{plantData.age} years</b>
          </Typography>
          <Typography className={styles.textLabel}>
            Revenue: <b>₹{(+plantData.revenue).toLocaleString()}</b>
          </Typography>
          <Typography className={styles.textLabel}>
            Total Employees: <b>{plantData.numberOfEmployees}</b>
          </Typography>
          <Typography className={styles.textLabel}>
            Total Lines: <b>{plantData.numberOfLines}</b>
          </Typography>
        </Box>
      </Box>

      {/* Dates */}
      <Box className={styles.dates}>
        <Typography className={styles.datesTitle}>Dates</Typography>
        <Divider sx={{ marginBottom: 1 }} />
        <Box>
          <Typography className={styles.textLabel}>
            Plant Created: {new Date(plantData.createdAt).toLocaleDateString()}
          </Typography>
          <Typography className={styles.textLabel}>
            Plant Updated: {new Date(plantData.updatedAt).toLocaleDateString()}
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
          <ProgressCircle color="#1976d2" size={100} thickness={4} value={75} />
        </Box>
      </Box>
    </Box>
  );
};

export default PlantInfoCard;
