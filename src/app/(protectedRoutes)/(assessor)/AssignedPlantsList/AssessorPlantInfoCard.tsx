import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AssessorPlantDataProps } from './AssessorPlantDetails.types';
import styles from './AssessorPlantInfoCard.module.css';

const AssessorPlantInfoCard = ({ data, viewPlantOnClick }: AssessorPlantDataProps) => {
  const plantName = data?.plantName ?? '';
  const organisationName = data?.organisationName ?? '';
  const assessmentCompletionStage = data?.assessmentCompletionStage ?? '';
  const createdAt = data?.createdAt ?? '';
  const updatedAt = data?.updatedAt ?? '';

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? 'N/A'
      : date.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
  };

  const formatStatusText = (status: string) =>
    status
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const displayStatus = formatStatusText(assessmentCompletionStage).toUpperCase();

  return (
    <Box className={styles.cardContainer}>
      <Box className={styles.iconCorner} onClick={viewPlantOnClick}>
        <VisibilityIcon fontSize="small" />
      </Box>

      {/* Plant and Organization Info */}
      <Box className={styles.contentSection}>
        <Typography className={styles.label}>
          Plant Name: <span className={styles.value}>{plantName}</span>
        </Typography>
        <Typography className={styles.label}>
          Organisation: <span className={styles.value}>{organisationName}</span>
        </Typography>
      </Box>

      {/* Divider after plant and org name */}
      <Divider className={styles.divider} />

      {/* Dates Section */}
      <Box className={styles.dateSection}>
        <Typography className={styles.dateTitle}>Dates:</Typography>
        <Typography className={styles.dateText}>Created: {formatDate(createdAt)}</Typography>
        <Typography className={styles.dateText}>Updated: {formatDate(updatedAt)}</Typography>
      </Box>

      {/* Divider after dates section */}
      <Divider className={styles.divider} />

      {/* Status Section */}
      <Box className={styles.statusBadge}>{displayStatus}</Box>
    </Box>
  );
};

export default AssessorPlantInfoCard;
