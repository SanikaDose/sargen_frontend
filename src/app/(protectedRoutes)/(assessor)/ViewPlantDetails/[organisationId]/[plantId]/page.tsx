'use client';

import { Box, CircularProgress, Typography, Grid, Paper, Divider, Chip, Avatar, Button } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useGetSpecificPlantInfoQuery } from '../../../AssignedPlantsList/AssignedPlantsListApi';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NumbersIcon from '@mui/icons-material/Numbers';
import FactoryIcon from '@mui/icons-material/Factory';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { AssessorProps } from '../../../Assessor.types';

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

  const { data, isFetching, isError } = useGetSpecificPlantInfoQuery(
    { organisationId, plantId },
    { skip: !organisationId || !plantId },
  );

  const plant = data?.data?.data;

  const filteredPlantInfo = useMemo(() => {
    if (!plant) return [];
    return Object.entries(plant).filter(([key]) => !excludeKeys.includes(key));
  }, [plant]);

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
        <Typography variant="h6" fontWeight={600} fontSize={'18px'} mb={5}>
          Plant Details
        </Typography>
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

          {/* Push button to the right side */}
          <Box display="flex" flexDirection="column" alignItems="flex-end" ml={{ xs: 0, sm: 'auto' }}>
            <Button
              startIcon={<OndemandVideoIcon />}
              color={'secondary'}
              variant={'text'}
              sx={{
                color: '#FFFFFF',
                bgcolor: '#047af2',
                fontSize: '18px',
                mt: 2,
                mr: { xs: 0, sm: 4 },
                p: 1,
                borderRadius: '16px',
                '&:hover': { bgcolor: '#0356b0' },
              }}
              onClick={() => router.push(`/UserAssessmentPreview/${organisationId}/${plantId}`)}
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
    </Box>
  );
};

export default ViewPlantDetails;
