'use client';

import { Box, CircularProgress, Typography, Grid, Paper, Divider, Chip, Avatar, Button } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NumbersIcon from '@mui/icons-material/Numbers';
import FactoryIcon from '@mui/icons-material/Factory';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch } from 'react-redux';
import { setPageNameHeader } from '@/store/globalSlice';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { PopupModal } from '@/components/PopupModal/PopupModal';
import { AssessorProps } from './Assessor.types';
import { useGetSpecificPlantInfoQuery } from '../AssignedPlantsList/AssignedPlantsListApi';
import { useGetAssessorMetadataQuery, usePostAssessorMetadataToPlantMutation } from './AssessorApi';
import Loader from '@/components/Loader/Loader';

const excludeKeys = [
  'plantLogo',
  'name',
  'location',
  'registrationNo',
  'assessor',
  'asessmentTableAssignedList',
  'assessmentCompletion',
  'assessorCompletionStage',
  'createdAt',
  'updatedAt',
  'id',
];

const ViewPlantDetails = ({}: AssessorProps) => {
  const params = useParams();
  const router = useRouter();
  const organisationId = params?.organisationId as string;
  const plantId = params?.plantId as string;
  const dispatch = useDispatch();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  dispatch(setPageNameHeader(pagesNames.assessorViewAssignedPlantDetails));

  const { data, isFetching, isError } = useGetSpecificPlantInfoQuery({ organisationId, plantId }, { skip: !organisationId || !plantId });

  // GET API call when page loads
  const {
    data: metadataData,
    isFetching: isMetadataFetching,
    isError: isMetadataError,
  } = useGetAssessorMetadataQuery(organisationId, {
    skip: !organisationId,
  });

  // POST API mutation
  const [postAssessorMetadata, { isLoading: isPostingMetadata }] = usePostAssessorMetadataToPlantMutation();

  const plant = data?.data?.data;

  const filteredPlantInfo = useMemo(() => {
    if (!plant) return [];
    return Object.entries(plant).filter(([key]) => !excludeKeys.includes(key));
  }, [plant]);

  const handleAllowAssessmentClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = async () => {
    if (!organisationId || !plantId) return;

    try {
      await postAssessorMetadata({
        organisationId,
        plantId,
        // Add any additional data needed for the metadata assignment
        // You might need to modify this based on your API requirements
      }).unwrap();

      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to allow assessment:', error);
      // Modal will stay open on error so user can retry
    }
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !plant) {
    return (
      <Box p={3}>
        <Typography color="error">Error loading plant data.</Typography>
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2, sm: 3 }}>
      <Paper
        elevation={2}
        sx={{
          borderRadius: '16px',
          p: 2,
          border: '1px solid #D8D8D8',
        }}
      >
        <Typography variant="h4" mb={5}>
          Plant Details
        </Typography>

        {/* Show metadata loading state */}
        {isMetadataFetching && (
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <CircularProgress size={20} />
            <Typography variant="body2" color="text.secondary">
              Loading metadata...
            </Typography>
          </Box>
        )}

        {/* Show metadata error */}
        {isMetadataError && (
          <Box mb={2}>
            <Typography variant="body2" color="error">
              Failed to load metadata
            </Typography>
          </Box>
        )}

        <Box display="flex" alignItems="flex-start" gap={3} mb={3}>
          {plant.plantLogo ? (
            <Avatar variant="circular" src={plant.plantLogo} alt={plant.name} sx={{ width: 100, height: 100 }} />
          ) : (
            <Avatar sx={{ width: 100, height: 100 }} variant="circular">
              <FactoryIcon sx={{ fontSize: '40px' }} />
            </Avatar>
          )}

          <Box>
            <Typography variant="h4" fontWeight={600} mb={1}>
              {plant.name}
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              <Chip icon={<LocationOnIcon />} label={`Location: ${plant.location}`} variant="outlined" />
              <Chip icon={<NumbersIcon />} label={`Reg No: ${plant.registrationNo}`} variant="outlined" />
            </Box>
          </Box>

          {/* Action buttons aligned to the right */}
          <Box display="flex" flexDirection="column" alignItems="flex-end" ml={{ xs: 0, sm: 'auto' }} gap={2}>
            <Button
              startIcon={<CheckCircleIcon />}
              color="primary"
              variant="contained"
              disabled={isMetadataFetching}
              sx={{
                color: '#FFFFFF',
                bgcolor: '#28a745',
                fontSize: '16px',
                mr: { xs: 0, sm: 4 },
                p: 1,
                borderRadius: '16px',
                '&:hover': { bgcolor: '#218838' },
                '&:disabled': { bgcolor: '#6c757d' },
              }}
              onClick={handleAllowAssessmentClick}
            >
              Allow Assessment
            </Button>

            <Button
              startIcon={<OndemandVideoIcon />}
              color="secondary"
              variant="text"
              sx={{
                color: '#FFFFFF',
                bgcolor: '#047af2',
                fontSize: '16px',
                mr: { xs: 0, sm: 4 },
                p: 1,
                borderRadius: '16px',
                '&:hover': { bgcolor: '#0356b0' },
              }}
              onClick={() => router.push(`/CostProfilePreview/${organisationId}/${plantId}`)}
            >
              Review Assessment
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          {filteredPlantInfo.map(([key, value]) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={key}>
              <Box bgcolor="#f9f9f9" p={2} borderRadius={2} boxShadow={1}>
                <Typography variant="subtitle2" color="text.secondary" textTransform="capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </Typography>
                <Typography fontWeight={500}>{String(value)}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <PopupModal
          label="Allow Assessment"
          text="Do you want to Allow assessment for this plant?"
          primaryButtonText={isPostingMetadata ? 'Processing...' : 'Yes'}
          secondaryButtonText="No"
          onPrimaryClick={handleModalConfirm}
          onSecondaryClick={handleModalClose}
        />
      )}

      {/* Custom Loader Component */}
      {isPostingMetadata && <Loader loading={true} />}
    </Box>
  );
};

export default ViewPlantDetails;
