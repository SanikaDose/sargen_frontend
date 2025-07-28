import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import ProgressCircle from '../ProgressCircle/ProgressCircle';
import { PlantInfoCardProps } from './PlantInfoCard.d';
import styles from './style.module.css';
import { CustomButton } from '../CustomButton/CustomButton';
import { AsseessmentStatus } from '@/constants/enums';
import ImageUploader from '../ImageUpload/ImageUpload';

const PlantInfoCard = ({ data, editPlantOnClick, onClick, downloadReportLoading }: PlantInfoCardProps) => {
  const plantData = data;

  return (
    <Box className={styles.card}>
      <Box className={styles.header}>
        <Typography className={`${styles.title} ${styles.titleSm} ${styles.titleMd}`}>{plantData?.name}</Typography>
        <Typography className={styles.editButton} onClick={editPlantOnClick}>
          <EditOutlinedIcon />
        </Typography>
      </Box>

      {/* Content */}
      <Box className={styles.content}>
        <Box className={styles.plantImage}>
          <ImageUploader imageProp={plantData?.plantLogo} shape="square" />
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
            Plant Created: {new Date(plantData?.createdAt ?? '').toLocaleDateString('en-GB')}
          </Typography>
          <Typography className={styles.textLabel}>
            Plant Updated: {new Date(plantData?.updatedAt ?? '').toLocaleDateString('en-GB')}
          </Typography>
        </Box>
      </Box>

      {/* Status */}
      <Box className={styles.status}>
        <Box>
          <Divider sx={{ marginBottom: 1 }} />
          <Typography className={styles.statusLabel}>Status</Typography>

          <CustomButton
            icon="startAssesment"
            variant="contained"
            color="primary"
            width="100%"
            height="30px"
            disabled={data?.assessmentCompletionStage === AsseessmentStatus.REQUESTED_ASSESSMENT || downloadReportLoading}
            onClick={onClick}
          >
            {downloadReportLoading
              ? 'Downloading Report'
              : data?.assessmentCompletionStage === AsseessmentStatus.NOT_STARTED
                ? 'Request for Assessment'
                : data?.assessmentCompletionStage === AsseessmentStatus.REQUESTED_ASSESSMENT
                  ? 'Assessor Assigning ...'
                  : data?.assessmentCompletionStage === AsseessmentStatus.START_ASSESSMENT
                    ? 'Start Assessment'
                    : data?.assessmentCompletionStage === AsseessmentStatus.ONGOING_ASSESSMENT
                      ? 'Assessment Started'
                      : data?.assessmentCompletionStage === AsseessmentStatus.COMPLETED_ASSESSMENT
                        ? 'Edit Assessment'
                        : data?.assessmentCompletionStage === AsseessmentStatus.REVIEW_ASSESSMENT
                          ? 'Assessment in Review'
                          : data?.assessmentCompletionStage === AsseessmentStatus.FINISH_ASSESSMENT
                            ? 'Download Assessment'
                            : 'Status Unknown'}

            {downloadReportLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : ''}
          </CustomButton>
        </Box>
        <Box className={styles.progressCircle}>
          {data?.assessmentCompletionStage &&
          [AsseessmentStatus.REQUESTED_ASSESSMENT, AsseessmentStatus.NOT_STARTED].includes(
            data.assessmentCompletionStage as AsseessmentStatus,
          ) ? null : (
            <ProgressCircle color="#1976d2" size={60} thickness={4} value={75} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PlantInfoCard;
