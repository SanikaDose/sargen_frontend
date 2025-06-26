'use client';

import Loader from '@/components/Loader/Loader';
import { PopupModal } from '@/components/PopupModal/PopupModal';
import { pagesNames } from '@/constants/pagesHeaderNames';
import { setPageNameHeader, setShowAssessmentListSideBar } from '@/store/globalSlice';
import { RootState } from '@/store/store';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FactoryIcon from '@mui/icons-material/Factory';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NumbersIcon from '@mui/icons-material/Numbers';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Avatar, Box, Button, Chip, CircularProgress, Divider, Grid, Paper, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSpecificPlantInfoQuery } from '../AssignedPlantsList/AssignedPlantsListApi';
import { AssessorProps } from './Assessor.types';
import { useGetAssessorMetadataQuery, usePostAssessorMetadataToPlantMutation } from './AssessorApi';
import { setPlantAssessmentDepartment } from '../../(plantAssessment)/plantAssementSlice';
import { AsseessmentStatus } from '@/constants/enums';

const excludeKeys = [
  'plantLogo',
  'name',
  'location',
  'registrationNo',
  'asessmentTableAssignedList',
  'assessmentCompletion',
  'assessmentCompletionStage',
  'createdAt',
  'updatedAt',
  'id',
];

const ViewPlantDetails = ({}: AssessorProps) => {
  const params = useParams();
  const router = useRouter();
  const organisationId = params?.organisationId as string;
  const assessorId = useSelector((state: RootState) => state.tokenDecode.decodedToken?.tenantId);
  const plantId = params?.plantId as string;
  const dispatch = useDispatch();

  // Move all dispatch calls to useEffect to avoid setState during render
  useEffect(() => {
    dispatch(setPageNameHeader(pagesNames.assessorViewAssignedPlantDetails));
    dispatch(setPlantAssessmentDepartment(''));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setShowAssessmentListSideBar(false));
  }, [dispatch]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isFetching, isError } = useGetSpecificPlantInfoQuery({ organisationId, plantId }, { skip: !organisationId || !plantId });

  // GET API call when page loads
  const {
    data: metadataData,
    isFetching: isMetadataFetching,
    isError: isMetadataError,
  } = useGetAssessorMetadataQuery(assessorId, {
    skip: !assessorId,
  });

  let metadataToUpload = [];
  if (metadataData) {
    metadataToUpload = metadataData.map((md: AssessorProps) => md?.tableName);
    console.log('metadata', metadataToUpload);
  }

  // POST API mutation
  const [postAssessorMetadata, { isLoading: isPostingMetadata }] = usePostAssessorMetadataToPlantMutation();

  const plant = data?.data?.data;

  // Check if assessment is already assigned
  const isAssessmentAssigned = useMemo(() => {
    return plant?.asessmentTableAssignedList && plant.asessmentTableAssignedList.length > 0;
  }, [plant?.asessmentTableAssignedList]);

  // Check if assessment is completed
  const isAssessmentCompleted = useMemo(() => {
    return plant?.assessmentCompletionStage === AsseessmentStatus.COMPLETED_ASSESSMENT;
  }, [plant?.assessmentCompletionStage]);

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
        tenantId: assessorId,
        plantId,
        metaDataIds: metadataToUpload,
      }).unwrap();

      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to allow assessment:', error);
    }
  };

  const handleClick = () => {
    router.push(`/IndustrySelectionPreview/${organisationId}/${plantId}`);
    dispatch(setShowAssessmentListSideBar(true));
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

          {/* Action buttons aligned to the right - NOW SIDE BY SIDE */}
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            ml={{ xs: 0, sm: 'auto' }}
            gap={2}
            marginTop={2}
          >
            <Button
              startIcon={<CheckCircleIcon />}
              color="primary"
              variant="contained"
              disabled={isAssessmentAssigned || isMetadataFetching}
              sx={{
                color: '#FFFFFF',
                bgcolor: isAssessmentAssigned ? '#6c757d' : '#28a745',
                fontSize: '14px',
                p: 1,
                borderRadius: '16px',
                minWidth: '180px',
                '&:hover': {
                  bgcolor: isAssessmentAssigned ? '#6c757d' : '#218838',
                },
                '&:disabled': {
                  bgcolor: '#bdbdbd',
                  color: '#FFFFFF',
                },
              }}
              onClick={handleAllowAssessmentClick}
            >
              {isAssessmentAssigned ? 'Assessment in process' : 'Allow Assessment'}
            </Button>

            <Button
              startIcon={<OndemandVideoIcon />}
              color="secondary"
              variant="contained"
              disabled={!isAssessmentCompleted}
              sx={{
                color: '#FFFFFF',
                bgcolor: isAssessmentCompleted ? '#047af2' : '#6c757d',
                fontSize: '14px',
                p: 1,
                borderRadius: '16px',
                minWidth: '180px',
                '&:hover': {
                  bgcolor: isAssessmentCompleted ? '#0356b0' : '#6c757d',
                },
                '&:disabled': {
                  bgcolor: '#bdbdbd',
                  color: '#FFFFFF',
                },
              }}
              onClick={handleClick}
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
