import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AssessorPlantDataProps } from './AssessorPlantDetails.types';
import styles from './AssessorPlantInfoCard.module.css';

const AssessorPlantInfoCard = ({ data, viewPlantOnClick }: AssessorPlantDataProps) => {
  const plantName = data?.plantName ?? '';
  const organisationName = data?.organisationName ?? '';
  const assesorCompletionStage = data?.assesorCompletionStage ?? '';
  const createdAt = data?.createdAt ?? '';
  const updatedAt = data?.updatedAt ?? '';

  return (
    <Box className={styles.cardContainer}>
      {/* Top-Right Icon */}
      <Box className={styles.iconCorner} onClick={viewPlantOnClick}>
        <VisibilityIcon fontSize="small" />
      </Box>

      {/* Main Content */}
      <Box className={styles.contentSection}>
        <Typography className={styles.label}>
          Plant Name: <span className={styles.value}>{plantName}</span>
        </Typography>
        <Typography className={styles.label}>
          Organisation: <span className={styles.value}>{organisationName}</span>
        </Typography>
        <Typography className={styles.label}>
          Stage: <span className={styles.value}>{assesorCompletionStage}</span>
        </Typography>
      </Box>

      {/* Divider */}
      <Divider className={styles.divider} />

      {/* Dates */}
      <Box className={styles.dateSection}>
        <Typography className={styles.dateTitle}>Dates</Typography>
        <Typography className={styles.dateText}>Created: {new Date(createdAt ?? '').toLocaleDateString()}</Typography>
        <Typography className={styles.dateText}>Updated: {new Date(updatedAt ?? '').toLocaleDateString()}</Typography>
      </Box>

      {/* Bottom Badge */}
      <Box className={styles.statusBadge}>{assesorCompletionStage}</Box>
    </Box>
  );
};

export default AssessorPlantInfoCard;
